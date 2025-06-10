import accountJson from '../db/Account.json';
import { AccountData, Account } from '../types/account';

const typedAccountData: AccountData = accountJson;

export const getAllAccounts = (): Account[] => {
  return typedAccountData.data;
};

export const getAccountsByCompanyId = (companyId: number): Account[] => {
  return typedAccountData.data.filter(account => account.idCompany === companyId);
};

export const getAccountsByGroupId = (groupId: string): Account[] => {
  return typedAccountData.data.filter(account => account.idGroup === groupId);
};

export const getAccountsByShopId = (shopId: string): Account[] => {
  return typedAccountData.data.filter(account => account.idShop === shopId);
};