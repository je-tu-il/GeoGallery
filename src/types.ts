export interface Media {
  id: string;
  file: File;
  type: 'image' | 'video';
  lat: number | null;
  lng: number | null;
  date: Date | null;
  thumbnailUrl: string; // Blob URL
}

export interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  region: { lat: number; lng: number } | null;
}
