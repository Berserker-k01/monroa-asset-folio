export type AssetType = 
  | 'maison'
  | 'terrain'
  | 'voiture'
  | 'moto'
  | 'camion'
  | 'boutique'
  | 'terrain_agricole'
  | 'autre';

export type AssetStatus = 
  | 'disponible'
  | 'loue'
  | 'habite'
  | 'maintenance'
  | 'non_disponible'
  | 'en_vente'
  | 'en_bail';

export interface Asset {
  id: string;
  user_id: string;
  name: string;
  type: AssetType;
  location: string;
  latitude?: number;
  longitude?: number;
  estimated_value: number;
  status: AssetStatus;
  description?: string;
  images: string[];
  created_at: string;
  updated_at: string;
  // Marketplace fields
  is_on_marketplace?: boolean;
  sale_price?: number;
  rental_price_monthly?: number;
  lease_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  surface_area?: number;
  year_built?: number;
  features?: string[];
}

export const ASSET_TYPES: { value: AssetType; label: string }[] = [
  { value: 'maison', label: 'Maison' },
  { value: 'terrain', label: 'Terrain' },
  { value: 'voiture', label: 'Voiture' },
  { value: 'moto', label: 'Moto' },
  { value: 'camion', label: 'Camion' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'terrain_agricole', label: 'Terrain Agricole' },
  { value: 'autre', label: 'Autre' },
];

export const ASSET_STATUSES: { 
  value: AssetStatus; 
  label: string; 
  icon: string;
  color: string;
}[] = [
  { 
    value: 'disponible', 
    label: 'Disponible', 
    icon: '🟢',
    color: 'hsl(var(--status-disponible))'
  },
  { 
    value: 'loue', 
    label: 'Loué', 
    icon: '🟡',
    color: 'hsl(var(--status-loue))'
  },
  { 
    value: 'habite', 
    label: 'Habité par le propriétaire', 
    icon: '🔵',
    color: 'hsl(var(--status-habite))'
  },
  { 
    value: 'maintenance', 
    label: 'En maintenance', 
    icon: '🟠',
    color: 'hsl(var(--status-maintenance))'
  },
  { 
    value: 'non_disponible', 
    label: 'Non disponible', 
    icon: '🔴',
    color: 'hsl(var(--status-non-disponible))'
  },
  { 
    value: 'en_vente', 
    label: 'En vente', 
    icon: '💰',
    color: 'hsl(142, 76%, 36%)'
  },
  { 
    value: 'en_bail', 
    label: 'En bail', 
    icon: '📄',
    color: 'hsl(217, 91%, 60%)'
  },
];

// Transaction types
export type TransactionType = 'achat' | 'location' | 'bail';
export type TransactionStatus = 'en_attente' | 'completee' | 'annulee';

export interface Transaction {
  id: string;
  asset_id: string;
  buyer_id: string;
  seller_id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  created_at: string;
  completed_at?: string;
}

// Rental payment types
export type PaymentStatus = 'en_attente' | 'paye' | 'en_retard' | 'annule';

export interface RentalPayment {
  id: string;
  asset_id: string;
  tenant_id: string;
  landlord_id: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: PaymentStatus;
  receipt_url?: string;
  created_at: string;
}

// Notification types
export type NotificationType = 'loyer_du' | 'loyer_retard' | 'nouvelle_transaction' | 'paiement_recu';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  asset_id?: string;
  payment_id?: string;
}