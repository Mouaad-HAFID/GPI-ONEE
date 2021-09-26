import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contrat } from 'src/app/_models/contrat';
import { Etat } from 'src/app/_models/etat';
import { Fournisseur } from 'src/app/_models/fournisseur';
import { Gamme } from 'src/app/_models/gamme';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { ContratService } from 'src/app/_services/contrat.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { EtatService } from 'src/app/_services/etat.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { GammeService } from 'src/app/_services/gamme.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css'],
})
export class AddEquipementComponent implements OnInit {
  types: TypeEquipement[];
  type: TypeEquipement;
  fournisseurs: Fournisseur[];
  gammes: Gamme[];
  etats: Etat[];
  contrats: Contrat[];
  contrat: any;
  addEquipementFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) ngForm;
  disabledSelect: Boolean = true;
  constructor(
    private typeService: TypeEquipementService,
    private fournisseurService: FournisseurService,
    private equipementService: EquipementService,
    private contratService: ContratService,
    private etatService: EtatService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.type = {};
    this.onInitForm();
    this.etatService.getAllEtats().subscribe((res) => (this.etats = res));

    this.addEquipementFormGroup = new FormGroup({
      codeOneCtrl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      fournisseurCtrl: new FormControl('', Validators.required),
      typeCtrl: new FormControl('', Validators.required),
      gammeCtrl: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      codeContratCtrl: new FormControl('', Validators.required),
      numSerieCtrl: new FormControl('', Validators.required),
    });
  }

  onInitForm() {
    this.typeService.getAllTypes().subscribe((res) => (this.types = res));
    this.fournisseurService
      .getAllFournisseurs()
      .subscribe((res) => (this.fournisseurs = res));
  }

  onSelect(event) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.type = event.source.value;
        this.addEquipementFormGroup.controls.gammeCtrl.enable();
      }
    }
  }

  onSelectFournisseur(event) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.contrats = event.source.value.contrats;
        this.addEquipementFormGroup.controls.gammeCtrl.enable();
      }
    }
  }

  onSubmit() {
    if (this.addEquipementFormGroup.valid) {
      console.log(this.addEquipementFormGroup);
      this.contrat = this.contrats.find(
        (c) =>
          c.numeroContrat ==
          this.addEquipementFormGroup.controls.codeContratCtrl.value
            .numeroContrat
      );
      let equip = {
        codeONE: `${this.addEquipementFormGroup.controls.typeCtrl.value.nom}-${
          this.addEquipementFormGroup.controls.gammeCtrl.value.code
        }-${new Date(this.contrat.date1).getFullYear().toString().substr(-2)}-${
          this.addEquipementFormGroup.controls.codeOneCtrl.value
        }`,
        serie: this.addEquipementFormGroup.controls.codeOneCtrl.value,
        typeEquipementId:
          this.addEquipementFormGroup.controls.typeCtrl.value.id,
        serieConstructeur:
          this.addEquipementFormGroup.controls.numSerieCtrl.value,
        gammeId: this.addEquipementFormGroup.controls.gammeCtrl.value.id,
        fournisseurId:
          this.addEquipementFormGroup.controls.fournisseurCtrl.value.id,
        codeContrat:
          this.addEquipementFormGroup.controls.codeContratCtrl.value
            .numeroContrat,
        etatId: this.etats.find((element) => element.abrev === 'S').id,
        contratId:
          this.addEquipementFormGroup.controls.codeContratCtrl.value.id,
      };

      console.log(equip);
      this.equipementService.createEquipement(equip).subscribe(
        () => {
          this.ngForm.resetForm();
          this.addEquipementFormGroup.reset();
          this.openSnackbar();
        },
        (err) => alert('Echec de la Création')
      );
    }
  }
  openSnackbar() {
    this.snackBar.open(`Equipement inséré avec Succès`, 'Close');
  }
}
