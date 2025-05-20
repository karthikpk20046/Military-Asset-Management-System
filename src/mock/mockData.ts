import { 
  Base, 
  Equipment, 
  Purchase, 
  Transfer, 
  Assignment, 
  Expenditure,
  User,
  EquipmentSummary
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'General Smith',
    role: 'admin',
    email: 'general.smith@military.gov',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Colonel Johnson',
    role: 'baseCommander',
    baseId: 'base1',
    email: 'colonel.johnson@military.gov',
    avatar: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Major Davis',
    role: 'baseCommander',
    baseId: 'base2',
    email: 'major.davis@military.gov',
    avatar: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Captain Wilson',
    role: 'logisticsOfficer',
    baseId: 'base1',
    email: 'captain.wilson@military.gov',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Lieutenant Martinez',
    role: 'logisticsOfficer',
    baseId: 'base2',
    email: 'lt.martinez@military.gov',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock Bases
export const mockBases: Base[] = [
  {
    id: 'base1',
    name: 'Fort Alpha',
    location: 'Northern Region',
    commanderId: '2'
  },
  {
    id: 'base2',
    name: 'Base Bravo',
    location: 'Southern Region',
    commanderId: '3'
  },
  {
    id: 'base3',
    name: 'Camp Charlie',
    location: 'Eastern Region',
    commanderId: undefined
  }
];

// Mock Equipment
export const mockEquipment: Equipment[] = [
  {
    id: 'eq1',
    name: 'M4 Carbine',
    type: 'weapon',
    serialNumber: 'W-001-2023',
    status: 'available',
    baseId: 'base1'
  },
  {
    id: 'eq2',
    name: 'Humvee',
    type: 'vehicle',
    serialNumber: 'V-001-2023',
    status: 'assigned',
    baseId: 'base1',
    assignedTo: 'unit1'
  },
  {
    id: 'eq3',
    name: '9mm Ammunition',
    type: 'ammunition',
    serialNumber: 'A-001-2023',
    status: 'available',
    baseId: 'base2'
  }
];

// Mock Purchases
export const mockPurchases: Purchase[] = [
  {
    id: 'pur1',
    equipmentType: 'weapon',
    quantity: 50,
    baseId: 'base1',
    date: '2023-08-15',
    purchaseOrder: 'PO-2023-001',
    supplier: 'Defense Systems Inc.',
    cost: 75000
  },
  {
    id: 'pur2',
    equipmentType: 'vehicle',
    quantity: 5,
    baseId: 'base2',
    date: '2023-09-01',
    purchaseOrder: 'PO-2023-002',
    supplier: 'Military Motors Corp.',
    cost: 350000
  },
  {
    id: 'pur3',
    equipmentType: 'ammunition',
    quantity: 10000,
    baseId: 'base1',
    date: '2023-09-15',
    purchaseOrder: 'PO-2023-003',
    supplier: 'Ammo Suppliers Ltd.',
    cost: 25000
  }
];

// Mock Transfers
export const mockTransfers: Transfer[] = [
  {
    id: 'trans1',
    equipmentType: 'weapon',
    quantity: 20,
    fromBaseId: 'base1',
    toBaseId: 'base2',
    date: '2023-10-05',
    authorizedBy: '2',
    status: 'completed'
  },
  {
    id: 'trans2',
    equipmentType: 'ammunition',
    quantity: 5000,
    fromBaseId: 'base2',
    toBaseId: 'base1',
    date: '2023-10-12',
    authorizedBy: '3',
    status: 'in-transit'
  },
  {
    id: 'trans3',
    equipmentType: 'vehicle',
    quantity: 2,
    fromBaseId: 'base1',
    toBaseId: 'base3',
    date: '2023-10-20',
    authorizedBy: '2',
    status: 'pending'
  }
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'asn1',
    equipmentId: 'eq1',
    personnelId: 'p001',
    dateAssigned: '2023-09-10',
    purpose: 'Border patrol',
    status: 'active'
  },
  {
    id: 'asn2',
    equipmentId: 'eq2',
    personnelId: 'p002',
    dateAssigned: '2023-09-15',
    dateReturned: '2023-10-15',
    purpose: 'Training exercise',
    status: 'returned'
  }
];

// Mock Expenditures
export const mockExpenditures: Expenditure[] = [
  {
    id: 'exp1',
    equipmentType: 'ammunition',
    quantity: 2000,
    baseId: 'base1',
    date: '2023-10-01',
    authorizedBy: '2',
    purpose: 'Training exercise'
  },
  {
    id: 'exp2',
    equipmentType: 'ammunition',
    quantity: 1500,
    baseId: 'base2',
    date: '2023-10-10',
    authorizedBy: '3',
    purpose: 'Field operation'
  }
];

// Mock Equipment Summary for Dashboard
export const mockEquipmentSummary: EquipmentSummary[] = [
  {
    equipmentType: 'weapon',
    openingBalance: 100,
    purchases: 50,
    transferIn: 0,
    transferOut: 20,
    assigned: 30,
    expended: 0,
    closingBalance: 100
  },
  {
    equipmentType: 'vehicle',
    openingBalance: 20,
    purchases: 5,
    transferIn: 0,
    transferOut: 2,
    assigned: 15,
    expended: 0,
    closingBalance: 8
  },
  {
    equipmentType: 'ammunition',
    openingBalance: 20000,
    purchases: 10000,
    transferIn: 5000,
    transferOut: 0,
    assigned: 0,
    expended: 3500,
    closingBalance: 31500
  },
  {
    equipmentType: 'communication',
    openingBalance: 50,
    purchases: 20,
    transferIn: 5,
    transferOut: 10,
    assigned: 40,
    expended: 0,
    closingBalance: 25
  },
  {
    equipmentType: 'medical',
    openingBalance: 200,
    purchases: 100,
    transferIn: 0,
    transferOut: 50,
    assigned: 100,
    expended: 25,
    closingBalance: 125
  }
];

// Current user for demo purposes
export const currentUser: User = mockUsers[0]; // Admin by default