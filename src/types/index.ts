// Define core types for the application

// Role types for RBAC
export type UserRole = 'admin' | 'baseCommander' | 'logisticsOfficer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  baseId?: string; // Base commanders and logistics officers are assigned to specific bases
  email: string;
  avatar?: string;
}

export interface Base {
  id: string;
  name: string;
  location: string;
  commanderId?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  serialNumber: string;
  status: 'available' | 'assigned' | 'maintenance' | 'expended';
  baseId: string;
  assignedTo?: string;
}

export type EquipmentType = 'weapon' | 'vehicle' | 'ammunition' | 'communication' | 'medical';

export interface EquipmentSummary {
  equipmentType: EquipmentType;
  openingBalance: number;
  purchases: number;
  transferIn: number;
  transferOut: number;
  assigned: number;
  expended: number;
  closingBalance: number;
}

export interface Purchase {
  id: string;
  equipmentType: EquipmentType;
  quantity: number;
  baseId: string;
  date: string;
  purchaseOrder: string;
  supplier: string;
  cost: number;
}

export interface Transfer {
  id: string;
  equipmentType: EquipmentType;
  quantity: number;
  fromBaseId: string;
  toBaseId: string;
  date: string;
  authorizedBy: string;
  status: 'pending' | 'in-transit' | 'completed' | 'rejected';
}

export interface Assignment {
  id: string;
  equipmentId: string;
  personnelId: string;
  dateAssigned: string;
  dateReturned?: string;
  purpose: string;
  status: 'active' | 'returned' | 'lost';
}

export interface Expenditure {
  id: string;
  equipmentType: EquipmentType;
  quantity: number;
  baseId: string;
  date: string;
  authorizedBy: string;
  purpose: string;
}

// Dashboard filters
export interface DashboardFilters {
  dateRange: {
    start: string;
    end: string;
  };
  baseId?: string;
  equipmentType?: EquipmentType;
}