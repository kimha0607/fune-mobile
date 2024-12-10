export interface IMedicine {
  recordId: number;
  description: string;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
  medicineName: string;
  type: string;
  activeIngredients: string;
  dosageForm: string;
  manufacture: string;
  routeOfAdministration: string;
  uses: string;
  reduceDose: string;
  equivalent: null;
  indication: string;
  dosageForCats: string;
  sideEffect: string;
  contraindication: string;
  caution: string;
  safetyLimit: string;
  safetyReversal: string;
  imageUrl: string;
  categoryLevel1: number;
  categoryLevel2: number;
  deleted: boolean;
}

export interface PayloadMedicine {
  categoryId: number;
  type: number;
}
