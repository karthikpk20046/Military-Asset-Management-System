import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { DatePicker, Select } from '../ui/FormElements';
import Button from '../ui/Button';
import { DashboardFilters, EquipmentType } from '../../types';
import { mockBases } from '../../mock/mockData';

interface FilterBarProps {
  onApplyFilters: (filters: DashboardFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    }
  });
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const handleFilterChange = (key: string, value: string) => {
    if (key === 'startDate') {
      setFilters({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          start: value
        }
      });
    } else if (key === 'endDate') {
      setFilters({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          end: value
        }
      });
    } else {
      setFilters({
        ...filters,
        [key]: value || undefined
      });
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };
  
  const handleResetFilters = () => {
    const resetFilters: DashboardFilters = {
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      }
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };
  
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
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFilter}
          icon={<Filter size={16} />}
        >
          Filters
        </Button>
        
        {isOpen && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        )}
      </div>
      
      {isOpen && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Dashboard</h3>
            <button 
              onClick={toggleFilter}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <DatePicker
                label="Start Date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            
            <div>
              <DatePicker
                label="End Date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
            
            <div>
              <Select
                label="Equipment Type"
                options={equipmentTypeOptions}
                value={filters.equipmentType || ''}
                onChange={(e) => handleFilterChange('equipmentType', e.target.value as EquipmentType)}
              />
            </div>
            
            <div>
              <Select
                label="Base"
                options={baseOptions}
                value={filters.baseId || ''}
                onChange={(e) => handleFilterChange('baseId', e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;