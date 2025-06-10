import shopsJson from '../db/Shops.json';
import { ShopData, Shop } from '../types/shop';

const typedShopData: ShopData = shopsJson;

export const getAllShops = (): Shop[] => {
  return typedShopData.data;
};

export const getShopsByCompanyId = (companyId: number): Shop[] => {
  return typedShopData.data.filter(shop => shop.idCompany === companyId);
};

export const getShopsByGroupId = (groupId: string): Shop[] => {
  return typedShopData.data.filter(shop => shop.idGroup === groupId);
};