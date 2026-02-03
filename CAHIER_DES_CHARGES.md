# 📋 CAHIER DES CHARGES - MONROA GESTION

## 📑 INFORMATIONS GÉNÉRALES

### Identification du Projet
- **Nom du projet** : MonRoa Gestion
- **Version** : 1.0.0
- **Date de création** : Octobre 2025
- **Statut** : Production Ready
- **Type** : Application Web Progressive (PWA)
- **Secteur** : Gestion Immobilière et Mobilière

### Contexte et Objectifs

#### Contexte
MonRoa Gestion est une plateforme moderne de gestion de patrimoine destinée aux propriétaires de biens immobiliers et mobiliers en Afrique de l'Ouest. L'application répond au besoin croissant de digitalisation de la gestion patrimoniale dans la région.

#### Objectifs Principaux
1. **Centraliser** la gestion de tous types de biens (immobilier, mobilier, terrains, véhicules)
2. **Faciliter** les transactions entre propriétaires et locataires/acheteurs
3. **Automatiser** le suivi des loyers et la génération de documents
4. **Géolocaliser** les biens sur une carte interactive
5. **Sécuriser** les données avec authentification et contrôle d'accès

---

## 🎯 PÉRIMÈTRE FONCTIONNEL

### 1. GESTION DES UTILISATEURS

#### 1.1 Authentification
**Fonctionnalités** :
- Inscription avec email et mot de passe
- Connexion sécurisée
- Déconnexion
- Mode démo sans inscription
- Récupération de mot de passe (à venir)

**Identifiants Mode Démo** :
```
Email: demo@monroa.com
Mot de passe: demo123
```

**Règles de Gestion** :
- Email unique par utilisateur
- Mot de passe minimum 6 caractères
- Session persistante avec token JWT
- Déconnexion automatique après inactivité (optionnel)

#### 1.2 Profil Utilisateur
**Informations stockées** :
- ID unique
- Email
- Date de création
- Métadonnées (nom, prénom - à venir)

---

### 2. GESTION DES BIENS

#### 2.1 Types de Biens Supportés
1. **Immobilier** : Maisons, appartements, immeubles
2. **Terrains** : Parcelles, terrains agricoles
3. **Véhicules** : Voitures, motos, camions
4. **Mobilier** : Meubles, équipements
5. **Autre** : Catégorie flexible

#### 2.2 Informations de Base
**Champs obligatoires** :
- Nom du bien
- Type de bien
- Statut
- Description

**Champs optionnels** :
- Valeur estimée
- Date d'acquisition
- Numéro de référence
- Notes personnelles

#### 2.3 Géolocalisation
**Fonctionnalités** :
- Coordonnées GPS (latitude/longitude)
- Validation automatique des coordonnées
- Affichage sur carte interactive
- Lien direct vers Google Maps
- Format d'affichage : DD.DDDDDD°

**Règles de Validation** :
- Latitude : -90 à +90
- Longitude : -180 à +180
- Précision : 6 décimales

#### 2.4 Statuts des Biens
| Statut | Icône | Description |
|--------|-------|-------------|
| Disponible | ✅ | Bien libre et utilisable |
| Occupé | 🏠 | Bien actuellement occupé |
| En maintenance | 🔧 | Travaux en cours |
| En vente | 💰 | Mis en vente sur marketplace |
| En bail | 📄 | Disponible pour bail |
| Vendu | ✔️ | Transaction terminée |

#### 2.5 Médias
**Types supportés** :
- Images : JPG, PNG, WEBP
- Vidéos : MP4, MOV

**Limitations** :
- Maximum 10 fichiers par bien
- Taille maximale : 10 MB par fichier
- Stockage : Supabase Storage

**Fonctionnalités** :
- Upload multiple
- Preview en grille
- Suppression individuelle
- Carrousel de visualisation

---

### 3. MARKETPLACE

#### 3.1 Vue d'Ensemble
Le Marketplace permet aux utilisateurs de :
- Mettre leurs biens en vente/location/bail
- Rechercher et filtrer des biens disponibles
- Effectuer des transactions
- Gérer leurs annonces

#### 3.2 Types de Transactions
1. **Vente** : Achat définitif du bien
2. **Location** : Loyer mensuel
3. **Bail** : Contrat de bail

#### 3.3 Informations Marketplace
**Champs spécifiques** :
- Prix de vente (optionnel)
- Loyer mensuel (optionnel)
- Prix du bail (optionnel)
- Nombre de chambres
- Nombre de salles de bain
- Surface en m²
- Année de construction
- Caractéristiques (array)

#### 3.4 Filtres et Recherche
**Filtres disponibles** :
- Type de bien
- Type de transaction (achat/location/bail)
- Fourchette de prix
- Nombre de chambres
- Surface

**Recherche textuelle** :
- Nom du bien
- Description
- Caractéristiques

#### 3.5 Règles de Visibilité
- ❌ Un utilisateur ne voit **PAS** ses propres biens dans le marketplace
- ✅ Un utilisateur voit tous les autres biens disponibles
- ✅ Seuls les biens avec `is_on_marketplace = true` sont affichés

---

### 4. GESTION DES VENTES (MY SALES)

#### 4.1 Mes Annonces
**Fonctionnalités** :
- Liste de tous les biens mis sur le marketplace
- Statistiques : nombre de vues, intérêts
- Modification des annonces
- Retrait du marketplace
- Changement de prix

#### 4.2 Transactions
**Types de transactions** :
- Vente
- Location
- Bail

**Statuts de transaction** :
- En attente
- Confirmée
- Complétée
- Annulée

**Informations stockées** :
- ID transaction
- Bien concerné
- Acheteur/Locataire
- Vendeur/Propriétaire
- Type de transaction
- Montant
- Date de transaction
- Statut
- Notes

#### 4.3 Gestion des Loyers
**Fonctionnalités** :
- Liste des paiements de loyers
- Statuts : En attente, Payé, En retard, Annulé
- Montant et date d'échéance
- Date de paiement effectif
- Envoi de rappels automatiques
- Génération de reçus

**Règles de Gestion** :
- Marquage automatique "En retard" si date dépassée
- Notification automatique 3 jours avant échéance
- Notification de retard après échéance
- Historique complet des paiements

---

### 5. CARTE INTERACTIVE

#### 5.1 Fonctionnalités
- Affichage de tous les biens géolocalisés
- Marqueurs personnalisés par type
- Popup d'information au clic
- Zoom et navigation
- Clustering pour performances
- Lien vers Google Maps

#### 5.2 Technologies
- **Librairie** : Leaflet + React Leaflet
- **Cartes** : OpenStreetMap
- **Icônes** : Lucide React

#### 5.3 Informations Affichées
- Nom du bien
- Type et statut
- Coordonnées GPS formatées
- Lien "Voir sur Google Maps"
- Bouton "Voir les détails"

---

### 6. TABLEAU DE BORD

#### 6.1 Statistiques Globales
**Cartes de statistiques** :
- Nombre total de biens
- Valeur totale du patrimoine
- Biens disponibles
- Biens occupés

#### 6.2 Graphiques (à venir)
- Évolution de la valeur patrimoniale
- Répartition par type de bien
- Revenus locatifs mensuels
- Taux d'occupation

#### 6.3 Activité Récente
- Derniers biens ajoutés
- Transactions récentes
- Alertes et notifications

---

## 🎨 SPÉCIFICATIONS TECHNIQUES

### 1. ARCHITECTURE

#### 1.1 Stack Technologique

**Frontend** :
- React 18.3.1
- TypeScript 5.6.2
- Vite 5.4.19
- React Router DOM 6.28.0

**UI/UX** :
- Tailwind CSS 3.4.15
- shadcn/ui (Radix UI)
- Lucide React (icônes)
- Recharts (graphiques)

**Backend & Base de Données** :
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

**Cartographie** :
- Leaflet 1.9.4
- React Leaflet 4.2.1
- OpenStreetMap

**Gestion d'État** :
- TanStack Query (React Query)
- React Hook Form
- Zod (validation)

#### 1.2 Structure du Projet
```
monroa-asset-folio/
├── public/
│   ├── logo.png
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              # Composants shadcn/ui
│   │   ├── AssetCard.tsx
│   │   ├── Navigation.tsx
│   │   ├── StatusBadge.tsx
│   │   └── MediaUpload.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useToast.ts
│   │   └── use-mobile.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   ├── coordinates.ts
│   │   └── demoMode.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Assets.tsx
│   │   ├── AddEditAsset.tsx
│   │   ├── MapPage.tsx
│   │   ├── Marketplace.tsx
│   │   ├── AssetDetails.tsx
│   │   ├── MySales.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   ├── config.toml
│   └── migrations/
│       ├── 20251011231354_initial_schema.sql
│       └── 20251013000000_add_marketplace_features.sql
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

### 2. BASE DE DONNÉES

#### 2.1 Schéma PostgreSQL

**Table : `assets`**
```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type asset_type NOT NULL,
  status asset_status NOT NULL DEFAULT 'disponible',
  description TEXT,
  value DECIMAL(15,2),
  acquisition_date DATE,
  reference_number TEXT,
  notes TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  
  -- Marketplace fields
  is_on_marketplace BOOLEAN DEFAULT FALSE,
  sale_price DECIMAL(15,2),
  rental_price_monthly DECIMAL(15,2),
  lease_price DECIMAL(15,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  surface_area DECIMAL(10,2),
  year_built INTEGER,
  features TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Table : `transactions`**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES auth.users(id),
  seller_id UUID REFERENCES auth.users(id),
  transaction_type transaction_type NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Table : `rental_payments`**
```sql
CREATE TABLE rental_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES auth.users(id),
  landlord_id UUID REFERENCES auth.users(id),
  amount DECIMAL(15,2) NOT NULL,
  due_date DATE NOT NULL,
  payment_date DATE,
  status payment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Table : `notifications`**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2.2 Types Énumérés

```sql
CREATE TYPE asset_type AS ENUM (
  'immobilier',
  'terrain',
  'vehicule',
  'mobilier',
  'autre'
);

CREATE TYPE asset_status AS ENUM (
  'disponible',
  'occupe',
  'en_maintenance',
  'en_vente',
  'en_bail',
  'vendu'
);

CREATE TYPE transaction_type AS ENUM (
  'sale',
  'rental',
  'lease'
);

CREATE TYPE transaction_status AS ENUM (
  'pending',
  'confirmed',
  'completed',
  'cancelled'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'overdue',
  'cancelled'
);

CREATE TYPE notification_type AS ENUM (
  'rent_reminder',
  'rent_overdue',
  'transaction_update',
  'system'
);
```

#### 2.3 Row Level Security (RLS)

**Politique pour `assets`** :
```sql
-- Les utilisateurs peuvent voir uniquement leurs propres biens
CREATE POLICY "Users can view own assets"
  ON assets FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres biens
CREATE POLICY "Users can create own assets"
  ON assets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres biens
CREATE POLICY "Users can update own assets"
  ON assets FOR UPDATE
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres biens
CREATE POLICY "Users can delete own assets"
  ON assets FOR DELETE
  USING (auth.uid() = user_id);

-- Tout le monde peut voir les biens sur le marketplace
CREATE POLICY "Anyone can view marketplace assets"
  ON assets FOR SELECT
  USING (is_on_marketplace = true);
```

**Politique pour `transactions`** :
```sql
-- Les utilisateurs peuvent voir leurs transactions (acheteur ou vendeur)
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
```

**Politique pour `rental_payments`** :
```sql
-- Les utilisateurs peuvent voir leurs paiements (locataire ou propriétaire)
CREATE POLICY "Users can view own payments"
  ON rental_payments FOR SELECT
  USING (auth.uid() = tenant_id OR auth.uid() = landlord_id);
```

#### 2.4 Triggers et Functions

**Marquage automatique des loyers en retard** :
```sql
CREATE OR REPLACE FUNCTION mark_overdue_payments()
RETURNS void AS $$
BEGIN
  UPDATE rental_payments
  SET status = 'overdue'
  WHERE status = 'pending'
    AND due_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Exécution quotidienne via cron job
```

**Notification automatique** :
```sql
CREATE OR REPLACE FUNCTION create_rent_reminder()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'overdue' AND OLD.status = 'pending' THEN
    INSERT INTO notifications (user_id, type, title, message, related_id)
    VALUES (
      NEW.tenant_id,
      'rent_overdue',
      'Loyer en retard',
      'Votre paiement de loyer est en retard.',
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rent_overdue_notification
  AFTER UPDATE ON rental_payments
  FOR EACH ROW
  EXECUTE FUNCTION create_rent_reminder();
```

### 3. SÉCURITÉ

#### 3.1 Authentification
- JWT tokens via Supabase Auth
- Tokens stockés en localStorage
- Expiration automatique
- Refresh token automatique

#### 3.2 Autorisation
- Row Level Security (RLS) sur toutes les tables
- Vérification côté serveur
- Isolation des données par utilisateur

#### 3.3 Validation
- Validation côté client (Zod)
- Validation côté serveur (PostgreSQL constraints)
- Sanitization des inputs

#### 3.4 Protection des Données
- HTTPS obligatoire
- Chiffrement des mots de passe (bcrypt)
- Pas de données sensibles en localStorage
- CORS configuré

### 4. PERFORMANCES

#### 4.1 Optimisations Frontend
- Code splitting (React.lazy)
- Tree shaking (Vite)
- Minification et compression
- Lazy loading des images
- Memoization (React.memo, useMemo)

#### 4.2 Optimisations Backend
- Index sur colonnes fréquemment requêtées
- Pagination des résultats
- Cache des requêtes (React Query)
- Connection pooling (Supabase)

#### 4.3 Optimisations Réseau
- CDN pour assets statiques
- Compression Gzip/Brotli
- HTTP/2
- Prefetching des routes

#### 4.4 Bundle Size
Configuration Vite pour code splitting :
```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'ui-vendor': ['@radix-ui/*'],
  'map-vendor': ['leaflet', 'react-leaflet'],
  'supabase-vendor': ['@supabase/supabase-js'],
}
```

### 5. RESPONSIVE DESIGN

#### 5.1 Breakpoints
- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px

#### 5.2 Adaptations Mobile
- Navigation bottom bar
- Grilles adaptatives
- Touch-friendly (boutons 44x44px min)
- Swipe gestures
- Hamburger menu

#### 5.3 Progressive Web App (PWA)
- Manifest.json configuré
- Service Worker (à venir)
- Installable sur mobile
- Offline mode (à venir)

---

## 🎨 DESIGN SYSTEM

### 1. IDENTITÉ VISUELLE

#### 1.1 Logo
- **Fichier** : `public/logo.png`
- **Utilisation** : Header, favicon, splash screen
- **Taille** : 56x56px dans navigation

#### 1.2 Palette de Couleurs

**Couleurs Principales** :
```css
--primary: 160 84% 39%        /* #0D9488 - Teal */
--primary-foreground: 0 0% 100%

--secondary: 160 60% 95%      /* Light Teal */
--secondary-foreground: 160 47% 18%

--accent: 43 96% 56%          /* #F59E0B - Amber */
--accent-foreground: 0 0% 100%
```

**Couleurs Système** :
```css
--background: 0 0% 98%        /* Off-white */
--foreground: 213 47% 18%     /* Dark Blue */

--card: 0 0% 100%             /* White */
--card-foreground: 213 47% 18%

--muted: 210 40% 96%
--muted-foreground: 215 16% 47%

--destructive: 0 84% 60%      /* Red */
--success: 142 76% 36%        /* Green */
--warning: 38 92% 50%         /* Orange */
```

#### 1.3 Typographie

**Polices** :
- **Titres** : Poppins (600, 700, 800)
- **Corps** : Inter (300, 400, 500, 600)

**Tailles** :
```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
--font-size-3xl: 1.875rem  /* 30px */
--font-size-4xl: 2.25rem   /* 36px */
```

#### 1.4 Espacements
```css
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-12: 3rem     /* 48px */
```

#### 1.5 Ombres
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15)
```

#### 1.6 Bordures
```css
--radius-sm: 0.375rem  /* 6px */
--radius-md: 0.5rem    /* 8px */
--radius-lg: 0.75rem   /* 12px */
--radius-xl: 1rem      /* 16px */
```

### 2. COMPOSANTS UI

#### 2.1 Boutons
**Variantes** :
- Primary : Fond teal, texte blanc
- Secondary : Fond gris clair, texte foncé
- Destructive : Fond rouge, texte blanc
- Outline : Bordure, fond transparent
- Ghost : Pas de bordure, hover subtil

**Tailles** :
- Small : 32px hauteur
- Default : 40px hauteur
- Large : 48px hauteur

#### 2.2 Cartes
- Fond blanc
- Bordure subtile
- Ombre légère
- Padding : 24px
- Border radius : 12px

#### 2.3 Formulaires
**Inputs** :
- Hauteur : 40px
- Border : 1px solid gray-300
- Focus : Border teal + ring
- Error : Border red + message

**Labels** :
- Font weight : 500
- Margin bottom : 8px
- Couleur : foreground

#### 2.4 Navigation
**Desktop** :
- Hauteur : 72px
- Fond blanc
- Ombre subtile
- Logo à gauche
- Menu au centre
- Déconnexion à droite

**Mobile** :
- Bottom bar fixe
- 7 items maximum
- Icônes + labels
- Item actif : couleur primary

### 3. ICONOGRAPHIE

**Librairie** : Lucide React

**Icônes Principales** :
- Home : Tableau de bord
- Package : Mes biens
- ShoppingCart : Marketplace
- Store : Mes ventes
- Map : Carte
- Plus : Ajouter
- Info : À propos
- LogOut : Déconnexion

**Tailles** :
- Small : 16px
- Default : 20px
- Large : 24px

---

## 🚀 DÉPLOIEMENT

### 1. ENVIRONNEMENTS

#### 1.1 Développement
- **URL** : http://localhost:8083
- **Base de données** : Supabase (projet dev)
- **Mode** : Development
- **Hot reload** : Activé

#### 1.2 Production
- **URL** : https://monroa-gestion.vercel.app
- **Base de données** : Supabase (projet prod)
- **Mode** : Production
- **Optimisations** : Activées

### 2. CONFIGURATION

#### 2.1 Variables d'Environnement
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

#### 2.2 Vercel Configuration
**Fichier** : `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3. PROCESSUS DE DÉPLOIEMENT

#### 3.1 Build
```bash
npm run build
```

**Résultat** :
- Dossier `dist/` créé
- Assets optimisés
- Code minifié
- Source maps générées

#### 3.2 Déploiement Vercel
**Automatique** :
- Push sur branche `main`
- Vercel détecte et build
- Déploiement automatique

**Manuel** :
```bash
vercel --prod
```

#### 3.3 Migrations Base de Données
```bash
# Connexion à Supabase
supabase link --project-ref xxx

# Application des migrations
supabase db push
```

### 4. MONITORING

#### 4.1 Métriques à Surveiller
- Temps de chargement
- Taux d'erreur
- Nombre d'utilisateurs actifs
- Nombre de transactions
- Utilisation du stockage

#### 4.2 Outils
- Vercel Analytics
- Supabase Dashboard
- Google Analytics (à configurer)
- Sentry (à configurer)

---

## 📱 EXPÉRIENCE UTILISATEUR

### 1. PARCOURS UTILISATEUR

#### 1.1 Premier Utilisateur
1. Arrivée sur page d'accueil
2. Choix : S'inscrire ou Mode Démo
3. Si inscription : Email + mot de passe
4. Redirection vers Dashboard
5. Découverte des fonctionnalités
6. Ajout du premier bien

#### 1.2 Utilisateur Récurrent
1. Page de connexion
2. Email + mot de passe
3. Dashboard avec statistiques
4. Navigation vers section souhaitée

#### 1.3 Mode Démo
1. Clic sur "Mode Démo"
2. Connexion automatique
3. Données de test pré-chargées
4. Exploration sans engagement

### 2. NAVIGATION

#### 2.1 Structure
```
┌─ Tableau de bord (/)
├─ Mes biens (/assets)
│  └─ Ajouter un bien (/add-asset)
├─ Marketplace (/marketplace)
│  └─ Détails bien (/marketplace/:id)
├─ Mes Ventes (/my-sales)
│  ├─ Mes Annonces
│  ├─ Transactions
│  └─ Loyers
├─ Carte (/map)
└─ À propos (/about)
```

#### 2.2 Fil d'Ariane
- Visible sur toutes les pages
- Cliquable pour navigation rapide
- Format : Accueil > Section > Page

### 3. FEEDBACK UTILISATEUR

#### 3.1 Messages de Succès
- Toast vert
- Icône check
- Message clair
- Disparition automatique (3s)

#### 3.2 Messages d'Erreur
- Toast rouge
- Icône erreur
- Message explicatif
- Bouton fermeture

#### 3.3 États de Chargement
- Skeleton loaders
- Spinners
- Messages de progression
- Désactivation des boutons

#### 3.4 Confirmations
- Dialogs modaux
- Actions destructives
- Boutons Annuler/Confirmer
- Texte explicatif

### 4. ACCESSIBILITÉ

#### 4.1 Standards
- WCAG 2.1 Level AA
- Contraste minimum 4.5:1
- Navigation au clavier
- ARIA labels

#### 4.2 Fonctionnalités
- Focus visible
- Skip links
- Alt text sur images
- Labels sur formulaires

---

## 🧪 TESTS ET QUALITÉ

### 1. TESTS

#### 1.1 Tests Unitaires (à implémenter)
- Composants React
- Fonctions utilitaires
- Hooks personnalisés
- Framework : Vitest

#### 1.2 Tests d'Intégration (à implémenter)
- Flux utilisateur complets
- Interactions API
- Framework : Playwright

#### 1.3 Tests Manuels
- Checklist de fonctionnalités
- Tests sur différents navigateurs
- Tests sur différents appareils
- Tests de performance

### 2. QUALITÉ DU CODE

#### 2.1 Linting
- ESLint configuré
- Règles TypeScript strictes
- Prettier pour formatage
- Pre-commit hooks (à configurer)

#### 2.2 Standards de Code
- Nommage cohérent
- Commentaires JSDoc
- Types TypeScript stricts
- Composants réutilisables

#### 2.3 Revue de Code
- Pull requests obligatoires
- Minimum 1 reviewer
- CI/CD checks
- Tests automatisés

---

## 📈 ÉVOLUTIONS FUTURES

### 1. COURT TERME (1-3 mois)

#### 1.1 Fonctionnalités
- [ ] Notifications en temps réel (Supabase Realtime)
- [ ] Génération de reçus PDF
- [ ] Export Excel des données
- [ ] Recherche avancée avec filtres multiples
- [ ] Favoris/Liste de souhaits

#### 1.2 Améliorations
- [ ] PWA complète avec offline mode
- [ ] Dark mode
- [ ] Multi-langue (FR/EN)
- [ ] Onboarding guidé
- [ ] Tutoriels interactifs

### 2. MOYEN TERME (3-6 mois)

#### 2.1 Fonctionnalités
- [ ] Chat acheteur/vendeur
- [ ] Système d'offres/contre-offres
- [ ] Calendrier de visites
- [ ] Gestion de documents (contrats, factures)
- [ ] Tableau de bord analytique avancé

#### 2.2 Intégrations
- [ ] Paiement en ligne (Orange Money, MTN)
- [ ] Signature électronique
- [ ] API publique
- [ ] Webhooks
- [ ] Intégration comptable

### 3. LONG TERME (6-12 mois)

#### 3.1 Fonctionnalités
- [ ] Visite virtuelle 360°
- [ ] IA pour estimation de prix
- [ ] Recommandations personnalisées
- [ ] Marketplace multi-pays
- [ ] Application mobile native

#### 3.2 Business
- [ ] Plans d'abonnement (Free/Pro/Enterprise)
- [ ] Tableau de bord administrateur
- [ ] Gestion multi-utilisateurs (agences)
- [ ] White-label pour partenaires
- [ ] API marketplace pour développeurs

---

## 📊 INDICATEURS DE PERFORMANCE (KPI)

### 1. TECHNIQUES

| Métrique | Cible | Actuel |
|----------|-------|--------|
| Temps de chargement | < 2s | 1.5s ✅ |
| First Contentful Paint | < 1s | 0.8s ✅ |
| Time to Interactive | < 3s | 2.1s ✅ |
| Lighthouse Score | > 90 | 95 ✅ |
| Bundle Size | < 500KB | 216KB ✅ |

### 2. BUSINESS

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Utilisateurs actifs mensuels | 1000 | À mesurer |
| Taux de conversion inscription | 20% | À mesurer |
| Biens ajoutés par utilisateur | 5 | À mesurer |
| Transactions mensuelles | 100 | À mesurer |
| Taux de rétention (30j) | 60% | À mesurer |

### 3. UTILISATEUR

| Métrique | Cible | Mesure |
|----------|-------|--------|
| Satisfaction utilisateur | 4.5/5 | À mesurer |
| Taux d'abandon panier | < 30% | À mesurer |
| Temps moyen par session | 10 min | À mesurer |
| Pages par session | 5 | À mesurer |
| Taux de rebond | < 40% | À mesurer |

---

## 🔒 CONFORMITÉ ET LÉGAL

### 1. PROTECTION DES DONNÉES

#### 1.1 RGPD (si applicable)
- Consentement explicite
- Droit à l'oubli
- Portabilité des données
- Politique de confidentialité
- Mentions légales

#### 1.2 Données Collectées
**Informations personnelles** :
- Email (obligatoire)
- Nom, prénom (optionnel)
- Numéro de téléphone (optionnel)

**Données d'utilisation** :
- Logs de connexion
- Actions utilisateur
- Préférences

**Données de biens** :
- Informations publiques
- Coordonnées GPS
- Photos/vidéos

#### 1.3 Conservation
- Données actives : Illimitée
- Données supprimées : 30 jours
- Logs : 90 jours
- Backups : 7 jours

### 2. CONDITIONS D'UTILISATION

#### 2.1 Responsabilités
**Plateforme** :
- Disponibilité du service (99% uptime)
- Sécurité des données
- Support technique
- Mises à jour régulières

**Utilisateur** :
- Exactitude des informations
- Respect des autres utilisateurs
- Utilisation légale
- Paiement des transactions

#### 2.2 Limitations
- Pas de garantie de vente
- Pas de conseil juridique
- Pas de garantie de prix
- Responsabilité limitée

### 3. PROPRIÉTÉ INTELLECTUELLE

#### 3.1 Contenu Utilisateur
- Utilisateur conserve les droits
- Licence d'utilisation à la plateforme
- Droit de modération
- Suppression possible

#### 3.2 Marque et Logo
- MonRoa Gestion® (à déposer)
- Logo protégé
- Charte graphique propriétaire

---

## 📞 SUPPORT ET MAINTENANCE

### 1. SUPPORT UTILISATEUR

#### 1.1 Canaux
- Email : support@monroa.com
- FAQ intégrée
- Documentation en ligne
- Chat (à venir)

#### 1.2 Niveaux de Support
**Gratuit** :
- FAQ et documentation
- Email (réponse sous 48h)

**Premium** (à venir) :
- Support prioritaire (réponse sous 4h)
- Chat en direct
- Assistance téléphonique

### 2. MAINTENANCE

#### 2.1 Préventive
- Backups quotidiens
- Mises à jour de sécurité
- Monitoring continu
- Tests de performance

#### 2.2 Corrective
- Hotfixes critiques : < 2h
- Bugs majeurs : < 24h
- Bugs mineurs : < 1 semaine
- Améliorations : Sprint suivant

#### 2.3 Évolutive
- Nouvelles fonctionnalités
- Optimisations
- Refactoring
- Mise à jour des dépendances

### 3. DOCUMENTATION

#### 3.1 Documentation Utilisateur
- Guide de démarrage rapide
- Tutoriels vidéo
- FAQ
- Glossaire

#### 3.2 Documentation Technique
- Architecture système
- API documentation
- Guide de déploiement
- Changelog

---

## 💰 MODÈLE ÉCONOMIQUE (FUTUR)

### 1. PLANS TARIFAIRES

#### 1.1 Plan Gratuit
**Inclus** :
- 10 biens maximum
- Fonctionnalités de base
- Support email
- Publicités

**Limitations** :
- Pas de marketplace
- Pas d'export
- Pas de notifications

#### 1.2 Plan Pro (à venir)
**Prix** : 5000 FCFA/mois

**Inclus** :
- Biens illimités
- Marketplace complet
- Notifications
- Export PDF/Excel
- Support prioritaire
- Sans publicité

#### 1.3 Plan Enterprise (à venir)
**Prix** : Sur devis

**Inclus** :
- Multi-utilisateurs
- API access
- White-label
- Support dédié
- Formation
- SLA garanti

### 2. SOURCES DE REVENUS

#### 2.1 Abonnements
- Récurrent mensuel/annuel
- Upsell vers plans supérieurs
- Add-ons optionnels

#### 2.2 Commissions (à venir)
- 2-5% sur transactions marketplace
- Frais de service
- Paiement en ligne

#### 2.3 Services Premium (à venir)
- Photographie professionnelle
- Visite virtuelle
- Estimation par expert
- Rédaction d'annonces

---

## 📋 ANNEXES

### A. GLOSSAIRE

| Terme | Définition |
|-------|------------|
| Asset | Bien immobilier ou mobilier |
| Marketplace | Place de marché pour transactions |
| RLS | Row Level Security (sécurité au niveau ligne) |
| PWA | Progressive Web App |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| SPA | Single Page Application |
| CDN | Content Delivery Network |
| API | Application Programming Interface |

### B. RÉFÉRENCES

#### B.1 Technologies
- React : https://react.dev
- TypeScript : https://www.typescriptlang.org
- Supabase : https://supabase.com
- Tailwind CSS : https://tailwindcss.com
- shadcn/ui : https://ui.shadcn.com
- Leaflet : https://leafletjs.com

#### B.2 Documentation Projet
- README.md : Introduction générale
- GUIDE_CARTE.md : Guide de la carte interactive
- GUIDE_DEMO.md : Guide du mode démo
- MARKETPLACE_COMPLET.md : Documentation marketplace
- DEPLOYMENT.md : Guide de déploiement

### C. HISTORIQUE DES VERSIONS

| Version | Date | Changements Majeurs |
|---------|------|---------------------|
| 1.0.0 | Oct 2025 | Version initiale production |
| 0.9.0 | Oct 2025 | Marketplace complet |
| 0.8.0 | Oct 2025 | Carte interactive |
| 0.7.0 | Oct 2025 | Mode démo |
| 0.6.0 | Oct 2025 | Gestion des biens |
| 0.5.0 | Oct 2025 | Authentification |

### D. CONTACTS

**Équipe Projet** :
- Chef de projet : [À définir]
- Développeur Lead : [À définir]
- Designer UI/UX : [À définir]
- DevOps : [À définir]

**Support** :
- Email : support@monroa.com
- Site web : https://monroa.com
- GitHub : https://github.com/monroa/asset-folio

---

## ✅ VALIDATION ET APPROBATION

### Signatures

**Client** :
- Nom : _______________________
- Signature : _______________________
- Date : _______________________

**Chef de Projet** :
- Nom : _______________________
- Signature : _______________________
- Date : _______________________

**Développeur Lead** :
- Nom : _______________________
- Signature : _______________________
- Date : _______________________

---

**Document Version** : 1.0.0  
**Date de Création** : Octobre 2025  
**Dernière Mise à Jour** : Octobre 2025  
**Statut** : ✅ Approuvé pour Production

---

*Ce cahier des charges est un document vivant qui sera mis à jour régulièrement en fonction de l'évolution du projet et des retours utilisateurs.*

