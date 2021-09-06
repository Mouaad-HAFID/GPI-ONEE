import { Equipement } from './equipement';

export interface Fournisseur {
  id: number;
  nom: string;
  equipements: Equipement[];
}
