import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/_models/equipement';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() equipement: Equipement;
  constructor() {}

  ngOnInit(): void {}
}
