import { Direction } from './direction';
import { Equipement } from './equipement';

export interface Inventaire {
  id: number;
  directionId: number;
  direction: Direction;
  equipements: Equipement[];
}
