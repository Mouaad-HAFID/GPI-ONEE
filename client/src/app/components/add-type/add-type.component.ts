import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
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
          gammes.forEach((g) => {
            g.typeId = res.id;
            this.gammeService.addGamme(g).subscribe();
          });
        }
        this.reset();
        this.openSnackbar();
      });
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
    this.addTypeFormGroup.reset();
  }

  openSnackbar() {
    this.snackBar.open('Ajout fait avec Success', 'Close');
  }
}
