import { useState } from "react";
import { motion } from "motion/react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  labels?: string[];
}

export function RangeSlider({ min, max, value, onChange, labels }: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);

  const getPosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const handleMouseDown = (thumb: "start" | "end") => {
    setIsDragging(thumb);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = Math.round(min + percent * (max - min));

    if (isDragging === "start") {
      onChange([Math.min(newValue, value[1]), value[1]]);
    } else {
      onChange([value[0], Math.max(newValue, value[0])]);
    }
  };

  const startPos = getPosition(value[0]);
  const endPos = getPosition(value[1]);

  return (
    <div className="w-full">
      <div
        className="relative h-12 flex items-center cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute w-full h-0.5 bg-gray-200 rounded-full" />

        <motion.div
          className="absolute h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full"
          style={{
            left: `${startPos}%`,
            right: `${100 - endPos}%`,
          }}
        />

        <motion.div
          className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          style={{ left: `${startPos}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => handleMouseDown("start")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        />

        <motion.div
          className="absolute w-5 h-5 bg-white border-2 border-emerald-600 rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          style={{ left: `${endPos}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => handleMouseDown("end")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {labels && (
        <div className="flex justify-between mt-2 px-2">
          <span className="text-xs tracking-wide text-gray-400 font-medium">
            {labels[value[0]]}
          </span>
          <span className="text-xs tracking-wide text-gray-400 font-medium">
            {labels[value[1]]}
          </span>
        </div>
      )}
    </div>
  );
}
