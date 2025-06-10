import { BaseMetric } from './company';

export interface Group {
  id: string;
  idCompany: number;
  name: string;
  base: BaseMetric[];
  shops: number;
  accounts: number;
}

export interface GroupData {
  data: Group[];
}