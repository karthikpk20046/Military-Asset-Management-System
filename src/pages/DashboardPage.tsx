import React, { useState } from 'react';
import { Box, Truck, Users, ShoppingCart, PlusCircle } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/ui/Card';
import FilterBar from '../components/dashboard/FilterBar';
import EquipmentTable from '../components/dashboard/EquipmentTable';
import { DashboardFilters, EquipmentSummary } from '../types';
import { mockEquipmentSummary } from '../mock/mockData';

const DashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    }
  });
  
  // Filtered data based on the selected filters
  const filteredData = mockEquipmentSummary.filter(item => {
    if (filters.equipmentType && item.equipmentType !== filters.equipmentType) {
      return false;
    }
    
    return true;
  });
  
  // Calculate total values
  const totals = filteredData.reduce(
    (acc, curr) => {
      acc.openingBalance += curr.openingBalance;
      acc.closingBalance += curr.closingBalance;
      acc.purchases += curr.purchases;
      acc.transferIn += curr.transferIn;
      acc.transferOut += curr.transferOut;
      acc.netMovement += curr.purchases + curr.transferIn - curr.transferOut;
      acc.assigned += curr.assigned;
      acc.expended += curr.expended;
      return acc;
    },
    {
      openingBalance: 0,
      closingBalance: 0,
      purchases: 0,
      transferIn: 0,
      transferOut: 0,
      netMovement: 0,
      assigned: 0,
      expended: 0
    }
  );
  
  const handleNetMovementClick = () => {
    // In a real app, this would show a detailed modal with purchases, transfers in, and transfers out
    console.log('Net Movement clicked');
  };
  
  const handleApplyFilters = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
  };
  
  const handleRowClick = (item: EquipmentSummary) => {
    // In a real app, this would show detailed information about the selected equipment
    console.log('Equipment clicked:', item.equipmentType);
  };
  
  return (
    <div>
      <FilterBar onApplyFilters={handleApplyFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Opening Balance"
          value={totals.openingBalance}
          icon={<Box size={20} className="text-[#0F3460]" />}
        />
        
        <StatCard
          title="Net Movement"
          value={totals.netMovement >= 0 ? `+${totals.netMovement}` : totals.netMovement}
          icon={<PlusCircle size={20} className="text-[#0F3460]" />}
          onClick={handleNetMovementClick}
          className="cursor-pointer"
        />
        
        <StatCard
          title="Currently Assigned"
          value={totals.assigned}
          icon={<Users size={20} className="text-[#0F3460]" />}
        />
        
        <StatCard
          title="Closing Balance"
          value={totals.closingBalance}
          icon={<Box size={20} className="text-[#0F3460]" />}
        />
      </div>
      
      <Card title="Equipment Summary" className="mb-6">
        <EquipmentTable 
          data={filteredData} 
          onRowClick={handleRowClick}
        />
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Purchases">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="bg-[#5D8233]/20 p-2 rounded-md mr-3">
                  <ShoppingCart size={16} className="text-[#5D8233]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {index === 0 ? 'M4 Carbines (50 units)' : 
                     index === 1 ? 'Communication Equipment (20 units)' : 
                     'Medical Supplies (100 units)'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {index === 0 ? '2 days ago • Fort Alpha' : 
                     index === 1 ? '1 week ago • Base Bravo' : 
                     '2 weeks ago • Camp Charlie'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {index === 0 ? '$75,000' : 
                     index === 1 ? '$45,000' : 
                     '$25,000'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Recent Transfers">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="bg-[#0F3460]/20 p-2 rounded-md mr-3">
                  <Truck size={16} className="text-[#0F3460]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {index === 0 ? 'Ammunition (5000 units)' : 
                     index === 1 ? 'Weapons (20 units)' : 
                     'Vehicles (2 units)'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {index === 0 ? 'Base Bravo → Fort Alpha' : 
                     index === 1 ? 'Fort Alpha → Base Bravo' : 
                     'Fort Alpha → Camp Charlie'}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    index === 0 ? 'bg-amber-100 text-amber-800' : 
                    index === 1 ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index === 0 ? 'In Transit' : 
                     index === 1 ? 'Completed' : 
                     'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;