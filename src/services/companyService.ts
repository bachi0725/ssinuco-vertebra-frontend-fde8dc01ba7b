import companyJson from '../db/Company.json';
import { CompanyData, Company } from '../types/company';

const typedCompanyData: CompanyData = companyJson;

export const getAllCompanies = (): Company[] => {
  return typedCompanyData.data;
};

export const getCompanyById = (id: number): Company | undefined => {
  return typedCompanyData.data.find(company => company.id === id);
};