/**
 * Demo mode utilities for testing without Supabase connection
 */

import { Asset } from './types';

// Demo user credentials
export const DEMO_CREDENTIALS = {
  email: 'demo@monroa.com',
  password: 'demo123',
  fullName: 'Utilisateur Démo',
};

// Demo user object
export const DEMO_USER = {
  id: 'demo-user-123',
  email: DEMO_CREDENTIALS.email,
  user_metadata: {
    full_name: DEMO_CREDENTIALS.fullName,
  },
  created_at: new Date().toISOString(),
};

// Demo assets
export const DEMO_ASSETS: Asset[] = [
  {
    id: 'demo-asset-1',
    user_id: DEMO_USER.id,
    name: 'Villa à Tokoin',
    type: 'maison',
    location: 'Tokoin, Lomé',
    latitude: 6.1520,
    longitude: 1.2362,
    estimated_value: 45000000,
    status: 'habite',
    description: 'Belle villa de 4 chambres avec jardin et piscine. Quartier calme et sécurisé.',
    images: [],
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'demo-asset-2',
    user_id: DEMO_USER.id,
    name: 'Terrain Adidogomé',
    type: 'terrain',
    location: 'Adidogomé, Lomé',
    latitude: 6.1643,
    longitude: 1.2192,
    estimated_value: 12000000,
    status: 'disponible',
    description: 'Terrain de 500m² bien situé, titre foncier disponible.',
    images: [],
    created_at: '2024-02-10T14:20:00Z',
    updated_at: '2024-02-10T14:20:00Z',
  },
  {
    id: 'demo-asset-3',
    user_id: DEMO_USER.id,
    name: 'Toyota Corolla 2020',
    type: 'voiture',
    location: 'Lomé Centre',
    latitude: 6.1319,
    longitude: 1.2228,
    estimated_value: 8500000,
    status: 'disponible',
    description: 'Voiture en excellent état, première main, entretien régulier.',
    images: [],
    created_at: '2024-03-05T09:15:00Z',
    updated_at: '2024-03-05T09:15:00Z',
  },
  {
    id: 'demo-asset-4',
    user_id: DEMO_USER.id,
    name: 'Boutique Bè Kpota',
    type: 'boutique',
    location: 'Bè Kpota, Lomé',
    latitude: 6.1170,
    longitude: 1.2480,
    estimated_value: 18000000,
    status: 'loue',
    description: 'Boutique bien placée dans un quartier commercial, loyer mensuel 150.000 F CFA.',
    images: [],
    created_at: '2024-01-20T11:45:00Z',
    updated_at: '2024-01-20T11:45:00Z',
  },
  {
    id: 'demo-asset-5',
    user_id: DEMO_USER.id,
    name: 'Terrain Agricole Kpalimé',
    type: 'terrain_agricole',
    location: 'Kpalimé, Région des Plateaux',
    latitude: 6.9000,
    longitude: 0.6333,
    estimated_value: 6000000,
    status: 'disponible',
    description: 'Terrain agricole de 2 hectares, idéal pour culture de café et cacao.',
    images: [],
    created_at: '2024-02-28T16:00:00Z',
    updated_at: '2024-02-28T16:00:00Z',
  },
  {
    id: 'demo-asset-6',
    user_id: DEMO_USER.id,
    name: 'Appartement Hédzranawoé',
    type: 'maison',
    location: 'Hédzranawoé, Lomé',
    latitude: 6.1275,
    longitude: 1.2140,
    estimated_value: 25000000,
    status: 'loue',
    description: 'Appartement F3 moderne, meublé, au 2ème étage.',
    images: [],
    created_at: '2024-03-12T13:30:00Z',
    updated_at: '2024-03-12T13:30:00Z',
  },
];

// Check if demo mode is enabled
export const isDemoMode = () => {
  return localStorage.getItem('monroa_demo_mode') === 'true';
};

// Enable demo mode
export const enableDemoMode = () => {
  localStorage.setItem('monroa_demo_mode', 'true');
  localStorage.setItem('monroa_demo_user', JSON.stringify(DEMO_USER));
  localStorage.setItem('monroa_demo_assets', JSON.stringify(DEMO_ASSETS));
};

// Disable demo mode
export const disableDemoMode = () => {
  localStorage.removeItem('monroa_demo_mode');
  localStorage.removeItem('monroa_demo_user');
  localStorage.removeItem('monroa_demo_assets');
};

// Get demo user
export const getDemoUser = () => {
  const stored = localStorage.getItem('monroa_demo_user');
  return stored ? JSON.parse(stored) : DEMO_USER;
};

// Get demo assets
export const getDemoAssets = (): Asset[] => {
  const stored = localStorage.getItem('monroa_demo_assets');
  return stored ? JSON.parse(stored) : DEMO_ASSETS;
};

// Add demo asset
export const addDemoAsset = (asset: Asset) => {
  const assets = getDemoAssets();
  const newAsset = {
    ...asset,
    id: `demo-asset-${Date.now()}`,
    user_id: DEMO_USER.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  assets.push(newAsset);
  localStorage.setItem('monroa_demo_assets', JSON.stringify(assets));
  return newAsset;
};

// Update demo asset
export const updateDemoAsset = (id: string, updates: Partial<Asset>) => {
  const assets = getDemoAssets();
  const index = assets.findIndex(a => a.id === id);
  if (index !== -1) {
    assets[index] = {
      ...assets[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem('monroa_demo_assets', JSON.stringify(assets));
    return assets[index];
  }
  return null;
};

// Delete demo asset
export const deleteDemoAsset = (id: string) => {
  const assets = getDemoAssets();
  const filtered = assets.filter(a => a.id !== id);
  localStorage.setItem('monroa_demo_assets', JSON.stringify(filtered));
  return true;
};

// Check if credentials are demo credentials
export const isDemoCredentials = (email: string, password: string) => {
  return email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
};

