import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { EcoTabReducer, EcoTabReducerActionType } from './EcoTabReducer';
import { Company } from '../../types/company';
import { Group } from '../../types/group';
import { Shop } from '../../types/shop';
import { Account } from '../../types/account';

export type TabContent = Company | Group | Shop | Account;

export interface EcoTabItem {
  key: string;
  label: string;
  closable: boolean;
  content: TabContent;
  type: 'company' | 'group' | 'shop' | 'account';
}

export interface EcoTabState {
  activeKey: string;
  items: EcoTabItem[];
}

export interface EcoTabContextType {
  state: EcoTabState;
  dispatch: Dispatch<EcoTabReducerActionType>;
}

const initialEcoTabState: EcoTabState = {
  activeKey: 'COMPANIA',
  items: [
    {
      key: 'COMPANIA',
      label: 'COMPANIA',
      closable: false,
      content: {} as Company,
      type: 'company'
    },
  ],
};

export const EcoTabContext = createContext<EcoTabContextType | undefined>(undefined);

interface EcoTabProviderProps {
  children: ReactNode;
}

export const EcoTabProvider: React.FC<EcoTabProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(EcoTabReducer, initialEcoTabState);

  return (
    <EcoTabContext.Provider value={{ state, dispatch }}>
      {children}
    </EcoTabContext.Provider>
  );
};