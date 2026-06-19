import { useState, useRef } from 'react';
import type { Media, FilterState } from '../types';
import { extractMetadata } from '../utils/exif';
import { searchLocation } from '../utils/geocoding';
import { CustomDatePicker } from './CustomDatePicker';
import { FolderOpen, MapPin, Search, Loader2 } from 'lucide-react';

interface SidebarProps {
  media: Media[];
  setMedia: React.Dispatch<React.SetStateAction<Media[]>>;
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function Sidebar({ media, setMedia, filter, setFilter }: SidebarProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDirectorySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsProcessing(true);

    const validFiles = Array.from(files).filter(file => 
      /\.(jpe?g|png|heic|mp4|mov)$/i.test(file.name) || 
      file.type.startsWith('image/') || 
      file.type.startsWith('video/')
    );

    const CHUNK_SIZE = 25; // Traiter par lots pour ne pas bloquer l'UI et afficher au fur et à mesure
    
    for (let i = 0; i < validFiles.length; i += CHUNK_SIZE) {
      const chunk = validFiles.slice(i, i + CHUNK_SIZE);
      
      const chunkPromises = chunk.map(async (file) => {
        const metadata = await extractMetadata(file);
        return metadata;
      });

      const results = await Promise.all(chunkPromises);
      const validMedia = results.filter((m): m is Media => m !== null);
      
      if (validMedia.length > 0) {
        setMedia((prev) => [...prev, ...validMedia]);
      }

      // Laisser le navigateur respirer et mettre à jour le DOM
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    setIsProcessing(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setFilter({ ...filter, region: null });
      return;
    }
    const loc = await searchLocation(searchQuery);
    if (loc) {
      setFilter({ ...filter, region: loc });
    }
  };

  return (
    <div className="w-80 h-screen bg-card border-r border-border flex flex-col shadow-xl z-10">
      <div className="p-4 border-b border-border bg-muted/20">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MapPin className="text-primary" /> GeoGallery
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Vos souvenirs géolocalisés</p>
      </div>

      <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1">
        {/* Import Section */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Importer des médias</h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
          >
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderOpen className="w-4 h-4" />}
            {isProcessing ? 'Traitement...' : 'Sélectionner un dossier'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleDirectorySelect}
            className="hidden"
            // @ts-ignore - webkitdirectory is standard in most modern browsers for folder selection
            webkitdirectory="true"
            directory="true"
            multiple
          />
          <p className="text-xs text-muted-foreground text-center mt-2">
            {media.length} média(s) chargé(s)
            <br/>
            ({media.filter(m => m.lat !== null).length} avec position GPS)
          </p>
        </section>

        {/* Filters Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Filtres</h2>
          
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Période</label>
            <CustomDatePicker
              startDate={filter.startDate}
              endDate={filter.endDate}
              onChange={(start, end) => setFilter({ ...filter, startDate: start, endDate: end })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Lieu / Ville</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: Paris, France"
                className="flex-1 text-sm bg-background border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-secondary text-secondary-foreground p-1.5 rounded-md hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="mt-4 flex-1">
          <h2 className="text-sm font-semibold text-foreground mb-3">Aperçu</h2>
          <div className="grid grid-cols-2 gap-2">
            {media.slice(0, 10).map((m) => (
              <div key={m.id} className="relative aspect-square rounded-md overflow-hidden bg-muted group border border-border">
                {m.type === 'image' ? (
                  <img src={m.thumbnailUrl} alt="Thumbnail" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted-foreground/20">
                    <span className="text-xs font-semibold text-muted-foreground">Vidéo</span>
                  </div>
                )}
              </div>
            ))}
            {media.length > 10 && (
              <div className="aspect-square rounded-md flex items-center justify-center bg-muted text-xs text-muted-foreground font-medium border border-border">
                +{media.length - 10}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
