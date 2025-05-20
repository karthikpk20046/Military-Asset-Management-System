import React from 'react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import { EquipmentSummary } from '../../types';

interface EquipmentTableProps {
  data: EquipmentSummary[];
  loading?: boolean;
  onRowClick?: (item: EquipmentSummary) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  data,
  loading = false,
  onRowClick
}) => {
  const formatEquipmentType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  const columns = [
    {
      header: 'Equipment Type',
      accessor: (item: EquipmentSummary) => (
        <span className="font-medium">{formatEquipmentType(item.equipmentType)}</span>
      )
    },
    {
      header: 'Opening Balance',
      accessor: 'openingBalance'
    },
    {
      header: 'Purchases',
      accessor: (item: EquipmentSummary) => (
        <Badge variant="success" size="sm">+{item.purchases}</Badge>
      )
    },
    {
      header: 'Transfer In',
      accessor: (item: EquipmentSummary) => (
        <Badge variant="info" size="sm">+{item.transferIn}</Badge>
      )
    },
    {
      header: 'Transfer Out',
      accessor: (item: EquipmentSummary) => (
        <Badge variant="danger" size="sm">-{item.transferOut}</Badge>
      )
    },
    {
      header: 'Assigned',
      accessor: 'assigned'
    },
    {
      header: 'Expended',
      accessor: 'expended'
    },
    {
      header: 'Closing Balance',
      accessor: (item: EquipmentSummary) => (
        <span className="font-bold">{item.closingBalance}</span>
      )
    }
  ];
  
  return (
    <Table
      columns={columns}
      data={data}
      keyExtractor={(item) => item.equipmentType}
      loading={loading}
      onRowClick={onRowClick}
      emptyMessage="No equipment data available"
    />
  );
};

export default EquipmentTable;