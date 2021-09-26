import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from 'src/app/_models/contrat';
import { Equipement } from 'src/app/_models/equipement';
import { Etat } from 'src/app/_models/etat';
import { Fournisseur } from 'src/app/_models/fournisseur';
import { Gamme } from 'src/app/_models/gamme';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { ContratService } from 'src/app/_services/contrat.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { EtatService } from 'src/app/_services/etat.service';
import { FournisseurService } from 'src/app/_services/fournisseur.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-edit-equipement',
  templateUrl: './edit-equipement.component.html',
  styleUrls: ['./edit-equipement.component.css'],
})
export class EditEquipementComponent implements OnInit {
  types: TypeEquipement[];
  type: TypeEquipement;
  fournisseurs: Fournisseur[];
  gammes: Gamme[];
  etats: Etat[] = [];
  contrats: Contrat[];
  equipement: Equipement;
  id: any;
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
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      console.log(params.id);
    });
    this.equipementService.getEquipementById(this.id).subscribe((res) => {
      this.addEquipementFormGroup.controls.codeOneCtrl.setValue(res.serie);
      this.addEquipementFormGroup.controls.numSerieCtrl.setValue(
        res.serieConstructeur
      );
      console.log(this.addEquipementFormGroup.controls.codeOneCtrl);
    });
    this.type = {};
    this.onInitForm();
    this.etatService.getAllEtats().subscribe((res) => {
      res.forEach((res) => {
        if (res.abrev === 'Def' || res.abrev === 'FR' || res.abrev === 'RF')
          this.etats.push(res);
      });
    });

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
      codeContratCtrl: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      numSerieCtrl: new FormControl('', Validators.required),
      statusCtrlName: new FormControl(''),
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
        this.addEquipementFormGroup.controls.codeContratCtrl.enable();
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
      let equip;
      this.equipementService
        .getEquipementById(this.id)
        .subscribe((res) => (equip = res));
      equip = {
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
        etatId: this.addEquipementFormGroup.controls.statusCtrlName.value.id,
        contratId:
          this.addEquipementFormGroup.controls.codeContratCtrl.value.id,
      };

      console.log(equip);
      this.equipementService.updateEquipement(this.id, equip).subscribe(
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
