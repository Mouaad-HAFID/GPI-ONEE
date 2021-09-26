import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrat } from 'src/app/_models/contrat';
import { Equipement } from 'src/app/_models/equipement';
import { Fournisseur } from 'src/app/_models/fournisseur';
import { ContratService } from 'src/app/_services/contrat.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';

export class CsvData {
  codeFournisseur?: any;
  nom?: any;
}

@Component({
  selector: 'app-import-fournisseurs',
  templateUrl: './import-fournisseurs.component.html',
  styleUrls: ['./import-fournisseurs.component.css'],
})
export class ImportFournisseursComponent implements OnInit {
  public records: any[] = [];
  fournisseurs: any[];
  contrats: any[];
  success: boolean = true;
  fournisseur: Fournisseur;

  @ViewChild('csvReader') csvReader: any;

  constructor(
    private fournisseurService: FournisseurService,
    private contratService: ContratService,
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
          let fournisseur: Fournisseur = {
            nom: r.nom,
            CodeFournisseur: r.codeFournisseur,
          };
          this.fournisseurService.addFournisseur(fournisseur).subscribe(
            () => {
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
                `Erreur lors de l'import. Fournisseur ${fournisseur.nom} existant`
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
        csvRecord.codeFournisseur = currentRecord[0].trim();
        csvRecord.nom = currentRecord[1].trim();

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
    this.snackBar.open(`Import Des Fournisseurs Réussis`, 'Close');
  }
}
