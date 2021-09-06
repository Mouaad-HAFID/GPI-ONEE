import { Agent } from './agent';

export interface Direction {
  id: number;
  nom: string;
  agents: Agent[];
  inventaireId: number;
}
