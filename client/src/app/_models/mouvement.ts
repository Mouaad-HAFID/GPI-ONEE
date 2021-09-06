import { Agent } from './agent';
import { Equipement } from './equipement';

export interface Mouvement {
  id: number;
  typeMouvement: string;
  dateMouvement: Date;
  demandeurId: number;
  agentDemandeur: Agent;
  equipements: Equipement[];
}
