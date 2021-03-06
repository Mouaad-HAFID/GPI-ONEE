import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { GammeService } from 'src/app/_services/gamme.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-add-gamme',
  templateUrl: './addgamme.component.html',
  styleUrls: ['./addgamme.component.css'],
})
export class AddGammeComponent implements OnInit {
  addGammeFormGroup: FormGroup;
  types: TypeEquipement[];
  @ViewChild(FormGroupDirective) ngForm;

  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private gammeService: GammeService,
    private snackBar: MatSnackBar
  ) {
    this.addGammeFormGroup = new FormGroup({
      typeCtrl: new FormControl('', Validators.required),
      gammes: this._formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.addGammeField();
    this.typeService.getAllTypes().subscribe((res) => (this.types = res));
  }

  onSubmit() {
    if (this.addGammeFormGroup.valid) {
      let gammes = this.addGammeFormGroup.value.gammes;
      console.log(gammes.length !== 0);
      if (gammes.length !== 0) {
        gammes.forEach((g, i, arr) => {
          g.typeId = this.addGammeFormGroup.value.typeCtrl.id;
          this.gammeService.addGamme(g).subscribe(
            () => {},
            () => alert("Erreur Lors de l'ajout de la gamme" + g.code),
            () => {
              if (i === arr.length - 1) {
                this.openSnackbar();
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }
            }
          );
        });
      }
    }
  }
  gammes(): FormArray {
    return this.addGammeFormGroup.get('gammes') as FormArray;
  }

  newGamme(): FormGroup {
    return this._formBuilder.group({
      code: ['', Validators.required],
      caracteristiques: '',
    });
  }

  addGammeField() {
    this.gammes().push(this.newGamme());
  }

  removeGammeField(i: number) {
    this.gammes().removeAt(i);
  }

  reset() {
    this.gammes().clear();
    this.addGammeField();
    this.ngForm.resetForm();
    this.addGammeFormGroup.reset();
  }

  openSnackbar() {
    this.snackBar.open('Ajout fait avec Success', 'Close');
  }
}
