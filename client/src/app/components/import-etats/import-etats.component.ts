import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EtatService } from 'src/app/_services/etat.service';
export class CsvData {
  public abrev: any;
  public designation: any;
}
@Component({
  selector: 'app-import-etats',
  templateUrl: './import-etats.component.html',
  styleUrls: ['./import-etats.component.css'],
})
export class ImportEtatsComponent implements OnInit {
  public records: any[] = [];
  success: boolean = true;

  @ViewChild('csvReader') csvReader: any;

  constructor(
    private etatService: EtatService,
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
          let etat = {
            abrev: r.abrev,
            designation: r.designation,
          };
          this.etatService.addEtat(etat).subscribe(
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
              alert(`Erreur lors de l'import. Etat ${etat.abrev} existant`);
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
        csvRecord.abrev = currentRecord[0].trim();
        csvRecord.designation = currentRecord[1].trim();
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
    this.snackBar.open(`Import Des Status Réussis`, 'Close');
  }
}
