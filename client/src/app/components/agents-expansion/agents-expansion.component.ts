import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/_models/equipement';

@Component({
  selector: 'app-agents-expansion',
  templateUrl: './agents-expansion.component.html',
  styleUrls: ['./agents-expansion.component.css'],
})
export class AgentsExpansionComponent implements OnInit {
  @Input() Equipements: Equipement[];
  constructor() {}

  ngOnInit(): void {}
}
