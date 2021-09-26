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
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css'],
})
export class AddTypeComponent implements OnInit {
  addTypeFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) ngForm;
  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private gammeService: GammeService,
    private snackBar: MatSnackBar
  ) {
    this.addTypeFormGroup = new FormGroup({
      nomTypeCtrl: new FormControl('', Validators.required),
      gammes: this._formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addTypeFormGroup.valid) {
      let type: TypeEquipement = {
        nom: this.addTypeFormGroup.value.nomTypeCtrl,
      };
      this.typeService.addType(type).subscribe((res) => {
        let gammes = this.addTypeFormGroup.value.gammes;
        if (gammes.length !== 0) {
          gammes.forEach((g, i, arr) => {
            g.typeId = res.id;
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
        this.reset();
        this.openSnackbar();
      });
      () => alert('Erreur Dans la création du type');
    }
  }
  gammes(): FormArray {
    return this.addTypeFormGroup.get('gammes') as FormArray;
  }

  newGamme(): FormGroup {
    return this._formBuilder.group({
      code: '',
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
    this.ngForm.resetForm();
    this.addTypeFormGroup.reset();
  }

  openSnackbar() {
    this.snackBar.open('Ajout fait avec Success', 'Close');
  }
}
