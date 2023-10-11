import { CageObj } from './cage';
export interface SpeciesObj {
  id: number;
  name: string;
  cageId: string;
  cage: CageObj;
}