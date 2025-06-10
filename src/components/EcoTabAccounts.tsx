import React from 'react';
import { Row, Col } from 'antd';
import EcoCard from './EcoCard';
import { getAccountsByCompanyId } from '../services/accountService';
import { Account } from '../types/account';

interface EcoTabAccountProps {
  parentId: number | string;
  parentType: 'company' | 'group' | 'shop';
  parentName: string;
}

const EcoTabAccount: React.FC<EcoTabAccountProps> = ({ parentId, parentType, parentName }) => {
  let accounts: Account[] = [];

  if (parentType === 'company') {
    accounts = getAccountsByCompanyId(parentId as number);
  } else if (parentType === 'group') {
    console.warn(`Función getAccountsByGroupId no implementada para parentType: ${parentType}`);
  } else if (parentType === 'shop') {
    console.warn(`Función getAccountsByShopId no implementada para parentType: ${parentType}`);
  }

  return (
    <>
      {!accounts || accounts.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '150px' }}>
          No hay datos de cuentas disponibles para {parentName}.
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="start">
          {accounts.map((account) => {
            return (
              <Col key={account.id} span={8}>
                <EcoCard record={account} showMetrics={false} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default EcoTabAccount;