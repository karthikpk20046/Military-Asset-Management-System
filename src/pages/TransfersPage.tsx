import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { DatePicker, Select } from '../components/ui/FormElements';
import TransferForm from '../components/transfers/TransferForm';
import { mockTransfers, mockBases } from '../mock/mockData';
import { Transfer, EquipmentType } from '../types';

const TransfersPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>(mockTransfers);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    fromBaseId: '',
    toBaseId: '',
    equipmentType: '' as EquipmentType | '',
    status: ''
  });
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleCreateTransfer = (data: Omit<Transfer, 'id' | 'authorizedBy' | 'status'>) => {
    const newTransfer: Transfer = {
      id: `trans${transfers.length + 1}`,
      ...data as any,
      authorizedBy: '1', // Current user ID
      status: 'pending'
    };
    
    setTransfers([newTransfer, ...transfers]);
    setIsFormVisible(false);
  };
  
  const filteredTransfers = transfers.filter(transfer => {
    if (filters.fromBaseId && transfer.fromBaseId !== filters.fromBaseId) {
      return false;
    }
    
    if (filters.toBaseId && transfer.toBaseId !== filters.toBaseId) {
      return false;
    }
    
    if (filters.equipmentType && transfer.equipmentType !== filters.equipmentType) {
      return false;
    }
    
    if (filters.status && transfer.status !== filters.status) {
      return false;
    }
    
    if (filters.startDate && transfer.date < filters.startDate) {
      return false;
    }
    
    if (filters.endDate && transfer.date > filters.endDate) {
      return false;
    }
    
    return true;
  });
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  
  const getBaseName = (baseId: string) => {
    const base = mockBases.find(b => b.id === baseId);
    return base ? base.name : 'Unknown Base';
  };
  
  const formatEquipmentType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'in-transit':
        return <Badge variant="info">In Transit</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const columns = [
    {
      header: 'Transfer Date',
      accessor: (item: Transfer) => formatDate(item.date)
    },
    {
      header: 'Equipment Type',
      accessor: (item: Transfer) => formatEquipmentType(item.equipmentType)
    },
    {
      header: 'Quantity',
      accessor: 'quantity'
    },
    {
      header: 'From',
      accessor: (item: Transfer) => getBaseName(item.fromBaseId)
    },
    {
      header: 'To',
      accessor: (item: Transfer) => getBaseName(item.toBaseId)
    },
    {
      header: 'Status',
      accessor: (item: Transfer) => getStatusBadge(item.status)
    }
  ];
  
  const equipmentTypeOptions = [
    { value: '', label: 'All Equipment Types' },
    { value: 'weapon', label: 'Weapons' },
    { value: 'vehicle', label: 'Vehicles' },
    { value: 'ammunition', label: 'Ammunition' },
    { value: 'communication', label: 'Communication' },
    { value: 'medical', label: 'Medical' }
  ];
  
  const baseOptions = [
    { value: '', label: 'All Bases' },
    ...mockBases.map(base => ({
      value: base.id,
      label: base.name
    }))
  ];
  
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Asset Transfers</h2>
          <p className="text-gray-600 text-sm">
            Transfer equipment between bases and track movement history
          </p>
        </div>
        
        <Button
          onClick={() => setIsFormVisible(true)}
          icon={<Plus size={16} />}
        >
          New Transfer
        </Button>
      </div>
      
      {isFormVisible && (
        <Card title="New Transfer" className="mb-6">
          <TransferForm
            onSubmit={handleCreateTransfer}
            onCancel={() => setIsFormVisible(false)}
          />
        </Card>
      )}
      
      <Card title="Transfer Records" className="mb-6">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <DatePicker
            label="Start Date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
          
          <DatePicker
            label="End Date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
          
          <Select
            label="Equipment Type"
            options={equipmentTypeOptions}
            value={filters.equipmentType}
            onChange={(e) => handleFilterChange('equipmentType', e.target.value)}
          />
          
          <Select
            label="From Base"
            options={baseOptions}
            value={filters.fromBaseId}
            onChange={(e) => handleFilterChange('fromBaseId', e.target.value)}
          />
          
          <Select
            label="To Base"
            options={baseOptions}
            value={filters.toBaseId}
            onChange={(e) => handleFilterChange('toBaseId', e.target.value)}
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <span className="text-sm font-medium">
            {filteredTransfers.length} 
            {filteredTransfers.length === 1 ? ' transfer' : ' transfers'} found
          </span>
        </div>
        
        <Table
          columns={columns}
          data={filteredTransfers}
          keyExtractor={(item) => item.id}
          emptyMessage="No transfers match your criteria"
        />
      </Card>
    </div>
  );
};

export default TransfersPage;