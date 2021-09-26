import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrat } from 'src/app/_models/contrat';
import { Equipement } from 'src/app/_models/equipement';
import { Fournisseur } from 'src/app/_models/fournisseur';
import { AgentService } from 'src/app/_services/agent.service';
import { ContratService } from 'src/app/_services/contrat.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { EtatService } from 'src/app/_services/etat.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { GammeService } from 'src/app/_services/gamme.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';
export class CsvData {
  serieConstructeur?: any;
  serie?: any;
  type?: any;
  gamme?: any;
  contrat?: any;
}

@Component({
  selector: 'app-import-equipements',
  templateUrl: './import-equipements.component.html',
  styleUrls: ['./import-equipements.component.css'],
})
export class ImportEquipementsComponent implements OnInit {
  public records: any[] = [];
  types: any[];
  gammes: any[];
  fournisseurs: any[];
  etats: any[];
  contrats: any[];
  contrat: Contrat;
  fournisseur: Fournisseur;
  success: boolean = true;
  @ViewChild('csvReader') csvReader: any;

  constructor(
    private equipementService: EquipementService,
    private typeService: TypeEquipementService,
    private gammeService: GammeService,
    private fournisseurService: FournisseurService,
    private etatService: EtatService,
    private contratService: ContratService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initData();
  }
  initData() {
    this.typeService.getAllTypes().subscribe((res) => (this.types = res));
    this.gammeService.getAllGammes().subscribe((res) => (this.gammes = res));
    this.etatService.getAllEtats().subscribe((res) => (this.etats = res));
    this.contratService
      .getAllContrats()
      .subscribe((res) => (this.contrats = res));
  }
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

        console.log(this.contrats);
        this.success = true;
        this.records.forEach((r, index, arr) => {
          console.log(r.contrat);

          this.contrat = this.contrats.find(
            (c) => c.numeroContrat == r.contrat
          );

          let equipement: Equipement = {
            serie: r.serie,
            serieConstructeur: r.serieConstructeur,
            codeContrat: r.contrat,
            codeONE: `${r.type}-${r.gamme}-${new Date(this.contrat.date1)
              .getFullYear()
              .toString()
              .substr(-2)}-${r.serie}`,
            etatId: this.etats.find((e) => e.abrev === 'S').id,
            typeEquipementId: this.types.find((t) => t.nom === r.type).id,
            contratId: this.contrat.id,
            gammeId: this.gammes.find((g) => g.code === r.gamme).id,
            fournisseurId: this.contrat.fournisseurId,
          };
          console.log(equipement);
          this.equipementService.createEquipement(equipement).subscribe(
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
                `Erreur lors de l'insertion du materiel ${equipement.serie}/${equipement.serieConstructeur}`
              );
            },
            () => {}
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
        csvRecord.serieConstructeur = currentRecord[0].trim();
        csvRecord.serie = currentRecord[1].trim();
        csvRecord.type = currentRecord[2].trim();
        csvRecord.gamme = currentRecord[3].trim();
        csvRecord.contrat = currentRecord[4].trim();

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
    this.snackBar.open(`Import Des Equipements Réussis`, 'Close');
  }
}
