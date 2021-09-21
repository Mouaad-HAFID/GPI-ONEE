import { Component, OnInit } from '@angular/core';
import { TypeEquipement } from 'src/app/_models/typeEquipement';
import { TypeEquipementService } from 'src/app/_services/type-equipement.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
})
export class TypesComponent implements OnInit {
  types: TypeEquipement[];
  constructor(private typeService: TypeEquipementService) {}

  ngOnInit(): void {
    this.onGetTypes();
  }
  onGetTypes() {
    this.typeService.getAllTypes().subscribe((res) => {
      this.types = res;
    });
  }
}
