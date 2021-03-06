import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/_models/agent';
import { Equipement } from 'src/app/_models/equipement';
import { Etat } from 'src/app/_models/etat';
import { Mouvement } from 'src/app/_models/mouvement';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { AgentService } from 'src/app/_services/agent.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { EtatService } from 'src/app/_services/etat.service';
import { MouvementService } from 'src/app/_services/mouvement.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';
@Component({
  selector: 'app-pret',
  templateUrl: './pret.component.html',
  styleUrls: ['./pret.component.css'],
})
export class PretComponent implements OnInit {
  affectationFormGroup: FormGroup;
  typeFormGroup: FormGroup;
  equipementFormGroup: FormGroup;
  agentFormGroup: FormGroup;

  equipements: Equipement[];
  types: TypeEquipement[];
  agents: Agent[];
  selectedEquips: any = [];
  searchTxt: any;
  currentDate: any;
  etats: Etat[];
  lastMvt: any;
  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private agentService: AgentService,
    private equipementService: EquipementService,
    private mouvementService: MouvementService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private etatService: EtatService
  ) {}

  ngOnInit() {
    this.mouvementService.getLastMouvement().subscribe((res) => {
      console.log(res);
      if (res !== null) this.lastMvt = res.numeroMvt + 1;
      else this.lastMvt = 1;
      console.log(this.lastMvt);
    });
    this.currentDate = new Date().toLocaleDateString;
    this.onInitData();
    this.etatService.getAllEtats().subscribe((res) => (this.etats = res));
    this.affectationFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          equipementControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          agentControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          dateFinPretCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          mvtControl: ['', Validators.required],
        }),
      ]),
    });

    this.equipementFormGroup = this._formBuilder.group({
      agentControl: ['', Validators.required],
    });
    this.equipementFormGroup = this._formBuilder.group({
      equipementControl: ['', Validators.required],
    });
    this.equipementFormGroup = this._formBuilder.group({
      dateFinPretCtrl: ['', Validators.required],
    });
    this.equipementFormGroup = this._formBuilder.group({
      mvtControl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
  get formArray(): AbstractControl | null {
    return this.affectationFormGroup.get('formArray');
  }
  AfterViewInit() {}
  onInitData() {
    this.equipements = [];
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
    this.agentService.getAllAgents().subscribe((res) => (this.agents = res));
  }

  onSubmit() {
    if (this.affectationFormGroup.valid) {
      let equips = this.selectedEquips;
      let agent = this.formArray.get([1]).value.agentControl;
      let liste: string = '';
      let equipementsId: number[] = [];
      this.selectedEquips.forEach((e) => {
        liste = liste.concat(e.codeONE, '/');
        equipementsId.push(e.id);
      });
      console.log('LISTE' + liste);
      console.log(this.formArray.get([2]).value.dateFinPretCtrl);
      let mouvement: Mouvement = {
        numeroMvt: this.formArray.get([3]).value.mvtControl,
        typeMouvement: 'Pr??t',
        demandeurId: agent.id,
        dateFinMouvement: this.formArray.get([2]).value.dateFinPretCtrl,
        listeEquipements: liste,
        equipementsId: equipementsId,
      };

      console.log(mouvement);
      let mouvementId: number;
      this.mouvementService.addMouvement(mouvement).subscribe((res) => {
        mouvementId = res.id;
        console.log('MOV ID' + mouvementId);
        equips.forEach((e, index, array) => {
          e.agentId = agent.id;
          e.mouvementId = mouvementId;
          e.etatId = this.etats.find((e) => e.abrev === 'PR').id;
          console.log('MOV ID INSIDE FOR EACH' + mouvementId);
          console.log(e.id);
          console.log(agent.id);
          this.equipementService.affectEquipements(e.id, e).subscribe(
            () => console.log('Update Success'),
            () => {
              if (index === array.length - 1) {
                // This is the last one.
                console.log(e);
              }
            },
            () => {
              if (index === array.length - 1) {
                // This is the last one.
                console.log(e);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
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
    this.snackBar.open('Pret Success', 'Close');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTxt = filterValue;
  }

  dateEventHandler(event: MatDatepickerInputEvent<Date>) {
    console.log(`${event.value.toLocaleDateString()}`);
  }
}
