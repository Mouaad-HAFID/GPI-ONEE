import { Component, Input, OnInit } from '@angular/core';
import { Equipement } from 'src/app/_models/equipement';

@Component({
  selector: 'app-mouvements-expansion',
  templateUrl: './mouvements-expansion.component.html',
  styleUrls: ['./mouvements-expansion.component.css'],
})
export class MouvementsExpansionComponent implements OnInit {
  @Input() Equipements: Equipement[];
  constructor() {}

  ngOnInit(): void {}
}
