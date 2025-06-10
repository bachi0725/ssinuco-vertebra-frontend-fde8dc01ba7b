import React, { useContext } from 'react';
import { Tabs } from 'antd';
import { EcoTabContext, EcoTabItem } from './context/EcoTabContext';
import { EcoTabReducerActionType } from './context/EcoTabReducer';
import EcoTabCompany from './EcoTabCompany';
import EcoTabGroup from './EcoTabGroup';
import EcoTabShop from './EcoTabShop';
import EcoTabAccount from './EcoTabAccounts';
import { Company } from '../types/company';
import { Group } from '../types/group';
import { Shop } from '../types/shop';
import { Account } from '../types/account';

const { TabPane } = Tabs;

const EcoEficiencia: React.FC = () => {
  const context = useContext(EcoTabContext);

  if (!context) {
    throw new Error('EcoEficiencia debe estar dentro de EcoTabProvider');
  }

  const { state, dispatch } = context;

  const onTabChange = (activeKey: string) => {
    dispatch({ type: 'SET_ACTIVE_KEY', payload: activeKey });
  };

  const onTabEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      dispatch({ type: 'REMOVE_TAB', payload: targetKey });
    }
  };

  const renderTabContent = (item: EcoTabItem) => {
    switch (item.type) {
      case 'company':
        return <EcoTabCompany />;
      case 'group':
        const parentCompanyForGroup = item.content as Company;
        return (
          <EcoTabGroup
            company={parentCompanyForGroup}
          />
        );
      case 'shop':
        const parentRecordShop = item.content as Company | Group;
        return (
          <EcoTabShop
            parentType={('groups' in parentRecordShop && typeof parentRecordShop.groups === 'number') ? 'company' : 'group'}
            parentId={('groups' in parentRecordShop && typeof parentRecordShop.groups === 'number') ? (parentRecordShop as Company).id : (parentRecordShop as Group).id}
            parentName={parentRecordShop.name}
          />
        );
      case 'account':
        const parentOfAccounts = item.content as Company | Group | Shop;

        let idToPassToAccountTab: number | string;
        let accountParentType: 'company' | 'group' | 'shop';

        if ('idCompany' in parentOfAccounts) {
            if ('idShop' in parentOfAccounts) {
                idToPassToAccountTab = (parentOfAccounts as Shop).id;
                accountParentType = 'shop';
            } else {
                idToPassToAccountTab = (parentOfAccounts as Group).id;
                accountParentType = 'group';
            }
        } else if ('id' in parentOfAccounts && typeof parentOfAccounts.id === 'number') {
            idToPassToAccountTab = (parentOfAccounts as Company).id;
            accountParentType = 'company';
        } else {
            console.error("Tipo de contenido de cuenta inesperado o ID inválido:", parentOfAccounts);
            return <div>Error: Tipo de contenido de cuenta no reconocido o ID inválido.</div>;
        }

        return (
          <EcoTabAccount
            parentId={idToPassToAccountTab}
            parentType={accountParentType}
            parentName={parentOfAccounts.name}
          />
        );
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <Tabs
      type="editable-card"
      activeKey={state.activeKey}
      onChange={onTabChange}
      onEdit={onTabEdit}
      hideAdd
    >
      {state.items.map((item) => (
        <TabPane
          tab={item.label}
          key={item.key}
          closable={item.closable}
          className="eco-tab-pane"
        >
          {renderTabContent(item)}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default EcoEficiencia;