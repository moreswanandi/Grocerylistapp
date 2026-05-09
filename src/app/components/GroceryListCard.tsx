import { motion } from "motion/react";
import { ShoppingBasket, Trash2 } from "lucide-react";

interface GroceryListCardProps {
  list: {
    id: string;
    name: string;
    itemCount: number;
    completedCount: number;
  };
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function GroceryListCard({ list, onClick, onDelete }: GroceryListCardProps) {
  const progress = list.itemCount > 0 ? (list.completedCount / list.itemCount) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <ShoppingBasket className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{list.name}</h3>
              <p className="text-sm text-gray-500">
                {list.completedCount} of {list.itemCount} items
              </p>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
