import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Agent } from 'src/app/_models/agent';
import { Direction } from 'src/app/_models/direction';

import { Equipement } from 'src/app/_models/equipement';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { AgentService } from 'src/app/_services/agent.service';
import { DirectionService } from 'src/app/_services/direction.service';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-affectation-dir',
  templateUrl: './affectation-dir.component.html',
  styleUrls: ['./affectation-dir.component.css'],
})
export class AffectationDirComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  equipements: Equipement[];
  types: TypeEquipement[];
  directions: Direction[];

  constructor(
    private _formBuilder: FormBuilder,
    private typeService: TypeEquipementService,
    private directionService: DirectionService
  ) {}

  ngOnInit() {
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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
