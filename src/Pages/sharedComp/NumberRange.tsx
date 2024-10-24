import { Button } from "@/components/ui/button";

const NumberRangeGrid = () => {
  const ranges = [
    '1 - 5',
    '6 - 10',
    '11 - 15',
    '16 - 20',
    '21 - 25',
    '26 - 30'
  ];

  return (
    <div className="grid grid-cols-3 gap-2 p-4 w-full max-w-sm mx-auto relative z-10">
      {ranges.map((range) => (
        <Button
          key={range}
          variant="outline"
          className="bg-[#1D1B4D] text-white hover:text-white border-2 border-red-600 hover:bg-[#2d2a6a] transition-colors font-medium h-12 relative z-10"
        >
          {range}
        </Button>
      ))}
    </div>
  );
};

export default NumberRangeGrid;