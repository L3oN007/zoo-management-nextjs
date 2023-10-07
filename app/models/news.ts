import { AnimalObj } from "./animal";
import { EmpObj } from "./employee";
import { SpeciesObj } from "./species";

export interface NewsObj {
    id: number;
    title: string;
    content: string;
    writingDate?: Date;
    image: string;
    empId: string;
    speciesId: number;
    animalId: string;
    species: SpeciesObj;
    animal: AnimalObj;
    emp: EmpObj;
}
