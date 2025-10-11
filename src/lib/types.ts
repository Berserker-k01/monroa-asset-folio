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
  | 'non_disponible';

export interface Asset {
  id: string;
  user_id: string;
  name: string;
  type: AssetType;
  location: string;
  estimated_value: number;
  status: AssetStatus;
  description?: string;
  images: string[];
  created_at: string;
  updated_at: string;
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
];