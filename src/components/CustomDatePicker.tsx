import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { format } from 'date-fns';

interface CustomDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

export function CustomDatePicker({ startDate, endDate, onChange }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Simplified custom UI for date picking
  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between border border-border rounded-md p-2 bg-background cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {startDate && endDate
            ? `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`
            : 'Sélectionner une période'}
        </div>
        {(startDate || endDate) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null, null);
            }}
            className="p-1 hover:bg-muted rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg p-3 space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium">Date de début</label>
            <input
              type="date"
              className="w-full text-sm bg-background border border-border rounded p-1.5 focus:ring-1 focus:ring-ring outline-none"
              onChange={(e) => {
                const val = e.target.value ? new Date(e.target.value) : null;
                onChange(val, endDate);
              }}
              value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground font-medium">Date de fin</label>
            <input
              type="date"
              className="w-full text-sm bg-background border border-border rounded p-1.5 focus:ring-1 focus:ring-ring outline-none"
              onChange={(e) => {
                const val = e.target.value ? new Date(e.target.value) : null;
                onChange(startDate, val);
              }}
              value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            />
          </div>
          <button
            className="w-full bg-primary text-primary-foreground text-sm font-medium py-1.5 rounded"
            onClick={() => setIsOpen(false)}
          >
            Appliquer
          </button>
        </div>
      )}
    </div>
  );
}
