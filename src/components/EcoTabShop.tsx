import React from 'react';
import { Row, Col } from 'antd';
import EcoCard from './EcoCard';
import { getShopsByCompanyId, getShopsByGroupId } from '../services/shopService';
import { Shop } from '../types/shop';

interface EcoTabShopProps {
  parentType: 'company' | 'group';
  parentId: number | string;
  parentName: string;
}

const EcoTabShop: React.FC<EcoTabShopProps> = ({ parentType, parentId, parentName }) => {
  let shops: Shop[] = [];

  if (parentType === 'company') {
    shops = getShopsByCompanyId(parentId as number);
  } else if (parentType === 'group') {
    shops = getShopsByGroupId(parentId as string);
  }

  return (
    <>
      {!shops || shops.length === 0 ? (
        <Row justify="center" align="middle" style={{ minHeight: '150px' }}>
          No hay datos de tiendas disponibles para {parentName}.
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="start">
          {shops.map((shop) => {
            return (
              <Col key={shop.id} span={8}>
                <EcoCard record={shop} showMetrics={false} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default EcoTabShop;