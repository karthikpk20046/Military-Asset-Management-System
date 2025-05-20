import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { DatePicker, Select } from '../components/ui/FormElements';
import AssignmentForm from '../components/assignments/AssignmentForm';
import { mockAssignments, mockEquipment } from '../mock/mockData';
import { Assignment } from '../types';

const AssignmentsPage: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleCreateAssignment = (data: Omit<Assignment, 'id' | 'dateReturned' | 'status'>) => {
    const newAssignment: Assignment = {
      id: `asn${assignments.length + 1}`,
      ...data as any,
      status: 'active'
    };
    
    setAssignments([newAssignment, ...assignments]);
    setIsFormVisible(false);
    
    // Update equipment status to 'assigned'
    // In a real app, this would be handled by the backend
  };
  
  const filteredAssignments = assignments.filter(assignment => {
    if (filters.status && assignment.status !== filters.status) {
      return false;
    }
    
    if (filters.startDate && assignment.dateAssigned < filters.startDate) {
      return false;
    }
    
    if (filters.endDate) {
      if (assignment.dateReturned) {
        if (assignment.dateReturned > filters.endDate) {
          return false;
        }
      } else if (assignment.dateAssigned > filters.endDate) {
        return false;
      }
    }
    
    return true;
  });
  
  const formatDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleDateString() : '-';
  };
  
  const getEquipmentName = (equipmentId: string) => {
    const equipment = mockEquipment.find(e => e.id === equipmentId);
    return equipment ? equipment.name : 'Unknown Equipment';
  };
  
  const getEquipmentType = (equipmentId: string) => {
    const equipment = mockEquipment.find(e => e.id === equipmentId);
    return equipment ? equipment.type.charAt(0).toUpperCase() + equipment.type.slice(1) : 'Unknown';
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="info">Active</Badge>;
      case 'returned':
        return <Badge variant="success">Returned</Badge>;
      case 'lost':
        return <Badge variant="danger">Lost</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Mock personnel list - in a real app, this would come from an API
  const getPersonnelName = (personnelId: string) => {
    const personnelMap: Record<string, string> = {
      'p001': 'Sgt. John Wilson',
      'p002': 'Lt. Sarah Johnson',
      'p003': 'Pvt. Michael Davis',
      'p004': 'Cpl. Robert Smith',
      'p005': 'Capt. Jennifer Brown'
    };
    
    return personnelMap[personnelId] || 'Unknown Personnel';
  };
  
  const columns = [
    {
      header: 'Equipment',
      accessor: (item: Assignment) => getEquipmentName(item.equipmentId)
    },
    {
      header: 'Type',
      accessor: (item: Assignment) => getEquipmentType(item.equipmentId)
    },
    {
      header: 'Assigned To',
      accessor: (item: Assignment) => getPersonnelName(item.personnelId)
    },
    {
      header: 'Date Assigned',
      accessor: (item: Assignment) => formatDate(item.dateAssigned)
    },
    {
      header: 'Date Returned',
      accessor: (item: Assignment) => formatDate(item.dateReturned)
    },
    {
      header: 'Purpose',
      accessor: 'purpose'
    },
    {
      header: 'Status',
      accessor: (item: Assignment) => getStatusBadge(item.status)
    }
  ];
  
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'returned', label: 'Returned' },
    { value: 'lost', label: 'Lost' }
  ];
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Equipment Assignments</h2>
          <p className="text-gray-600 text-sm">
            Assign equipment to personnel and track assignment history
          </p>
        </div>
        
        <Button
          onClick={() => setIsFormVisible(true)}
          icon={<Plus size={16} />}
        >
          New Assignment
        </Button>
      </div>
      
      {isFormVisible && (
        <Card title="New Assignment" className="mb-6">
          <AssignmentForm
            onSubmit={handleCreateAssignment}
            onCancel={() => setIsFormVisible(false)}
          />
        </Card>
      )}
      
      <Card title="Assignment Records" className="mb-6">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <span className="text-sm font-medium">
            {filteredAssignments.length} 
            {filteredAssignments.length === 1 ? ' assignment' : ' assignments'} found
          </span>
        </div>
        
        <Table
          columns={columns}
          data={filteredAssignments}
          keyExtractor={(item) => item.id}
          emptyMessage="No assignments match your criteria"
        />
      </Card>
    </div>
  );
};

export default AssignmentsPage;