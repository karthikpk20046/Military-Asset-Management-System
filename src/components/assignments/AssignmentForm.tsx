import React, { useState } from 'react';
import { Input, Select, DatePicker, Textarea } from '../ui/FormElements';
import Button from '../ui/Button';
import { mockEquipment } from '../../mock/mockData';

interface AssignmentFormProps {
  onSubmit: (data: {
    equipmentId: string;
    personnelId: string;
    dateAssigned: string;
    purpose: string;
  }) => void;
  onCancel: () => void;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    personnelId: '',
    dateAssigned: new Date().toISOString().split('T')[0],
    purpose: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Equipment is required';
    }
    
    if (!formData.personnelId) {
      newErrors.personnelId = 'Personnel is required';
    }
    
    if (!formData.dateAssigned) {
      newErrors.dateAssigned = 'Assignment date is required';
    }
    
    if (!formData.purpose) {
      newErrors.purpose = 'Purpose is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  // Filter for available equipment only
  const availableEquipment = mockEquipment.filter(
    eq => eq.status === 'available'
  );
  
  const equipmentOptions = availableEquipment.map(equipment => ({
    value: equipment.id,
    label: `${equipment.name} (${equipment.serialNumber})`
  }));
  
  // Mock personnel list - in a real app, this would come from an API
  const personnelOptions = [
    { value: 'p001', label: 'Sgt. John Wilson' },
    { value: 'p002', label: 'Lt. Sarah Johnson' },
    { value: 'p003', label: 'Pvt. Michael Davis' },
    { value: 'p004', label: 'Cpl. Robert Smith' },
    { value: 'p005', label: 'Capt. Jennifer Brown' }
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Equipment"
          name="equipmentId"
          options={equipmentOptions}
          value={formData.equipmentId}
          onChange={handleChange}
          error={errors.equipmentId}
          required
        />
        
        <Select
          label="Personnel"
          name="personnelId"
          options={personnelOptions}
          value={formData.personnelId}
          onChange={handleChange}
          error={errors.personnelId}
          required
        />
        
        <DatePicker
          label="Assignment Date"
          name="dateAssigned"
          value={formData.dateAssigned}
          onChange={handleChange}
          error={errors.dateAssigned}
          required
        />
      </div>
      
      <Textarea
        label="Purpose"
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        error={errors.purpose}
        rows={3}
        required
      />
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Assign Equipment
        </Button>
      </div>
    </form>
  );
};

export default AssignmentForm;