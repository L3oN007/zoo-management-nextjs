import { AreaObj } from "./area";

export interface CageObj {
    id: string;
    name: string;
    maxCapacity: number;
    areaId: string;
    area: AreaObj;
}