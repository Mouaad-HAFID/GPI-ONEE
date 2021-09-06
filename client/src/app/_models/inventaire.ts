import { Equipement } from './equipement';

export interface Inventaire {
  id: number;
  directionId: number;
  equipements: Equipement[];
}
