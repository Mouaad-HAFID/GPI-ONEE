import { Contrat } from './contrat';
import { Equipement } from './equipement';

export interface Fournisseur {
  id: number;
  CodeFournisseur: string;
  equipements: Equipement[];
  contrats: Contrat[];
}
