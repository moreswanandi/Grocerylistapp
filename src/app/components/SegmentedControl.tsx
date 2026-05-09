import { motion } from "motion/react";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex items-center bg-gray-50/50 backdrop-blur-sm rounded-full p-1 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          style={{
            color: selected === option.value ? "#111827" : "#9ca3af",
          }}
        >
          {selected === option.value && (
            <motion.div
              layoutId="segmented-control-bg"
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
