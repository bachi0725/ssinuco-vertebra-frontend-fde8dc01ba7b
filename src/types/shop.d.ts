import { BaseMetric } from './company';

export interface Shop {
  idGroup: string;
  idCompany: number;
  id: string;
  name: string;
  base: BaseMetric[];
  accounts: number;
}

export interface ShopData {
  data: Shop[];
}