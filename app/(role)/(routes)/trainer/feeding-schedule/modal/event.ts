interface Animal {
    animalId: string;
    name: string;
    region: string;
    behavior: null | string;
    gender: string;
    birthDate: string;
    importDate: string;
    image: string[]; // An array of image URLs
    healthStatus: number;
    rarity: string;
    isDeleted: number;
    employeeId: string;
    cageId: string;
    speciesId: number;
    employee: null | any; 
    animalSpecies: null | any; 
    cage: null | Cage; 
}

export interface Event {
    no: number;
    scheduleNo: string;
    cageId: string;
    animalId: null | string;
    note: string;
    createdTime: string;
    employeeId: string;
    StartTime: string;
    EndTime: string;
    feedingAmount: number;
    feedingStatus: number;
    animal: Animal | null;
    cage: Cage | null;
    feedingMenu: {
        menuNo: string;
        menuName: string;
        foodId: string;
        foodInventory: null | any;
    };
}

interface Cage {
    cageId: string;
    name: string;
    maxCapacity: number;
    areaId: string;
    area: null | any; 
}