import React from 'react';
import { Row, Col } from 'antd';
import EcoCard from './EcoCard';
import { getGroupsByCompanyId } from '../services/groupService';
import { Group } from '../types/group';
import { Company } from '../types/company';

interface EcoTabGroupProps {
  company: Company;
}

const EcoTabGroup: React.FC<EcoTabGroupProps> = ({ company }) => {
  const groups: Group[] = getGroupsByCompanyId(company.id);

  return (
    <>
      {!groups || groups.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '150px' }}>
          No hay datos de grupos disponibles para {company.name}.
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="start">
          {groups.map((group) => {
            return (
              <Col key={group.id} span={8}>
                <EcoCard record={group} showMetrics={false} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default EcoTabGroup;