import { Equipement } from './equipement';

export interface Agent {
  matricule?: number;
  nom?: string;
  prenom?: string;
  dr?: string;
  dir?: string;
  domainePerso?: string;
  poste?: string;
  fonction?: string;
  uniteStruc?: string;
  equipements?: Equipement[];
}
