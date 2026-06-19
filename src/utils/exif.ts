import ExifReader from 'exifreader';
import type { Media } from '../types';

export const extractMetadata = async (file: File): Promise<Media | null> => {
  try {
    const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(file.name);
    
    // Pour les images, on ne lit que les méta-données pour aller ultra-vite (pas besoin de parcourir tout le fichier)
    // On passe le fichier, ExifReader est optimisé pour ne lire que l'en-tête EXIF.
    const tags = await ExifReader.load(file, { expanded: true });

    let lat, lng, date;

    if (tags.gps) {
      lat = tags.gps.Latitude;
      lng = tags.gps.Longitude;
    }

    if (tags.exif && tags.exif.DateTimeOriginal) {
      // Format usually: "YYYY:MM:DD HH:MM:SS"
      const dateStr = tags.exif.DateTimeOriginal.description;
      const parts = dateStr.split(/[: ]/);
      if (parts.length >= 6) {
        date = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2]),
          parseInt(parts[3]),
          parseInt(parts[4]),
          parseInt(parts[5])
        );
      }
    }

    // Fallback for video date
    if (!date && file.lastModified) {
      date = new Date(file.lastModified);
    }

    const thumbnailUrl = URL.createObjectURL(file);

    return {
      id: `${file.name}-${file.lastModified}-${file.size}`,
      file,
      type: isVideo ? 'video' : 'image',
      lat: lat !== undefined ? lat : null,
      lng: lng !== undefined ? lng : null,
      date: date || null,
      thumbnailUrl,
    };
  } catch (err) {
    console.error('Erreur EXIF pour', file.name, err);
    // On retourne quand même le média sans métadonnées au lieu d'échouer
    return {
      id: `${file.name}-${file.lastModified}-${file.size}`,
      file,
      type: file.name.match(/\.(mp4|mov|avi|mkv)$/i) ? 'video' : 'image',
      lat: null,
      lng: null,
      date: new Date(file.lastModified),
      thumbnailUrl: URL.createObjectURL(file),
    };
  }
};
