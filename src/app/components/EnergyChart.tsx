import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

interface DataPoint {
  time: string;
  usage: number;
  cost: number;
  isAnomaly?: boolean;
}

interface EnergyChartProps {
  data: DataPoint[];
  mode: "usage" | "cost";
}

export function EnergyChart({ data, mode }: EnergyChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-white/90 backdrop-blur-xl px-6 py-4 rounded-full shadow-2xl border border-gray-100"
          style={{
            boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center gap-6">
            <div className="text-xs tracking-wider uppercase text-gray-400 font-medium">
              {data.time}
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-baseline gap-2">
              <span
                className="text-2xl font-semibold tracking-tight"
                style={{
                  color: mode === "usage" ? "#2563eb" : "#10b981",
                }}
              >
                {mode === "usage" ? data.usage.toFixed(1) : `$${data.cost.toFixed(2)}`}
              </span>
              <span className="text-xs tracking-wide text-gray-400 uppercase">
                {mode === "usage" ? "kWh" : "USD"}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const CustomCursor = (props: any) => {
    const { points } = props;
    if (!points || !points.length) return null;

    return (
      <line
        x1={points[0].x}
        y1={0}
        x2={points[0].x}
        y2={500}
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth={1}
        strokeDasharray="none"
      />
    );
  };

  const anomalies = data.filter((d) => d.isAnomaly);

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 40, right: 40, left: 0, bottom: 40 }}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setActiveIndex(state.activeTooltipIndex ?? null);
            } else {
              setActiveIndex(null);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="0"
            stroke="rgba(0, 0, 0, 0.03)"
            vertical={false}
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
            dy={15}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
            dx={-10}
            tickFormatter={(value) =>
              mode === "usage" ? `${value}` : `$${value}`
            }
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
            position={{ y: -60 }}
            allowEscapeViewBox={{ x: false, y: true }}
          />

          <Area
            type="monotone"
            dataKey={mode === "usage" ? "usage" : "cost"}
            stroke={mode === "usage" ? "#2563eb" : "#10b981"}
            strokeWidth={2.5}
            fill={`url(#${mode === "usage" ? "usageGradient" : "costGradient"})`}
            animationDuration={800}
            animationEasing="ease-out"
          />

          {anomalies.map((anomaly, index) => (
            <ReferenceDot
              key={index}
              x={anomaly.time}
              y={mode === "usage" ? anomaly.usage : anomaly.cost}
              r={0}
              shape={(props: any) => {
                const { cx, cy } = props;
                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={mode === "usage" ? "#2563eb" : "#10b981"}
                      opacity={0.2}
                    >
                      <animate
                        attributeName="r"
                        from="6"
                        to="12"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.3"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={mode === "usage" ? "#2563eb" : "#10b981"}
                    />
                  </g>
                );
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
