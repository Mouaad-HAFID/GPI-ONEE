import { Contrat } from './contrat';
import { Equipement } from './equipement';

export interface Fournisseur {
  id?: number;
  CodeFournisseur?: string;
  nom?: string;
  equipements?: Equipement[];
  contrats?: Contrat[];
}
