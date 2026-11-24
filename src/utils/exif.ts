import ExifReader from 'exifreader';
import type { Media } from '../types';

export function parseCaptureDate(value: string): Date | null {
  const parts = /^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/.exec(value.trim());
  if (!parts) return null;
  const [year, month, day, hour, minute, second] = parts.slice(1).map(Number);
  const date = new Date(year, month - 1, day, hour, minute, second);
  return date.getFullYear() === year && date.getMonth() + 1 === month &&
    date.getDate() === day && date.getHours() === hour &&
    date.getMinutes() === minute && date.getSeconds() === second ? date : null;
}

export function readCoordinates(gps?: { Latitude?: number; Longitude?: number }) {
  const lat = gps?.Latitude;
  const lng = gps?.Longitude;
  if (typeof lat !== 'number' || !Number.isFinite(lat) || Math.abs(lat) > 90 ||
      typeof lng !== 'number' || !Number.isFinite(lng) || Math.abs(lng) > 180) {
    return { lat: null, lng: null };
  }
  return { lat, lng };
}

export const extractMetadata = async (file: File): Promise<Media | null> => {
  try {
    const isVideo = /\.(mp4|mov|avi|mkv)$/i.test(file.name);
    
    // Pour les images, on ne lit que les méta-données pour aller ultra-vite (pas besoin de parcourir tout le fichier)
    // On passe le fichier, ExifReader est optimisé pour ne lire que l'en-tête EXIF.
    const tags = await ExifReader.load(file, { expanded: true });

    const coordinates = readCoordinates(tags.gps);
    const originalDate = tags.exif?.DateTimeOriginal?.description;
    const date = typeof originalDate === 'string' ? parseCaptureDate(originalDate) : null;
    const thumbnailUrl = URL.createObjectURL(file);

    return {
      id: `${file.name}-${file.lastModified}-${file.size}`,
      file,
      type: isVideo ? 'video' : 'image',
      ...coordinates,
      date: date ?? (file.lastModified ? new Date(file.lastModified) : null),
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
      date: file.lastModified ? new Date(file.lastModified) : null,
      thumbnailUrl: URL.createObjectURL(file),
    };
  }
};
