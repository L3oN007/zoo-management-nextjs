import { CageObj } from "./cage";
import { EmpObj } from "./employee";

export interface AnimalObj {
    id: string;
    name: string;
    region: string;
    behavior: string;
    gender: string;
    birthDate: string;
    image: string;
    healthStatus: number;
    rarity: string;
    isDeleted: number;
    empId: string;
    cageId: string;
    cage: CageObj;
    emp: EmpObj;
}