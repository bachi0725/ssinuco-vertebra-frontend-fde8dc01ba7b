import React, { useContext } from 'react';
import { Card, Progress, Space, Dropdown } from 'antd';
import {
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Company, BaseMetric } from '../types/company';
import { Group } from '../types/group';
import { Shop } from '../types/shop';
import { Account } from '../types/account';
import { EcoTabContext } from './context/EcoTabContext';
import type { MenuProps } from 'antd';

export type EcoRecord = Company | Group | Shop | Account;

interface EcoCardProps {
  record: EcoRecord;
  onCardMenuClick?: (record: EcoRecord, type: 'group' | 'shop' | 'account') => void;
  showMetrics?: boolean;
}

const EcoCard: React.FC<EcoCardProps> = ({ record, onCardMenuClick, showMetrics = true }) => {
  const context = useContext(EcoTabContext);

  if (!context) {
    throw new Error('EcoCard debe estar dentro de EcoTabProvider');
  }

  const renderProgressMetric = (metric: BaseMetric) => (
    <div key={metric.name}>
      <p style={{ margin: '0', fontSize: '14px', color: '#595959' }}>{metric.name}</p>
      <Progress percent={metric.percent} size="small" showInfo={true} strokeColor={metric.color} />
    </div>
  );

   const getMetricIconName = (metricName: string): string => {
    switch (metricName.toLowerCase()) {
      case 'current consumption':
        return 'flash_on';
      case 'base consumption':
        return 'trending_up';
      case 'six-month consumption':
        return 'bar_chart';
      case 'potential':
        return 'lightbulb';
      default:
        return 'help_outline';
    }
  };


  const menuItems: MenuProps['items'] = [];

  if ('groups' in record || 'shops' in record || 'accounts' in record) {
    if ('groups' in record && record.groups && record.groups > 0) {
      menuItems.push({
        key: 'group',
        label: 'Grupos',
        onClick: () => onCardMenuClick && onCardMenuClick(record, 'group'),
      });
    }
    if ('shops' in record && record.shops && record.shops > 0) {
      menuItems.push({
        key: 'shop',
        label: 'Tiendas',
        onClick: () => onCardMenuClick && onCardMenuClick(record, 'shop'),
      });
    }
    if ('accounts' in record && record.accounts && record.accounts > 0) {
      menuItems.push({
        key: 'account',
        label: 'Cuentas',
        onClick: () => onCardMenuClick && onCardMenuClick(record, 'account'),
      });
    }
  }

  const menuProps = {
    items: menuItems.length > 0 ? menuItems : undefined,
  };

  return (
    <Card
      title={record.name}
      style={{ width: '100%' }}
      extra={onCardMenuClick && menuItems.length > 0 ? (
        <Dropdown menu={menuProps} trigger={['click']}>
          <a onClick={e => e.preventDefault()}>
            <MoreOutlined style={{ fontSize: '20px' }} />
          </a>
        </Dropdown>
      ) : null}
    >
      {showMetrics ? (
        <div style={{ marginBottom: '16px' }}>
          {record.base.map(renderProgressMetric)}
        </div>
      ) : (
        <Space size={4} style={{ justifyContent: 'center', width: '100%', flexWrap: 'nowrap' }}>
          {record.base.map((metric) => (
            <div key={metric.name} style={{ textAlign: 'center', minWidth: '50px', flexShrink: 0 }}>
              <span className="material-icons" style={{ fontSize: '24px', color: metric.color }}>
                {getMetricIconName(metric.name)}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 'normal' }}>{metric.percent}</p>
            </div>
          ))}
        </Space>
      )}
      <Space size="large" style={{ justifyContent: 'space-around', width: '100%', flexWrap: 'wrap', marginTop: '16px' }}>
        {'groups' in record && typeof (record as Company).groups === 'number' && (
          <div style={{ textAlign: 'center' }}>
            <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <p style={{ margin: '4px 0 0' }}>{(record as Company).groups}</p>
          </div>
        )}
        {'shops' in record && typeof (record as Company | Group).shops === 'number' && (
          <div style={{ textAlign: 'center' }}>
            <ShopOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <p style={{ margin: '4px 0 0' }}>{(record as Company | Group).shops}</p>
          </div>
        )}
        {'accounts' in record && typeof (record as Company | Group | Shop).accounts === 'number' && (
          <div style={{ textAlign: 'center' }}>
            <UserOutlined style={{ fontSize: '24px', color: '#faad14' }} />
            <p style={{ margin: '4px 0 0' }}>{(record as Company | Group | Shop).accounts}</p>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default EcoCard;