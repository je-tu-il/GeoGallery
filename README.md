# GeoGallery - Map Photos

Une application web locale permettant de visualiser des photos et vidéos géolocalisées sur une carte interactive. Conçue pour être rapide et respecter la vie privée : l'extraction des données GPS (EXIF) se fait intégralement côté client dans le navigateur.

## 🌟 Fonctionnalités Principales

- **Cartographie Interactive** : Base OpenStreetMap via Leaflet avec gestion fluide des marqueurs.
- **Extraction EXIF Locale** : Utilisation de `exifreader` pour lire les métadonnées directement depuis vos fichiers locaux sans aucun upload serveur.
- **Performances Optimisées** : Importation asynchrone par lots (chunking) garantissant une interface réactive même lors du chargement de milliers de photos.
- **Support Multimédia** : Prise en charge des images (`.jpg`, `.png`, `.heic`) et des vidéos (`.mp4`, `.mov`) avec lecteur intégré dans les popups de la carte.
- **Filtres Avancés** :
  - Filtrage par période (Date de prise de vue).
  - Barre de recherche géographique (Géocodage via l'API publique Nominatim).
- **UI Moderne** : Interface adaptative propulsée par Tailwind CSS v4.

## 🛠️ Prérequis

- Node.js (version 18 ou supérieure recommandée)

## 🚀 Installation et Lancement

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrez votre navigateur sur `http://localhost:5173`

## 📖 Utilisation

1. Cliquez sur le bouton **"Sélectionner un dossier"** dans la barre latérale.
2. Choisissez un répertoire local contenant vos souvenirs. Note : le navigateur demandera l'autorisation d'accéder aux fichiers.
3. Le traitement est instantané et progressif. Les médias possédant des coordonnées GPS apparaîtront sur la carte.
4. Cliquez sur un marqueur pour visualiser le média.
5. Utilisez les filtres à gauche pour recentrer la carte sur une ville spécifique ou filtrer par période de vacances.

## 💻 Stack Technique

- **Framework** : React 18 + Vite (TypeScript)
- **Style** : Tailwind CSS v4
- **Carte** : Leaflet & React-Leaflet
- **Méta-données** : ExifReader
- **Icônes** : Lucide React
"# GeoGallery" 
