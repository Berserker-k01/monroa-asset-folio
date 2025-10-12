# 🎭 Guide du Mode Démo - MonRoa Gestion

## Qu'est-ce que le mode démo ?

Le **mode démo** vous permet de tester l'application **MonRoa Gestion** sans avoir besoin d'une base de données Supabase connectée. C'est parfait pour :

- ✅ Tester l'application avant de la configurer
- ✅ Faire une démonstration à des clients
- ✅ Développer sans connexion internet
- ✅ Découvrir les fonctionnalités
- ✅ Former des utilisateurs

## 🔑 Identifiants de test

Pour accéder au mode démo, utilisez ces identifiants sur la page de connexion :

```
📧 Email: demo@monroa.com
🔑 Mot de passe: demo123
```

Ces identifiants sont **affichés directement sur la page de connexion** dans un encadré vert pour faciliter l'accès.

## 🎯 Comment utiliser le mode démo

### 1. Se connecter en mode démo

1. Ouvrez l'application MonRoa Gestion
2. Sur la page de connexion, vous verrez un encadré vert avec les identifiants de test
3. Entrez :
   - **Email** : `demo@monroa.com`
   - **Mot de passe** : `demo123`
4. Cliquez sur **"Se connecter"**
5. Vous verrez une notification : **"Mode Démo activé 🎭"**

### 2. Données de démonstration incluses

Le mode démo inclut **6 biens fictifs pré-chargés** :

| Bien | Type | Localisation | Valeur | Statut | GPS |
|------|------|--------------|---------|--------|-----|
| Villa à Tokoin | Maison | Tokoin, Lomé | 45M F CFA | Habité | ✅ |
| Terrain Adidogomé | Terrain | Adidogomé, Lomé | 12M F CFA | Disponible | ✅ |
| Toyota Corolla 2020 | Voiture | Lomé Centre | 8.5M F CFA | Disponible | ✅ |
| Boutique Bè Kpota | Boutique | Bè Kpota, Lomé | 18M F CFA | Loué | ✅ |
| Terrain Agricole | Terrain Agricole | Kpalimé | 6M F CFA | Disponible | ✅ |
| Appartement Hédzranawoé | Maison | Hédzranawoé, Lomé | 25M F CFA | Loué | ✅ |

**Total : 114,5 millions F CFA** 💰

### 3. Fonctionnalités disponibles en mode démo

Toutes les fonctionnalités sont disponibles :

#### ✅ Tableau de bord
- Voir les statistiques
- Total des biens
- Valeur totale
- Répartition par statut

#### ✅ Mes biens
- Lister tous les biens
- Filtrer par type et statut
- Rechercher des biens
- Voir les détails

#### ✅ Carte interactive 🗺️
- Visualiser tous les biens sur la carte
- Cliquer sur les markers
- Voir les popups d'information
- **Les 6 biens démo ont tous des coordonnées GPS !**

#### ✅ Ajouter/Modifier des biens
- Ajouter de nouveaux biens
- Modifier les biens existants
- Supprimer des biens
- Ajouter des coordonnées GPS
- Validation en temps réel

## 🔄 Persistance des données

### Stockage local
Les données en mode démo sont stockées dans le **localStorage** de votre navigateur :

- ✅ Les biens ajoutés restent après un rafraîchissement
- ✅ Les modifications sont sauvegardées
- ✅ Les suppressions sont définitives (en mode démo uniquement)

### Réinitialiser le mode démo

Pour revenir aux données par défaut :

1. **Option 1 : Déconnexion/Reconnexion**
   - Déconnectez-vous
   - Reconnectez-vous avec les identifiants démo
   - Les données originales seront rechargées

2. **Option 2 : Console développeur**
   ```javascript
   localStorage.clear()
   location.reload()
   ```

3. **Option 3 : Vider le cache du navigateur**
   - Paramètres → Confidentialité → Effacer les données
   - Cochez "Cookies et données de site"
   - Actualisez la page

## 🆚 Différences avec le mode production

| Fonctionnalité | Mode Démo | Mode Production |
|----------------|-----------|-----------------|
| Authentification | Identifiants fixes | Supabase Auth |
| Stockage données | localStorage | Base Supabase |
| Synchronisation | Aucune | Multi-appareils |
| Upload images | Non disponible | Disponible |
| Partage de biens | Non | Oui |
| Données persistantes | Navigateur uniquement | Serveur cloud |

## 🎓 Cas d'usage

### Pour les développeurs
```typescript
// Vérifier si en mode démo
import { isDemoMode } from '@/lib/demoMode';

if (isDemoMode()) {
  // Logique spécifique au mode démo
}
```

### Pour les formateurs
1. Utilisez le mode démo pour former les utilisateurs
2. Laissez-les ajouter/modifier/supprimer des biens
3. Réinitialisez pour la prochaine session

### Pour les présentations
1. Préparez des données de démo personnalisées
2. Présentez les fonctionnalités
3. Pas besoin de connexion internet

## 🔐 Sécurité

### Ce que vous devez savoir

✅ **Le mode démo est sûr** :
- Les données sont stockées localement uniquement
- Aucune communication avec le serveur
- Impossible d'accéder aux vraies données

⚠️ **Limitations** :
- Ne pas utiliser pour des données réelles
- Les données peuvent être perdues (cache navigateur)
- Un seul utilisateur par navigateur

## 🚀 Passer en mode production

### Quand vous êtes prêt

1. **Configurez Supabase** :
   - Créez un projet Supabase
   - Appliquez les migrations (voir `DEPLOYMENT.md`)
   - Configurez les variables d'environnement

2. **Créez un vrai compte** :
   - Cliquez sur "Inscription" au lieu de "Connexion"
   - Utilisez votre vraie adresse email
   - Créez un mot de passe sécurisé

3. **Migrez vos données** :
   - Recréez manuellement les biens de test
   - Ou importez-les via l'API (si disponible)

## 🐛 Résolution de problèmes

### Les biens de démo n'apparaissent pas

**Solution** :
1. Déconnectez-vous
2. Videz le cache : `localStorage.clear()`
3. Reconnectez-vous avec les identifiants démo

### La carte n'affiche pas les biens

**Vérification** :
- Assurez-vous d'être en mode démo
- Les 6 biens par défaut ont tous des coordonnées GPS
- Si vous avez ajouté des biens, vérifiez qu'ils ont des coordonnées

### Impossible de se déconnecter

**Solution** :
- Cliquez sur "Déconnexion" dans le menu
- Le mode démo sera désactivé automatiquement
- Vous serez redirigé vers la page de connexion

### Les modifications ne sont pas sauvegardées

**Causes possibles** :
- Navigation privée/incognito (localStorage désactivé)
- Extensions de navigateur bloquant le stockage
- Quota localStorage dépassé (rare)

**Solution** :
- Utilisez un navigateur normal (non privé)
- Désactivez temporairement les extensions
- Videz le localStorage

## 💡 Conseils et astuces

### Personnaliser les données de démo

Vous pouvez modifier les données par défaut dans le fichier :
```
src/lib/demoMode.ts
```

Modifiez la constante `DEMO_ASSETS` pour personnaliser les biens.

### Ajouter vos propres biens de test

En mode démo, tous les biens ajoutés seront conservés dans le localStorage jusqu'à ce que vous vous déconnectiez ou vidiez le cache.

### Tester la carte interactive

Les 6 biens de démo ont des coordonnées GPS réelles à Lomé :
- Villa à Tokoin : 6.1520, 1.2362
- Terrain Adidogomé : 6.1643, 1.2192
- Toyota au Centre : 6.1319, 1.2228
- Boutique Bè : 6.1170, 1.2480
- Terrain Kpalimé : 6.9000, 0.6333
- Appart Hédzranawoé : 6.1275, 1.2140

Parfait pour tester la carte ! 🗺️

## 📞 Questions fréquentes

### Q : Puis-je partager mes données de démo ?
**R :** Non, les données sont stockées localement. Chaque navigateur a ses propres données.

### Q : Le mode démo fonctionne-t-il hors ligne ?
**R :** Oui, après le premier chargement de l'application.

### Q : Combien de biens puis-je ajouter en mode démo ?
**R :** Limité par le quota localStorage du navigateur (~5-10 MB, soit des centaines de biens).

### Q : Les identifiants de démo peuvent-ils être changés ?
**R :** Oui, modifiez `DEMO_CREDENTIALS` dans `src/lib/demoMode.ts`.

### Q : Le mode démo affecte-t-il les données de production ?
**R :** Non, c'est complètement isolé.

## 🎉 Conclusion

Le mode démo est un excellent moyen de découvrir MonRoa Gestion sans configuration ! Profitez-en pour :

- ✅ Tester toutes les fonctionnalités
- ✅ Essayer la carte interactive
- ✅ Former vos équipes
- ✅ Préparer des présentations

**Identifiants à retenir** :
```
demo@monroa.com / demo123
```

---

**Amusez-vous bien avec MonRoa Gestion ! 🏠🚗🗺️**

