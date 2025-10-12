# 🗺️ Guide d'utilisation - Carte Interactive MonRoa

## 📋 Nouvelles fonctionnalités ajoutées

### 1. Carte Interactive

Une nouvelle section **Carte** a été ajoutée à votre application MonRoa Gestion ! Cette fonctionnalité vous permet de visualiser tous vos biens géolocalisés sur une carte interactive.

#### Caractéristiques :
- 🗺️ Carte interactive basée sur OpenStreetMap
- 📍 Markers personnalisés pour chaque bien
- 🔍 Zoom automatique pour afficher tous vos biens
- 💬 Popups avec informations détaillées (nom, type, localisation, valeur)
- 🎯 Clic sur un marker pour voir plus de détails

### 2. Géolocalisation des biens

Vous pouvez maintenant ajouter des coordonnées GPS (latitude et longitude) à vos biens lors de leur création ou modification.

#### Comment obtenir les coordonnées GPS :

**Méthode 1 : Google Maps (recommandée)**
1. Allez sur [Google Maps](https://www.google.com/maps)
2. Recherchez ou naviguez jusqu'à l'emplacement de votre bien
3. Faites un **clic droit** sur l'emplacement exact
4. Sélectionnez la première option qui affiche les coordonnées (ex: "6.1256, 1.2223")
5. Les coordonnées sont copiées dans votre presse-papier

**Format des coordonnées :**
- **Latitude** : Premier nombre (ex: 6.1256)
- **Longitude** : Second nombre (ex: 1.2223)

**Méthode 2 : Google Maps (alternative)**
1. Cliquez sur l'emplacement
2. Les coordonnées apparaissent en bas de l'écran
3. Cliquez dessus pour les copier

#### Ajouter les coordonnées à un bien :

1. Allez dans **"Ajouter un bien"** ou éditez un bien existant
2. Remplissez les champs obligatoires (nom, type, localisation, valeur, statut)
3. Dans la section coordonnées GPS (après la localisation) :
   - **Latitude** : Collez le premier nombre (ex: 6.1256)
   - **Longitude** : Collez le second nombre (ex: 1.2223)
4. Enregistrez votre bien

> 💡 **Note** : Les coordonnées GPS sont optionnelles. Si vous ne les ajoutez pas, le bien n'apparaîtra simplement pas sur la carte.

### 3. Logo personnalisé

Le logo MonRoa (`logo.png`) est maintenant visible :
- 🎨 Dans la barre de navigation en haut à gauche
- 📱 Comme favicon dans l'onglet du navigateur
- 🔗 Dans les aperçus de partage sur les réseaux sociaux

## 🚀 Utilisation de la carte

### Accéder à la carte

1. Connectez-vous à votre compte MonRoa
2. Cliquez sur **"Carte"** dans le menu de navigation
3. La carte s'affiche avec tous vos biens géolocalisés

### Interagir avec la carte

- **Zoomer/Dézoomer** : Utilisez les boutons +/- ou la molette de la souris
- **Déplacer** : Cliquez et glissez sur la carte
- **Voir les détails** : Cliquez sur un marker (épingle)
- **Fermer un popup** : Cliquez sur le X ou ailleurs sur la carte

### Informations affichées dans les popups

Chaque marker affiche :
- 📌 Nom du bien
- 🏠 Type de bien (badge coloré)
- 🗺️ Localisation
- 💰 Valeur estimée en F CFA
- 📝 Description (si disponible)
- 🟢 Statut (icône emoji)

## 📊 Navigation améliorée

Le menu de navigation a été mis à jour :

**Desktop (ordinateur) :**
- Tableau de bord
- Mes biens
- **🆕 Carte** ← Nouvelle option !
- Ajouter
- À propos
- Déconnexion

**Mobile (téléphone) :**
- Même structure avec icônes en bas de l'écran

## 🔧 Migration de la base de données

### Pour l'administrateur technique

Si vous gérez vous-même la base de données Supabase, vous devez appliquer la migration pour ajouter les colonnes de coordonnées GPS.

**Fichier de migration :** `supabase/migrations/20251012000000_add_coordinates_to_assets.sql`

**Instructions détaillées :** Voir le fichier `DEPLOYMENT.md`

La migration ajoute :
- Colonne `latitude` (double precision, nullable)
- Colonne `longitude` (double precision, nullable)
- Index pour améliorer les performances des requêtes géospatiales

## 💡 Conseils et astuces

### Optimiser l'utilisation de la carte

1. **Géolocalisez tous vos biens** : Plus vous avez de biens avec coordonnées GPS, plus la carte est utile

2. **Précision des coordonnées** : 
   - 4 décimales = précision de ~11 mètres
   - 6 décimales = précision de ~11 centimètres
   - Pour les biens immobiliers, 4-5 décimales suffisent

3. **Vérifiez visuellement** : Après avoir ajouté les coordonnées, allez sur la carte pour vérifier que le marker est au bon endroit

4. **Modification facile** : Vous pouvez modifier les coordonnées à tout moment en éditant le bien

### Exemples de coordonnées (Lomé, Togo)

- **Centre-ville de Lomé** : 6.1319, 1.2228
- **Tokoin** : 6.1520, 1.2362
- **Bè** : 6.1170, 1.2480
- **Aéroport de Lomé** : 6.1656, 1.2545

## 🐛 Résolution de problèmes

### La carte ne s'affiche pas

1. Vérifiez votre connexion internet
2. Actualisez la page (F5)
3. Videz le cache du navigateur (Ctrl+Shift+Delete)

### Aucun bien n'apparaît sur la carte

- Vérifiez que vous avez ajouté des coordonnées GPS à au moins un bien
- Les coordonnées doivent être au format numérique (ex: 6.1256, pas "6,1256")

### Un bien n'est pas au bon endroit

1. Allez dans "Mes biens"
2. Cliquez sur "Modifier" pour le bien concerné
3. Vérifiez et corrigez les coordonnées GPS
4. Enregistrez les modifications

### Message "Aucune propriété géolocalisée"

C'est normal si vous n'avez pas encore ajouté de coordonnées GPS à vos biens. Suivez le guide ci-dessus pour ajouter des coordonnées.

## 📱 Support et assistance

Pour toute question ou problème :
1. Consultez d'abord ce guide
2. Vérifiez le fichier `README.md` pour les informations techniques
3. Contactez le support technique si le problème persiste

---

**Bonne utilisation de MonRoa Gestion ! 🎉**

