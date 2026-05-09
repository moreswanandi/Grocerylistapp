import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  color: "blue" | "green" | "amber";
}

export function StatCard({ title, value, unit, change, icon: Icon, color }: StatCardProps) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "text-blue-600",
    },
    green: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      icon: "text-emerald-600",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      icon: "text-amber-600",
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow"
      style={{
        boxShadow: "0 4px 24px -6px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 rounded-2xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={2} />
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
              change.trend === "up" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            <span>{change.trend === "up" ? "↑" : "↓"}</span>
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-xs tracking-widest uppercase text-gray-400 font-medium">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-semibold tracking-tight ${colors.text}`}>
            {value}
          </span>
          <span className="text-sm tracking-wide text-gray-400 uppercase">
            {unit}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
