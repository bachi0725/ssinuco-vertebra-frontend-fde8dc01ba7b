import { BaseMetric } from './company';

export interface Account {
  id: string;
  idGroup: string;
  idCompany: number;
  idShop: string;
  name: string;
  base: BaseMetric[];
}

export interface AccountData {
  data: Account[];
}