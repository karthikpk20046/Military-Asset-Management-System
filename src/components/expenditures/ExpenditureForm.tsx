import React, { useState } from 'react';
import { Input, Select, DatePicker, Textarea } from '../ui/FormElements';
import Button from '../ui/Button';
import { EquipmentType } from '../../types';
import { mockBases } from '../../mock/mockData';

interface ExpenditureFormProps {
  onSubmit: (data: {
    equipmentType: EquipmentType;
    quantity: number;
    baseId: string;
    date: string;
    purpose: string;
  }) => void;
  onCancel: () => void;
}

const ExpenditureForm: React.FC<ExpenditureFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    equipmentType: 'ammunition' as EquipmentType,
    quantity: 0,
    baseId: '',
    date: new Date().toISOString().split('T')[0],
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
    
    if (!formData.equipmentType) {
      newErrors.equipmentType = 'Equipment type is required';
    }
    
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!formData.baseId) {
      newErrors.baseId = 'Base is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
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
  
  const equipmentTypeOptions = [
    { value: 'weapon', label: 'Weapons' },
    { value: 'vehicle', label: 'Vehicles' },
    { value: 'ammunition', label: 'Ammunition' },
    { value: 'communication', label: 'Communication' },
    { value: 'medical', label: 'Medical' }
  ];
  
  const baseOptions = mockBases.map(base => ({
    value: base.id,
    label: base.name
  }));
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Equipment Type"
          name="equipmentType"
          options={equipmentTypeOptions}
          value={formData.equipmentType}
          onChange={handleChange}
          error={errors.equipmentType}
          required
        />
        
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity.toString()}
          onChange={handleChange}
          error={errors.quantity}
          min="1"
          required
        />
        
        <Select
          label="Base"
          name="baseId"
          options={baseOptions}
          value={formData.baseId}
          onChange={handleChange}
          error={errors.baseId}
          required
        />
        
        <DatePicker
          label="Expenditure Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
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
          Submit Expenditure
        </Button>
      </div>
    </form>
  );
};

export default ExpenditureForm;