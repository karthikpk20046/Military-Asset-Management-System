import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { DatePicker, Select } from '../components/ui/FormElements';
import PurchaseForm from '../components/purchases/PurchaseForm';
import { mockPurchases, mockBases } from '../mock/mockData';
import { Purchase, EquipmentType } from '../types';

const PurchasesPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    baseId: '',
    equipmentType: '' as EquipmentType | ''
  });
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleCreatePurchase = (data: Omit<Purchase, 'id'>) => {
    const newPurchase: Purchase = {
      id: `pur${purchases.length + 1}`,
      ...data as any
    };
    
    setPurchases([newPurchase, ...purchases]);
    setIsFormVisible(false);
  };
  
  const filteredPurchases = purchases.filter(purchase => {
    if (filters.baseId && purchase.baseId !== filters.baseId) {
      return false;
    }
    
    if (filters.equipmentType && purchase.equipmentType !== filters.equipmentType) {
      return false;
    }
    
    if (filters.startDate && purchase.date < filters.startDate) {
      return false;
    }
    
    if (filters.endDate && purchase.date > filters.endDate) {
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
  
  const columns = [
    {
      header: 'Purchase Date',
      accessor: (item: Purchase) => formatDate(item.date)
    },
    {
      header: 'Equipment Type',
      accessor: (item: Purchase) => formatEquipmentType(item.equipmentType)
    },
    {
      header: 'Quantity',
      accessor: 'quantity'
    },
    {
      header: 'Base',
      accessor: (item: Purchase) => getBaseName(item.baseId)
    },
    {
      header: 'Purchase Order',
      accessor: 'purchaseOrder'
    },
    {
      header: 'Supplier',
      accessor: 'supplier'
    },
    {
      header: 'Cost',
      accessor: (item: Purchase) => `$${item.cost.toLocaleString()}`
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
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Asset Purchases</h2>
          <p className="text-gray-600 text-sm">
            Record and view equipment purchases across all bases
          </p>
        </div>
        
        <Button
          onClick={() => setIsFormVisible(true)}
          icon={<Plus size={16} />}
        >
          New Purchase
        </Button>
      </div>
      
      {isFormVisible && (
        <Card title="New Purchase" className="mb-6">
          <PurchaseForm
            onSubmit={handleCreatePurchase}
            onCancel={() => setIsFormVisible(false)}
          />
        </Card>
      )}
      
      <Card title="Purchase Records" className="mb-6">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
            label="Base"
            options={baseOptions}
            value={filters.baseId}
            onChange={(e) => handleFilterChange('baseId', e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <span className="text-sm font-medium">
            {filteredPurchases.length} 
            {filteredPurchases.length === 1 ? ' purchase' : ' purchases'} found
          </span>
        </div>
        
        <Table
          columns={columns}
          data={filteredPurchases}
          keyExtractor={(item) => item.id}
          emptyMessage="No purchases match your criteria"
        />
      </Card>
    </div>
  );
};

export default PurchasesPage;