import { Inventaire } from './inventaire';

export interface Direction {
  id?: number;
  CodeDirection?: string;
  inventaire?: Inventaire;
  inventaireId?: number;
}
