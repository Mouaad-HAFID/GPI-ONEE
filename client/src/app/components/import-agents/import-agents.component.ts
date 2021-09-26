import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentService } from 'src/app/_services/agent.service';
export class CsvData {
  public matricule: any;
  public nom: any;
  public prenom: any;
  public dr: any;
  public dir: any;
  public DomainePerso;
  public UniteStruc;
  public Poste;
  public Fonction;
}
@Component({
  selector: 'app-import-agents',
  templateUrl: './import-agents.component.html',
  styleUrls: ['./import-agents.component.css'],
})
export class ImportAgentsComponent implements OnInit {
  public records: any[] = [];
  success: boolean = true;

  @ViewChild('csvReader') csvReader: any;

  constructor(
    private agentService: AgentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      console.log('reader', reader);
      reader.onload = () => {
        let csvData = <string>reader.result;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        console.log(this.records);
        this.records = this.getDataRecordsArrayFromCSVFile(
          csvRecordsArray,
          headersRow.length
        );
        this.success = true;
        this.records.forEach((r, index, arr) => {
          let agent = {
            matricule: r.matricule,
            nom: r.nom,
            prenom: r.prenom,
            dr: r.dr,
            dir: r.dir,
            domainePerso: r.DomainePerso,
            poste: r.Poste,
            fonction: r.Fonction,
            uniteStruc: r.UniteStruc,
          };
          this.agentService.addAgent(agent).subscribe(
            () => {
              console.log(this.success);
              console.log(`idx:${index} arrlen: ${arr.length - 1}`);
              if (index === arr.length - 1 && this.success !== false) {
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
                this.openSnackbar();
              }
            },
            () => {
              this.success = false;
              alert(
                `Erreur lors de l'insertion de l'agent: ${agent.matricule}`
              );
            }
          );
        });
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = csvRecordsArray[i].split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.matricule = currentRecord[0].trim();
        csvRecord.nom = currentRecord[1].trim();
        csvRecord.prenom = currentRecord[2].trim();
        csvRecord.dr = currentRecord[3].trim();
        csvRecord.dir = currentRecord[4].trim();
        csvRecord.DomainePerso = currentRecord[5].trim();
        csvRecord.UniteStruc = currentRecord[6].trim();
        csvRecord.Poste = currentRecord[7].trim();
        csvRecord.Fonction = currentRecord[8].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  //check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
  openSnackbar() {
    this.snackBar.open(`Import Des Agents Réussis`, 'Close');
  }
}
