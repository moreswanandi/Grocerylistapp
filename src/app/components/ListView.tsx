import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, CheckCircle2 } from "lucide-react";
import { ListItem } from "./ListItem";

interface Item {
  id: string;
  text: string;
  completed: boolean;
}

interface ListViewProps {
  list: {
    id: string;
    name: string;
    items: Item[];
  };
  onBack: () => void;
  onUpdateList: (items: Item[]) => void;
}

export function ListView({ list, onBack, onUpdateList }: ListViewProps) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (inputValue.trim() === "") return;

    const newItem: Item = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };

    onUpdateList([...list.items, newItem]);
    setInputValue("");
  };

  const toggleItem = (id: string) => {
    onUpdateList(
      list.items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    onUpdateList(list.items.filter(item => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const completedCount = list.items.filter(item => item.completed).length;
  const totalCount = list.items.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6"
    >
      <div className="max-w-2xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Lists
        </motion.button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{list.name}</h1>
            {totalCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {completedCount}/{totalCount}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add an item..."
              className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addItem}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add
            </motion.button>
          </div>

          <ul className="space-y-3">
            <AnimatePresence>
              {list.items.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onToggle={() => toggleItem(item.id)}
                  onDelete={() => deleteItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </ul>

          {list.items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400"
            >
              <ShoppingBasket className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>No items yet. Add your first item above!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ShoppingBasket({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
