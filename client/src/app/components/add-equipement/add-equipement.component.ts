import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fournisseur } from 'src/app/_models/fournisseur';
import { Gamme } from 'src/app/_models/gamme';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { ContratService } from 'src/app/_services/contrat.service';
import { EquipementService } from 'src/app/_services/equipement.service';
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

  addEquipementFormGroup: FormGroup;

  disabledSelect: Boolean = true;
  constructor(
    private typeService: TypeEquipementService,
    private fournisseurService: FournisseurService,
    private equipementService: EquipementService,
    private contratService: ContratService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.type = {};
    this.onInitForm();

    this.addEquipementFormGroup = new FormGroup({
      codeOneCtrl: new FormControl('', Validators.required),
      fournisseurCtrl: new FormControl('', Validators.required),
      typeCtrl: new FormControl('', Validators.required),
      gammeCtrl: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      codeContratCtrl: new FormControl('', Validators.required),
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

  onSubmit() {
    if (this.addEquipementFormGroup.valid) {
      console.log(this.addEquipementFormGroup);
      let equip = {
        codeONE: `${this.addEquipementFormGroup.controls.typeCtrl.value.nom}-${this.addEquipementFormGroup.controls.gammeCtrl.value.caracteristiques}-20-${this.addEquipementFormGroup.controls.codeOneCtrl.value}`,
        serie: this.addEquipementFormGroup.controls.codeOneCtrl.value,
        typeEquipementId:
          this.addEquipementFormGroup.controls.typeCtrl.value.id,
        gammeId: this.addEquipementFormGroup.controls.gammeCtrl.value.id,
        fournisseurId:
          this.addEquipementFormGroup.controls.fournisseurCtrl.value.id,
        codeContrat: this.addEquipementFormGroup.controls.codeContratCtrl.value,
      };
      let contrat = {
        numeroContrat:
          this.addEquipementFormGroup.controls.codeContratCtrl.value,
        fournisseurId:
          this.addEquipementFormGroup.controls.fournisseurCtrl.value.id,
      };
      console.log(equip);
      this.equipementService.createEquipement(equip).subscribe(
        () => {
          console.log('Success');
          this.contratService.addContrat(contrat).subscribe();
          this.addEquipementFormGroup.reset();
          this.openSnackbar();
        },
        (err) => console.log(err)
      );
    }
  }
  openSnackbar() {
    this.snackBar.open(`Equipement inséré avec Succès`, 'Close');
  }
}
