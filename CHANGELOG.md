# Changelog - Octobre 2025

## Version 2.0.0 - Ajout de la carte interactive

### 🎉 Nouvelles fonctionnalités

#### 1. Carte Interactive 🗺️
- **Nouvelle page `/map`** pour visualiser tous les biens géolocalisés
- Carte interactive basée sur OpenStreetMap
- Markers cliquables avec popup d'information détaillée
- Zoom automatique sur tous les biens
- Lien direct vers Google Maps depuis chaque popup
- Affichage des coordonnées GPS formatées

#### 2. Géolocalisation des biens 📍
- Ajout de champs `latitude` et `longitude` dans le formulaire
- Migration Supabase pour ajouter les colonnes à la base de données
- Champs optionnels avec aide contextuelle
- Validation des coordonnées
- Utilitaires de manipulation des coordonnées GPS

#### 3. Logo personnalisé 🎨
- Logo MonRoa intégré dans la navigation desktop
- Favicon personnalisé (`logo.png`)
- Métadonnées Open Graph avec logo

#### 4. Navigation améliorée 🧭
- Nouvelle option "Carte" dans le menu
- Menu réorganisé avec 5 options principales
- Icône Map (Lucide React) pour la carte

### 🔧 Modifications techniques

#### Dépendances ajoutées
```json
{
  "react-leaflet": "^4.x",
  "leaflet": "^1.9.x",
  "@types/leaflet": "^1.9.x"
}
```

#### Nouveaux fichiers
- `src/components/MapView.tsx` - Composant carte interactive
- `src/pages/MapPage.tsx` - Page de la carte
- `src/lib/coordinates.ts` - Utilitaires GPS
- `supabase/migrations/20251012000000_add_coordinates_to_assets.sql` - Migration DB
- `GUIDE_CARTE.md` - Guide utilisateur en français
- `DEPLOYMENT.md` - Instructions de déploiement
- `CHANGELOG.md` - Ce fichier

#### Fichiers modifiés
- `src/App.tsx` - Ajout route `/map`
- `src/components/Navigation.tsx` - Ajout menu Carte + logo
- `src/pages/AddEditAsset.tsx` - Champs latitude/longitude
- `src/lib/types.ts` - Types avec coordonnées GPS
- `src/integrations/supabase/types.ts` - Types Supabase mis à jour
- `src/index.css` - Styles Leaflet importés
- `index.html` - Favicon et métadonnées
- `README.md` - Documentation mise à jour

### 📊 Base de données

#### Nouvelles colonnes (table `assets`)
- `latitude` (double precision, nullable)
- `longitude` (double precision, nullable)
- Index `idx_assets_coordinates` pour les performances

### 🚀 Déploiement

1. Installer les nouvelles dépendances : `npm install`
2. Appliquer la migration Supabase (voir `DEPLOYMENT.md`)
3. Copier `logo.png` dans le dossier public (déjà fait)
4. Build et déployer : `npm run build`

### 📚 Documentation

- **[GUIDE_CARTE.md](./GUIDE_CARTE.md)** - Guide complet pour les utilisateurs
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guide technique de déploiement
- **[README.md](./README.md)** - Documentation générale mise à jour

### 🐛 Corrections et améliorations

- Import CSS Leaflet dans `index.css`
- Fix des icônes de markers Leaflet
- Styles personnalisés pour les popups
- Responsive design de la carte
- Messages d'aide contextuelle
- Gestion des états vides (pas de coordonnées)

### 🔜 Prochaines améliorations potentielles

- [ ] Géolocalisation automatique via API
- [ ] Clusters de markers pour beaucoup de biens
- [ ] Filtres sur la carte (type, statut)
- [ ] Calcul de distances entre biens
- [ ] Export KML/GeoJSON
- [ ] Intégration itinéraire Google Maps
- [ ] Carte en plein écran
- [ ] Recherche géographique (trouver biens à proximité)

### 💡 Notes de migration

**Important** : Les biens existants n'auront pas de coordonnées GPS par défaut. Les utilisateurs devront éditer leurs biens pour ajouter les coordonnées manuellement.

### 🙏 Remerciements

Merci aux contributeurs et aux utilisateurs de MonRoa Gestion !

---

**Date de release** : Octobre 2025  
**Version** : 2.0.0  
**Compatibilité** : Rétrocompatible avec la v1.x

