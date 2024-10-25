import React from 'react';
import { Button } from "@/components/ui/button";

interface NumberRangeGridProps {
  onSelectRange: (range: string) => void;
  selectedRange: string | null;
}

const NumberRangeGrid: React.FC<NumberRangeGridProps> = ({ onSelectRange, selectedRange }) => {
  const ranges = [
    '1 - 5',
    '6 - 10',
    '11 - 15',
    '16 - 20',
    '21 - 25',
    '26 - 30'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {ranges.map((range) => (
        <Button
          key={range}
          onClick={() => onSelectRange(range)}
          variant={selectedRange === range ? "destructive" : "outline"}
          className={`
            h-12 text-sm font-medium
            ${selectedRange === range 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-[#1D1B4D] text-white hover:bg-[#2D2B5D]'
            }
          `}
        >
          {range}
        </Button>
      ))}
    </div>
  );
};

export default NumberRangeGrid;