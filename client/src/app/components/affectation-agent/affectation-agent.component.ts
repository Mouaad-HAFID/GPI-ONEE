import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agent } from 'src/app/_models/agent';
import { Equipement } from 'src/app/_models/equipement';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { AgentService } from 'src/app/_services/agent.service';
import { EquipementService } from 'src/app/_services/equipement.service';
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

  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private agentService: AgentService,
    private equipementService: EquipementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.onInitData();

    this.affectationFormGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          typeControl: ['', Validators.requiredTrue],
        }),
        this._formBuilder.group({
          equipementControl: ['', Validators.required],
        }),
        this._formBuilder.group({
          agentControl: ['', Validators.required],
        }),
      ]),
    });
    this.typeFormGroup = this._formBuilder.group({
      typeControl: ['', Validators.required],
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
    this.agentService.getAllAgents().subscribe((res) => (this.agents = res));
  }

  onSubmit() {
    console.log({
      firstStep: this.formArray.get([0]).value,
      secondStep: this.formArray.get([1]).value,
      thirdStep: this.formArray.get([2]).value,
    });
    let equips = this.selectedEquips;
    let agent = this.formArray.get([2]).value.agentControl;
    equips.forEach((e, index, array) => {
      e.agentId = agent.id;
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
            this.openSnackbar();
          }
        }
      );
    });
    this.reset();
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
}
