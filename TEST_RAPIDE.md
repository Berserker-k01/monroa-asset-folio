# 🎯 TEST RAPIDE - Mode Démo

## Testez MonRoa en 30 secondes ! ⚡

### 1️⃣ Ouvrez votre navigateur
```
http://localhost:8083
```

### 2️⃣ Sur la page de connexion, vous verrez :

```
╔════════════════════════════════════════════════════════════╗
║  MonRoa Gestion                                             ║
║  Simplifiez la gestion de vos biens                        ║
╚════════════════════════════════════════════════════════════╝

┌────────────────────────────────────────────────────────────┐
│  Bienvenue                                                  │
│  Connectez-vous ou créez un compte pour commencer         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔══════════════════════════════════════════════════╗     │
│  ║ 🧪 Mode Démo disponible !                       ║     │
│  ║                                                   ║     │
│  ║ 📧 Email: demo@monroa.com                       ║     │
│  ║ 🔑 Mot de passe: demo123                        ║     │
│  ║                                                   ║     │
│  ║ Utilisez ces identifiants pour tester           ║     │
│  ║ l'application avec des données fictives         ║     │
│  ╚══════════════════════════════════════════════════╝     │
│                                                             │
│  Email: [________________]                                 │
│  Mot de passe: [________________]                          │
│                                                             │
│  [ Se connecter ]                                          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 3️⃣ Entrez les identifiants
- **Email** : `demo@monroa.com`
- **Mot de passe** : `demo123`

### 4️⃣ Cliquez sur "Se connecter"

### 5️⃣ Vous verrez la notification :
```
┌─────────────────────────────────┐
│ 🎭 Mode Démo activé            │
│ Bienvenue dans le mode démo    │
│ de MonRoa Gestion!             │
└─────────────────────────────────┘
```

## 🎉 C'est tout ! Vous êtes connecté !

Vous accédez maintenant au **Tableau de bord** avec :

```
╔═══════════════════════════════════════════════════════════╗
║  Tableau de bord                                           ║
║  Vue d'ensemble de votre patrimoine                       ║
╚═══════════════════════════════════════════════════════════╝

┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐
│ 📦 Total biens   │  │ 💰 Valeur totale │  │ ➕ Ajouter   │
│      6           │  │  114.5M F CFA    │  │  un bien     │
└──────────────────┘  └──────────────────┘  └──────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Statuts des biens                                           │
├─────────────────────────────────────────────────────────────┤
│ 🟢 Disponible              3  ████████████░░░░░░░░░ 50%    │
│ 🟡 Loué                    2  ████████░░░░░░░░░░░░ 33%    │
│ 🔵 Habité                  1  ████░░░░░░░░░░░░░░░░ 17%    │
│ 🟠 En maintenance          0  ░░░░░░░░░░░░░░░░░░░░  0%    │
│ 🔴 Non disponible          0  ░░░░░░░░░░░░░░░░░░░░  0%    │
└─────────────────────────────────────────────────────────────┘
```

## 🗺️ Testez la Carte Interactive !

Cliquez sur **"Carte"** dans le menu :

```
╔═══════════════════════════════════════════════════════════╗
║  🗺️ Carte des biens                                       ║
║  Visualisez tous vos biens géolocalisés                  ║
║  6 biens géolocalisés                                     ║
╚═══════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│            CARTE INTERACTIVE                                │
│                                                             │
│         📍 Tokoin (Villa 45M)                              │
│              📍 Adidogomé (Terrain 12M)                    │
│     📍 Centre (Toyota 8.5M)                                │
│           📍 Bè (Boutique 18M)                             │
│       📍 Hédzranawoé (Appart 25M)                          │
│                                                             │
│                   📍 Kpalimé (Terrain 6M)                  │
│                                                             │
│  [Cliquez sur un marker pour voir les détails]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Fonctionnalités à Tester

### 1. Tableau de bord ✅
- Statistiques en temps réel
- Graphiques de répartition
- Total de la valeur

### 2. Mes biens ✅
- Liste des 6 biens
- Filtres par type et statut
- Recherche textuelle
- Boutons modifier/supprimer

### 3. Carte 🗺️ ✅
- 6 markers sur la carte
- Popups avec infos
- Lien vers Google Maps
- Zoom automatique

### 4. Ajouter un bien ✅
- Formulaire complet
- Validation en temps réel
- Champs GPS avec vérification
- Exemples fournis

### 5. Modifier/Supprimer ✅
- Édition de biens existants
- Suppression avec confirmation
- Changements sauvegardés

## 🔄 Tester les Opérations CRUD

### CREATE (Créer)
1. Cliquez sur "Ajouter"
2. Remplissez le formulaire
3. Ajoutez des coordonnées GPS (optionnel)
4. Enregistrez
5. ✅ Le bien apparaît dans la liste et sur la carte !

### READ (Lire)
1. Allez sur "Mes biens"
2. Voyez tous les biens
3. Filtrez par type ou statut
4. ✅ Recherchez par nom ou localisation

### UPDATE (Modifier)
1. Cliquez sur "Modifier" sur un bien
2. Changez les informations
3. Enregistrez
4. ✅ Les changements sont visibles immédiatement

### DELETE (Supprimer)
1. Cliquez sur "Supprimer" sur un bien
2. Confirmez la suppression
3. ✅ Le bien disparaît de la liste et de la carte

## 💡 Astuces de Test

### Tester la Carte
1. Allez sur "Carte"
2. Tous les 6 biens apparaissent (ils ont tous des GPS)
3. Cliquez sur un marker
4. Popup avec détails
5. Cliquez "Voir dans Google Maps"
6. ✅ Google Maps s'ouvre au bon endroit !

### Tester les Filtres
1. Allez sur "Mes biens"
2. Sélectionnez "Type: Maison"
3. ✅ Voir 2 biens (Villa + Appartement)
4. Sélectionnez "Statut: Loué"
5. ✅ Voir 2 biens (Boutique + Appartement)

### Tester la Recherche
1. Allez sur "Mes biens"
2. Tapez "Tokoin"
3. ✅ Voir 1 bien (Villa)
4. Tapez "terrain"
5. ✅ Voir 2 biens (Terrains)

### Tester les Coordonnées GPS
1. Allez sur "Ajouter"
2. Entrez latitude: `6.1319`
3. Entrez longitude: `1.2228`
4. ✅ Indicateur vert apparaît
5. Cliquez "Vérifier sur Maps"
6. ✅ Lien vers Google Maps fonctionne

## 📊 Données de Test Fournies

### Biens avec Coordonnées GPS ✅

| Bien | Latitude | Longitude | Sur la Carte |
|------|----------|-----------|--------------|
| Villa Tokoin | 6.1520 | 1.2362 | ✅ |
| Terrain Adidogomé | 6.1643 | 1.2192 | ✅ |
| Toyota Centre | 6.1319 | 1.2228 | ✅ |
| Boutique Bè | 6.1170 | 1.2480 | ✅ |
| Terrain Kpalimé | 6.9000 | 0.6333 | ✅ |
| Appart Hédzranawoé | 6.1275 | 1.2140 | ✅ |

**Tous les biens sont visibles sur la carte ! 🗺️**

## 🎯 Checklist de Test

Cochez au fur et à mesure :

- [ ] Connexion avec `demo@monroa.com` / `demo123`
- [ ] Notification "Mode Démo activé" affichée
- [ ] Tableau de bord : voir 6 biens et 114.5M F CFA
- [ ] Mes biens : voir la liste complète
- [ ] Carte : voir 6 markers
- [ ] Cliquer sur un marker → popup fonctionne
- [ ] Ajouter un nouveau bien
- [ ] Modifier un bien existant
- [ ] Supprimer un bien
- [ ] Filtrer par type "Maison"
- [ ] Rechercher "Tokoin"
- [ ] Tester validation GPS
- [ ] Déconnexion fonctionne

## 🔄 Réinitialiser pour Re-tester

Si vous voulez recommencer :

1. **Option 1** : Déconnexion/Reconnexion
   - Cliquez sur "Déconnexion"
   - Reconnectez-vous avec les mêmes identifiants
   - ✅ Données originales restaurées

2. **Option 2** : Console navigateur
   ```javascript
   localStorage.clear()
   location.reload()
   ```

3. **Option 3** : Effacer le cache
   - F12 → Application → Local Storage
   - Supprimer tout
   - Rafraîchir

## 🎉 Résultat Attendu

Après tous les tests, vous devriez avoir :

✅ **Connexion** : Facile et rapide
✅ **Navigation** : Fluide et intuitive
✅ **Tableau de bord** : Statistiques claires
✅ **Liste des biens** : Filtres fonctionnels
✅ **Carte interactive** : Tous les biens affichés
✅ **CRUD** : Toutes les opérations fonctionnent
✅ **Validation** : Coordonnées GPS vérifiées
✅ **UX** : Expérience utilisateur agréable

## 🚀 Prêt à Tester ?

**Identifiants** : `demo@monroa.com` / `demo123`

**URL** : http://localhost:8083

**Go ! 🎭**

---

**Bon test ! N'hésitez pas à explorer toutes les fonctionnalités ! 🎉**

