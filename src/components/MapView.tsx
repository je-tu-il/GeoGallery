import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Media } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Fix Leaflet default icon path issues
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapViewProps {
  media: Media[];
  region: { lat: number; lng: number } | null;
}

// Component to handle dynamic map centering
function ChangeView({ center }: { center: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 12, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export function MapView({ media, region }: MapViewProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const defaultCenter: [number, number] = [46.603354, 1.888334]; // Center of France

  return (
    <div className="flex-1 h-screen relative bg-muted/20">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        zoomControl={false}
      >
        <ChangeView center={region} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {media.filter(m => m.lat !== null && m.lng !== null).map((m) => (
          <Marker key={m.id} position={[m.lat!, m.lng!]}>
            <Popup className="custom-popup" minWidth={250}>
              <div className="flex flex-col gap-2 p-1">
                {m.type === 'image' ? (
                  <img 
                    src={m.thumbnailUrl} 
                    alt="Media preview" 
                    className="w-full h-auto object-cover rounded shadow-sm max-h-48"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full rounded shadow-sm overflow-hidden bg-black flex items-center justify-center">
                    {playingVideoId === m.id ? (
                      <video 
                        src={m.thumbnailUrl} 
                        controls 
                        autoPlay 
                        className="w-full max-h-48"
                      />
                    ) : (
                      <div 
                        className="w-full h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-black/80 transition-colors"
                        onClick={() => setPlayingVideoId(m.id)}
                      >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                        </div>
                        <span className="text-white text-xs mt-2 font-medium">Lire la vidéo</span>
                      </div>
                    )}
                  </div>
                )}
                {m.date && (
                  <p className="text-xs text-muted-foreground font-medium mt-1 text-center">
                    {format(m.date, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
