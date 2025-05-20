import React, { useState } from 'react';
import { Input, Select, DatePicker, Textarea } from '../ui/FormElements';
import Button from '../ui/Button';
import { EquipmentType } from '../../types';
import { mockBases } from '../../mock/mockData';

interface PurchaseFormProps {
  onSubmit: (data: {
    equipmentType: EquipmentType;
    quantity: number;
    baseId: string;
    date: string;
    purchaseOrder: string;
    supplier: string;
    cost: number;
  }) => void;
  onCancel: () => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    equipmentType: 'weapon' as EquipmentType,
    quantity: 0,
    baseId: '',
    date: new Date().toISOString().split('T')[0],
    purchaseOrder: '',
    supplier: '',
    cost: 0
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
    
    if (!formData.purchaseOrder) {
      newErrors.purchaseOrder = 'Purchase order is required';
    }
    
    if (!formData.supplier) {
      newErrors.supplier = 'Supplier is required';
    }
    
    if (!formData.cost || formData.cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
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
          label="Purchase Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />
        
        <Input
          label="Purchase Order"
          name="purchaseOrder"
          value={formData.purchaseOrder}
          onChange={handleChange}
          error={errors.purchaseOrder}
          required
        />
        
        <Input
          label="Cost"
          name="cost"
          type="number"
          value={formData.cost.toString()}
          onChange={handleChange}
          error={errors.cost}
          min="1"
          required
        />
      </div>
      
      <Input
        label="Supplier"
        name="supplier"
        value={formData.supplier}
        onChange={handleChange}
        error={errors.supplier}
        required
      />
      
      <Textarea
        label="Additional Notes"
        name="notes"
        rows={3}
        onChange={handleChange}
      />
      
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Purchase
        </Button>
      </div>
    </form>
  );
};

export default PurchaseForm;