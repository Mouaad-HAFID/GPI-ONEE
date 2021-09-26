import { Agent } from './agent';
import { Contrat } from './contrat';
import { Etat } from './etat';

export interface Equipement {
  id?: number;
  serie?: string;
  serieConstructeur?: string;
  codeONE?: string;
  codeContrat?: number;
  agent?: Agent;
  agentId?: number;
  inventaireId?: number;
  typeEquipementId?: number;
  mouvementId?: number;
  gammeId?: number;
  etat?: Etat;
  etatId?: number;
  contrat?: Contrat;
  contratId?: number;
  fournisseurId?: number;
}
