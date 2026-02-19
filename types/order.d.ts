export interface ServiceResponse {
  success: boolean;
  data: Service[];
  count: number;
}

export interface Service {
  id: number;
  name: string;
  unitType: string;
  pricePerUnit: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
