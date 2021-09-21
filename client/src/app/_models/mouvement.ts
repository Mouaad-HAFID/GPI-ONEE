import { Agent } from './agent';
import { Equipement } from './equipement';

export interface Mouvement {
  id?: number;
  numeroMvt?: number;
  typeMouvement?: string;
  dateMouvement?: Date;
  dateFinMouvement?: Date;
  demandeurId?: number;
  demandeur?: Agent;
  listeEquipements?: string;
  equipements?: Equipement[];
}
