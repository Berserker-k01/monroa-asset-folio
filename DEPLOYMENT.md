# Instructions de déploiement Supabase

## Migration de la base de données

Pour ajouter les colonnes de coordonnées GPS aux biens existants, vous devez exécuter la migration SQL suivante dans votre projet Supabase :

### Option 1 : Via l'interface Supabase

1. Connectez-vous à votre [tableau de bord Supabase](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Créez une nouvelle requête
5. Copiez-collez le contenu du fichier `supabase/migrations/20251012000000_add_coordinates_to_assets.sql`
6. Exécutez la requête

### Option 2 : Via Supabase CLI

Si vous utilisez la CLI Supabase :

```bash
# Assurez-vous d'être connecté à votre projet
supabase link --project-ref votre-projet-ref

# Appliquez la migration
supabase db push
```

### Contenu de la migration

```sql
-- Add latitude and longitude columns to assets table
ALTER TABLE public.assets 
ADD COLUMN IF NOT EXISTS latitude double precision,
ADD COLUMN IF NOT EXISTS longitude double precision;

-- Add index for geospatial queries (optional but recommended for performance)
CREATE INDEX IF NOT EXISTS idx_assets_coordinates ON public.assets (latitude, longitude);

-- Add comment to describe the columns
COMMENT ON COLUMN public.assets.latitude IS 'Latitude coordinate for the asset location';
COMMENT ON COLUMN public.assets.longitude IS 'Longitude coordinate for the asset location';
```

## Nouvelles fonctionnalités

### 🗺️ Carte interactive

- Nouvelle page `/map` pour visualiser tous les biens sur une carte interactive
- Utilise OpenStreetMap pour l'affichage
- Markers cliquables avec popup d'information
- Zoom automatique sur les biens géolocalisés

### 📍 Coordonnées GPS

- Champs latitude et longitude ajoutés au formulaire d'ajout/édition de biens
- Ces champs sont optionnels
- Astuce intégrée pour obtenir les coordonnées via Google Maps

### 🎨 Logo personnalisé

- Logo `logo.png` intégré dans la navigation
- Utilisé comme favicon du site
- Ajouté aux métadonnées Open Graph pour le partage social

## Utilisation

### Ajouter des coordonnées GPS à un bien

1. Allez sur [Google Maps](https://maps.google.com)
2. Trouvez l'emplacement de votre bien
3. Faites un clic droit sur l'emplacement exact
4. Les coordonnées apparaissent (ex: 6.1256, 1.2223)
5. Copiez la latitude (premier nombre) et la longitude (second nombre)
6. Collez-les dans le formulaire d'ajout/édition de bien

### Visualiser les biens sur la carte

1. Cliquez sur "Carte" dans la navigation
2. Tous les biens avec coordonnées GPS apparaissent sur la carte
3. Cliquez sur un marker pour voir les détails du bien
4. La carte zoom automatiquement pour afficher tous vos biens

