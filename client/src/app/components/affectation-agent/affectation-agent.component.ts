import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/_models/agent';
import { Equipement } from 'src/app/_models/equipement';
import { Etat } from 'src/app/_models/etat';
import { Mouvement } from 'src/app/_models/mouvement';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { AgentService } from 'src/app/_services/agent.service';
import { DocsService } from 'src/app/_services/docs.service';
import { EquipementService } from 'src/app/_services/equipement.service';
import { EtatService } from 'src/app/_services/etat.service';
import { MouvementService } from 'src/app/_services/mouvement.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-affectation-agent',
  templateUrl: './affectation-agent.component.html',
  styleUrls: ['./affectation-agent.component.css'],
})
export class AffectationAgentComponent implements OnInit {
  affectationFormGroup: FormGroup;
  typeFormGroup: FormGroup;
  equipementFormGroup: FormGroup;
  agentFormGroup: FormGroup;

  equipements: Equipement[];
  types: TypeEquipement[];
  agents: Agent[];
  selectedEquips: any = [];
  searchTxt: any;
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
    private etatService: EtatService,
    private docService: DocsService
  ) {}

  ngOnInit() {
    this.mouvementService.getLastMouvement().subscribe((res) => {
      console.log(res);
      if (res !== null) this.lastMvt = res.numeroMvt + 1;
      else this.lastMvt = 1;
      console.log(this.lastMvt);
    });
    this.onInitData();
    console.log(this.lastMvt);
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
          mvtControl: [
            '',
            [Validators.required, Validators.pattern('^[0-9]*$')],
          ],
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
    this.types = [];
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
    console.log(this.affectationFormGroup.valid);
    if (this.affectationFormGroup.valid) {
      let equips = this.selectedEquips;
      let agent = this.formArray.get([1]).value.agentControl;
      let liste: string = '';
      let equipsId: number[] = [];
      this.selectedEquips.forEach((e) => {
        liste = liste.concat(e.codeONE, '/');
        equipsId.push(e.id);
      });
      console.log('LISTE' + liste);
      let mouvement: Mouvement = {
        numeroMvt: this.formArray.get([2]).value.mvtControl,
        typeMouvement: 'Affectation',
        demandeurId: agent.id,
        dateFinMouvement: null,
        listeEquipements: liste,
        equipementsId: equipsId,
      };

      console.log(mouvement);
      let mouvementId: number;
      this.mouvementService.addMouvement(mouvement).subscribe((res) => {
        mouvementId = res.id;
        console.log('MOV ID' + mouvementId);
        equips.forEach((e, index, array) => {
          e.agentId = agent.id;
          e.mouvementId = mouvementId;
          e.etatId = this.etats.find((e) => e.abrev === 'AF').id;
          console.log('MOV ID INSIDE FOR EACH' + mouvementId);
          console.log(e.id);
          console.log(agent.id);
          this.equipementService.affectEquipements(e.id, e).subscribe(
            () => {
              console.log('Update Success');
            },
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
    this.snackBar.open('Affectation Success', 'Close');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTxt = filterValue;
  }
}
