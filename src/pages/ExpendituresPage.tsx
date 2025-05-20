import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { DatePicker, Select } from '../components/ui/FormElements';
import ExpenditureForm from '../components/expenditures/ExpenditureForm';
import { mockExpenditures, mockBases } from '../mock/mockData';
import { Expenditure, EquipmentType } from '../types';

const ExpendituresPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expenditures, setExpenditures] = useState<Expenditure[]>(mockExpenditures);
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
  
  const handleCreateExpenditure = (data: Omit<Expenditure, 'id' | 'authorizedBy'>) => {
    const newExpenditure: Expenditure = {
      id: `exp${expenditures.length + 1}`,
      ...data as any,
      authorizedBy: '1' // Current user ID
    };
    
    setExpenditures([newExpenditure, ...expenditures]);
    setIsFormVisible(false);
  };
  
  const filteredExpenditures = expenditures.filter(expenditure => {
    if (filters.baseId && expenditure.baseId !== filters.baseId) {
      return false;
    }
    
    if (filters.equipmentType && expenditure.equipmentType !== filters.equipmentType) {
      return false;
    }
    
    if (filters.startDate && expenditure.date < filters.startDate) {
      return false;
    }
    
    if (filters.endDate && expenditure.date > filters.endDate) {
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
      header: 'Expenditure Date',
      accessor: (item: Expenditure) => formatDate(item.date)
    },
    {
      header: 'Equipment Type',
      accessor: (item: Expenditure) => formatEquipmentType(item.equipmentType)
    },
    {
      header: 'Quantity',
      accessor: 'quantity'
    },
    {
      header: 'Base',
      accessor: (item: Expenditure) => getBaseName(item.baseId)
    },
    {
      header: 'Purpose',
      accessor: 'purpose'
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
          <h2 className="text-xl font-bold mb-1">Asset Expenditures</h2>
          <p className="text-gray-600 text-sm">
            Record and view equipment expenditures across all bases
          </p>
        </div>
        
        <Button
          onClick={() => setIsFormVisible(true)}
          icon={<Plus size={16} />}
        >
          New Expenditure
        </Button>
      </div>
      
      {isFormVisible && (
        <Card title="New Expenditure" className="mb-6">
          <ExpenditureForm
            onSubmit={handleCreateExpenditure}
            onCancel={() => setIsFormVisible(false)}
          />
        </Card>
      )}
      
      <Card title="Expenditure Records" className="mb-6">
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
            {filteredExpenditures.length} 
            {filteredExpenditures.length === 1 ? ' expenditure' : ' expenditures'} found
          </span>
        </div>
        
        <Table
          columns={columns}
          data={filteredExpenditures}
          keyExtractor={(item) => item.id}
          emptyMessage="No expenditures match your criteria"
        />
      </Card>
    </div>
  );
};

export default ExpendituresPage;