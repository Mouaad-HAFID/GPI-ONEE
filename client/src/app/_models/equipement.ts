import { Agent } from './agent';
import { Contrat } from './contrat';

export interface Equipement {
  id?: number;
  serie?: string;
  codeONE?: string;
  codeContrat?: number;
  agent?: Agent;
  agentId?: number;
  inventaireId?: number;
  typeEquipementId?: number;
  mouvementId?: number;
  gammeId?: number;
}
