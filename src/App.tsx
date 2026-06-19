import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapView } from './components/MapView';
import type { Media, FilterState } from './types';

export default function App() {
  const [media, setMedia] = useState<Media[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    startDate: null,
    endDate: null,
    region: null,
  });

  const filteredMedia = useMemo(() => {
    return media.filter((m) => {
      if (filter.startDate && m.date && m.date < filter.startDate) return false;
      if (filter.endDate && m.date && m.date > filter.endDate) return false;
      return true;
    });
  }, [media, filter.startDate, filter.endDate]);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      <Sidebar 
        media={filteredMedia} 
        setMedia={setMedia} 
        filter={filter} 
        setFilter={setFilter} 
      />
      <MapView 
        media={filteredMedia} 
        region={filter.region}
      />
    </div>
  );
}
