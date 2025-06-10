export interface BaseMetric {
  name: string;
  percent: number;
  color: string;
}

export interface Company {
  id: number;
  groups: number;
  shops: number;
  accounts: number;
  name: string;
  base: BaseMetric[];
}

export interface CompanyData {
  data: Company[];
}