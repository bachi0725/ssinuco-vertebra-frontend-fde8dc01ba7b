import groupsJson from '../db/Groups.json';
import { GroupData, Group } from '../types/group';

const typedGroupData: GroupData = groupsJson;

export const getAllGroups = (): Group[] => {
  return typedGroupData.data;
};

export const getGroupById = (id: string): Group | undefined => {
  return typedGroupData.data.find(group => group.id === id);
};

export const getGroupsByCompanyId = (companyId: number): Group[] => {
  return typedGroupData.data.filter(group => group.idCompany === companyId);
};