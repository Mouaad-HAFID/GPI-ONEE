import { Gamme } from './gamme';

export interface TypeEquipement {
  id: number;
  nom: string;
  gammes: Gamme[];
}
