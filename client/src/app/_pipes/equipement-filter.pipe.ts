import { Pipe, PipeTransform } from '@angular/core';
import { Equipement } from '../_models/equipement';

@Pipe({
  name: 'equipementFilter',
})
export class EquipementFilterPipe implements PipeTransform {
  transform(equipements: Equipement[]): any[] {
    let equipsToReturn: any[] = [];
    equipements.forEach((e) => {
      if (e.agentId === null) {
        equipsToReturn.push(e);
      }
    });
    return equipsToReturn;
  }
}
