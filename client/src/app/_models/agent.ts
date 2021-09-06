import { Equipement } from './equipement';

export interface Agent {
  matricule: number;
  nom: string;
  prenom: string;
  dr: string;
  directionId: number;
  equipements: Equipement[];
}
