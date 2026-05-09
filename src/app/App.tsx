import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HomePage } from "./components/HomePage";
import { ListView } from "./components/ListView";

interface Item {
  id: string;
  text: string;
  completed: boolean;
}

interface GroceryList {
  id: string;
  name: string;
  items: Item[];
}

import { useState } from "react";
import { motion } from "motion/react";
import { Zap, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { EnergyChart } from "./components/EnergyChart";
import { SegmentedControl } from "./components/SegmentedControl";
import { RangeSlider } from "./components/RangeSlider";
import { StatCard } from "./components/StatCard";

const generateMockData = (period: string) => {
  const baseData = {
    day: [
      { time: "00:00", usage: 2.3, cost: 0.46, isAnomaly: false },
      { time: "04:00", usage: 1.8, cost: 0.36, isAnomaly: false },
      { time: "08:00", usage: 4.2, cost: 0.84, isAnomaly: false },
      { time: "12:00", usage: 5.8, cost: 1.16, isAnomaly: true },
      { time: "16:00", usage: 6.4, cost: 1.28, isAnomaly: false },
      { time: "20:00", usage: 8.2, cost: 1.64, isAnomaly: true },
      { time: "23:59", usage: 3.5, cost: 0.7, isAnomaly: false },
    ],
    week: [
      { time: "Mon", usage: 32.4, cost: 6.48, isAnomaly: false },
      { time: "Tue", usage: 28.6, cost: 5.72, isAnomaly: false },
      { time: "Wed", usage: 35.2, cost: 7.04, isAnomaly: false },
      { time: "Thu", usage: 42.8, cost: 8.56, isAnomaly: true },
      { time: "Fri", usage: 38.4, cost: 7.68, isAnomaly: false },
      { time: "Sat", usage: 44.6, cost: 8.92, isAnomaly: true },
      { time: "Sun", usage: 36.2, cost: 7.24, isAnomaly: false },
    ],
    month: [
      { time: "Week 1", usage: 245, cost: 49.0, isAnomaly: false },
      { time: "Week 2", usage: 268, cost: 53.6, isAnomaly: false },
      { time: "Week 3", usage: 312, cost: 62.4, isAnomaly: true },
      { time: "Week 4", usage: 289, cost: 57.8, isAnomaly: false },
    ],
    year: [
      { time: "Jan", usage: 1240, cost: 248, isAnomaly: false },
      { time: "Feb", usage: 1180, cost: 236, isAnomaly: false },
      { time: "Mar", usage: 1090, cost: 218, isAnomaly: false },
      { time: "Apr", usage: 980, cost: 196, isAnomaly: false },
      { time: "May", usage: 1120, cost: 224, isAnomaly: false },
      { time: "Jun", usage: 1450, cost: 290, isAnomaly: true },
      { time: "Jul", usage: 1580, cost: 316, isAnomaly: true },
      { time: "Aug", usage: 1520, cost: 304, isAnomaly: false },
      { time: "Sep", usage: 1280, cost: 256, isAnomaly: false },
      { time: "Oct", usage: 1150, cost: 230, isAnomaly: false },
      { time: "Nov", usage: 1220, cost: 244, isAnomaly: false },
      { time: "Dec", usage: 1340, cost: 268, isAnomaly: false },
    ],
  };

  return baseData[period as keyof typeof baseData] || baseData.day;
};

export default function App() {
  const [lists, setLists] = useState<GroceryList[]>([
    {
      id: "1",
      name: "Weekly Shopping",
      items: [
        { id: "1", text: "Milk", completed: false },
        { id: "2", text: "Bread", completed: true },
        { id: "3", text: "Eggs", completed: false },
      ],
    },
  ]);

  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [listCounter, setListCounter] = useState(2);

  const createNewList = () => {
    const listName = prompt("Enter list name:");
    if (!listName || listName.trim() === "") return;

    const newList: GroceryList = {
      id: Date.now().toString(),
      name: listName.trim(),
      items: [],
    };

    setLists([...lists, newList]);
  };

  const deleteList = (id: string) => {
    if (confirm("Are you sure you want to delete this list?")) {
      setLists(lists.filter(list => list.id !== id));
      if (selectedListId === id) {
        setSelectedListId(null);
      }
    }
  };

  const updateListItems = (listId: string, items: Item[]) => {
    setLists(lists.map(list =>
      list.id === listId ? { ...list, items } : list
    ));
  };

  const selectedList = lists.find(list => list.id === selectedListId);

  const [timeRange, setTimeRange] = useState("week");
  const [mode, setMode] = useState<"usage" | "cost">("usage");
  const [sliderRange, setSliderRange] = useState<[number, number]>([0, 6]);

  const data = generateMockData(timeRange);
  const filteredData = data.slice(sliderRange[0], sliderRange[1] + 1);

  const timeRangeOptions = [
    { value: "day", label: "D" },
    { value: "week", label: "W" },
    { value: "month", label: "M" },
    { value: "year", label: "Y" },
  ];

  const modeOptions = [
    { value: "usage", label: "Usage" },
    { value: "cost", label: "Cost" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
 over         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Energy Dashboard
            </h1>
          </div>
          <p className="text-sm tracking-wide text-gray-400 uppercase ml-14">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-6"
        >
          <StatCard
            title="Total Usage"
            value="1,245"
            unit="kWh"
            change={{ value: 12, trend: "up" }}
            icon={Zap}
            color="blue"
          />
          <StatCard
            title="Total Cost"
            value="249"
            unit="USD"
            change={{ value: 8, trend: "down" }}
            icon={DollarSign}
            color="green"
          />
          <StatCard
            title="Avg Daily"
            value="41.5"
            unit="kWh"
            change={{ value: 3, trend: "up" }}
            icon={TrendingUp}
            color="amber"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-100/50"
          style={{
            boxShadow: "0 8px 48px -12px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="flow-auto">
      <AnimatePresence mode="wait">
        {selectedList ? (
          <ListView
            key="list-view"
            list={selectedList}
            onBack={() => setSelectedListId(null)}
            onUpdateList={(items) => updateListItems(selectedList.id, items)}
          />
        ) : (
          <HomePage
            key="home-page"
            lists={lists}
            onSelebetween mb-12">
            <div className="flex items-ctList={setSelectedListId}
            onDeleteList={deleteList}
            onCreateList={createNewList}
          />
        )}
      </AnimatePresence gap-4>
              <Calendar className="w-5 h-5 text-gray-400" strokeWidth={2} />
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Energy Consumption
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <SegmentedControl
                options={modeOptions}
                selected={mode}
                onChange={(value) => setMode(value as "usage" | "cost")}
              />
              <SegmentedControl
                options={timeRangeOptions}
                selected={timeRange}
                onChange={(value) => {
                  setTimeRange(value);
                  const newData = generateMockData(value);
                  setSliderRange([0, newData.length - 1]);
                }}
              />
            </div>
          </div>

          <div className="h-96 mb-8">
            <EnergyChart data={filteredData} mode={mode} />
          </div>

          <div className="mt-12 px-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-widest uppercase text-gray-400 font-medium">
                Time Range
              </span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <RangeSlider
              min={0}
              max={data.length - 1}
              value={sliderRange}
              onChange={setSliderRange}
              labels={data.map((d) => d.time)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-xs tracking-wide text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Anomaly Detection Active</span>
          </div>
          <span>•</span>
          <span>Real-time monitoring enabled</span>
        </motion.div>
      </div>
    </div>
  );
}