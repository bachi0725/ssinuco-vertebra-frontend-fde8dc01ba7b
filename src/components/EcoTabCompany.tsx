import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import EcoCard from './EcoCard';
import { getAllCompanies } from '../services/companyService';
import { Company } from '../types/company';
import { Group } from '../types/group';
import { Shop } from '../types/shop';
import { Account } from '../types/account';
import { EcoTabContext } from './context/EcoTabContext';
import { EcoTabReducerActionType } from './context/EcoTabReducer';
import { EcoRecord } from './EcoCard';

const EcoTabCompany: React.FC = () => {
  const allCompanies: Company[] = getAllCompanies();
  const context = useContext(EcoTabContext);

  if (!context) {
    throw new Error('EcoTabCompany debe estar dentro de EcoTabProvider');
  }

  const { dispatch } = context;

  const handleCardMenuClick = (
    record: EcoRecord,
    type: 'group' | 'shop' | 'account'
  ) => {
    if (!('idCompany' in record) && record.id) {
      const company = record as Company;

      let key = '';
      let label = '';
      let contentData: Company | Group | Shop | Account;

      switch (type) {
        case 'group':
          key = `group-${company.id}`;
          label = `Grupos de ${company.name}`;
          contentData = company;
          break;
        case 'shop':
          key = `shop-${company.id}`;
          label = `Tiendas de ${company.name}`;
          contentData = company;
          break;
        case 'account':
          key = `account-${company.id}`;
          label = `Cuentas de ${company.name}`;
          contentData = company;
          break;
        default:
            return;
      }

      dispatch({
        type: 'ADD_TAB',
        payload: {
          key: key,
          label: label,
          closable: true,
          content: contentData,
          type: type,
        },
      } as EcoTabReducerActionType);
    } else {
        console.warn("Intento de abrir pestaña con un record que no es una Company o no tiene ID:", record);
    }
  };

  return (
    <>
      {!allCompanies || allCompanies.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '150px' }}>
          No hay datos de **compañías** disponibles.
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="start">
          {allCompanies.map((company) => {
            return (
              <Col key={company.id} span={8}>
                <EcoCard record={company} onCardMenuClick={handleCardMenuClick} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default EcoTabCompany;