import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Equipement } from '../_models/equipement';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  equipement: Equipement = {};
  equip: BehaviorSubject<Equipement>;
  constructor() {
    this.equip = new BehaviorSubject(this.equipement);
  }

  changeStatus(status: string) {
    this.equip.next(this.equipement);
  }
}
