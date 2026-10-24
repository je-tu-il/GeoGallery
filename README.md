# 🗺️ GeoGallery — Map Photos & Videos

[![Live Demo](https://img.shields.io/badge/Demo%20en%20Ligne-Tester%20sur%20GitHub%20Pages-success?style=for-the-badge&logo=github)](https://je-tu-il.github.io/GeoGallery/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Map-Leaflet%20%2F%20OpenStreetMap-199900.svg?logo=leaflet)](https://leafletjs.com/)
[![Privacy 100%](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Visualisez instantanément vos photos et vidéos de vacances sur une **carte interactive mondiale**, sans envoyer le moindre fichier sur internet.  
> L'extraction des coordonnées GPS (données EXIF) s'exécute intégralement dans votre navigateur en local.

---

## ⚡ Utilisation Immédiate (Sans Installation)

👉 **[Ouvrir GeoGallery en ligne : https://je-tu-il.github.io/GeoGallery/](https://je-tu-il.github.io/GeoGallery/)**

1. Ouvrez le lien dans Chrome, Edge, Firefox ou Safari.
2. Cliquez sur **"Sélectionner un dossier"** (ou glissez-déposez vos photos).
3. Vos photos et vidéos géolocalisées apparaissent immédiatement sous forme de marqueurs sur la carte !

---

## 🔒 Confidentialité Totale (Zéro Upload)

- 🛡️ **Vos médias ne quittent jamais votre appareil.**
- 💻 Le décodage des métadonnées EXIF est effectué par l'API `File System Access` et le module `exifreader` directement dans le moteur JavaScript de votre navigateur.
- ⚡ **Aucun serveur backend, aucune base de données distante, aucun compte requis.**

---

## ✨ Fonctionnalités Clés

- 🗺️ **Cartographie OpenStreetMap & Leaflet** : Navigation fluide, zoom, clusters et regroupement dynamique des médias par zone.
- 📸 **Support Multimédia Complet** :
  - Images : `.jpg`, `.jpeg`, `.png`, `.heic` (formats modernes smartphone).
  - Vidéos : `.mp4`, `.mov` avec lecteur vidéo directement intégré dans les bulles de la carte.
- ⚡ **Performances Ultra-Rapides (Batching)** : Traite des milliers de photos en quelques secondes grâce à un algorithme d'analyse asynchrone par lots sans geler l'interface.
- 🔍 **Recherche et Filtres Temporels** :
  - Filtrez par date (ex: retrouvez uniquement vos vacances d'été 2024).
  - Barre de recherche de ville avec géocodage instantané (Nominatim).
- 🎨 **Interface Sombre Moderne** : Conçue avec Tailwind CSS et des icônes Lucide.

---

## 🛠️ Lancement pour Développeurs (Code Source)

```bash
git clone https://github.com/je-tu-il/GeoGallery.git
cd GeoGallery
npm install
npm run dev
```

Ouvrez `http://localhost:5173`.

### Compilation Production
```bash
npm run build
```

---

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation et d'adaptation.
