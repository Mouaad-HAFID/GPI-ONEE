import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/_models/agent';
import { Direction } from 'src/app/_models/direction';

import { Equipement } from 'src/app/_models/equipement';
import { Mouvement } from 'src/app/_models/mouvement';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { AgentService } from 'src/app/_services/agent.service';
import { DirectionService } from 'src/app/_services/direction.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { MouvementService } from 'src/app/_services/mouvement.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-affectation-dir',
  templateUrl: './affectation-dir.component.html',
  styleUrls: ['./affectation-dir.component.css'],
})
export class AffectationDirComponent implements OnInit {
  affectationFormGroup: FormGroup;
  typeFormGroup: FormGroup;
  equipementFormGroup: FormGroup;
  directionFormGroup: FormGroup;

  equipements: Equipement[];
  types: TypeEquipement[];
  directions: Direction[];
  selectedEquips: any = [];
  agents: Agent[];
  searchTxt: any;

  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private directionService: DirectionService,
    private equipementService: EquipementService,
    private agentService: AgentService,
    private mouvementService: MouvementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onInitData();

    this.affectationFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          equipementControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          directionControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          agentControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          mvtControl: ['', Validators.required],
        }),
      ]),
    });

    this.equipementFormGroup = this._formBuilder.group({
      equipementControl: ['', Validators.required],
    });
  }
  get formArray(): AbstractControl | null {
    return this.affectationFormGroup.get('formArray');
  }
  onInitData() {
    this.typeService.getAllTypes().subscribe((res) => {
      this.types = res;
      this.types.forEach((t) => {
        console.log(this.types);
        t.equipement.forEach((e) => {
          this.equipements.push(e);
        });
        console.log(this.equipements);
      });
    });
    this.directionService
      .getAllDirections()
      .subscribe((res) => (this.directions = res));
    this.agentService.getAllAgents().subscribe((res) => (this.agents = res));
  }

  onSubmit() {
    if (this.affectationFormGroup.valid) {
      let equips = this.selectedEquips;
      let direction = this.formArray.get([1]).value.directionControl;
      let agent = this.formArray.get([2]).value.agentControl;
      let liste: string = '';
      this.selectedEquips.forEach((e) => {
        liste = liste.concat(e.codeONE, '/');
      });
      console.log('HERE');
      let mouvement: Mouvement = {
        numeroMvt: this.formArray.get([3]).value.mvtControl,
        typeMouvement: 'Lot',
        demandeurId: agent.id,
        dateFinMouvement: null,
        listeEquipements: liste,
      };
      console.log('HERE2');
      let mouvementId: number;
      this.mouvementService.addMouvement(mouvement).subscribe((res) => {
        mouvementId = res.id;
        equips.forEach((e, index, array) => {
          console.log(e.inventaireId);
          e.mouvementId = mouvementId;
          e.inventaireId = direction.inventaireId;
          console.log(e.inventaireId);
          console.log(direction.id);

          this.equipementService.affectEquipements(e.id, e).subscribe(
            () => console.log('Update Success'),
            () => {
              if (index === array.length - 1) {
                // This is the last one.
                console.log('Update Failed');
              }
            },
            () => {
              if (index === array.length - 1) {
                // This is the last one.
                console.log(e);
                window.location.reload();
                this.openSnackbar();
              }
            }
          );
        });
      });
      this.reset();
    }
  }

  onSelect(event) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.selectedEquips.push(event.source.value);
      } else {
        this.selectedEquips = this.selectedEquips.filter(
          (d) => d !== event.source.value
        );
      }
    }
    console.log(this.selectedEquips);
  }

  reset() {
    this.affectationFormGroup.reset();
  }

  openSnackbar() {
    this.snackBar.open('Affectation Success', 'Close');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTxt = filterValue;
  }
}
