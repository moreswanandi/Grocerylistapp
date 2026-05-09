import { motion, AnimatePresence } from "motion/react";
import { Plus, ShoppingCart } from "lucide-react";
import { GroceryListCard } from "./GroceryListCard";

interface GroceryList {
  id: string;
  name: string;
  items: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
}

interface HomePageProps {
  lists: GroceryList[];
  onSelectList: (id: string) => void;
  onDeleteList: (id: string) => void;
  onCreateList: () => void;
}

export function HomePage({ lists, onSelectList, onDeleteList, onCreateList }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-lg"
          >
            <ShoppingCart className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Grocery Lists
          </h1>
          <p className="text-xl text-gray-600">
            Organize your shopping with ease
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCreateList}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg font-semibold">Create New List</span>
          </motion.button>
        </motion.div>

        {lists.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No lists yet
            </h3>
            <p className="text-gray-500">
              Create your first grocery list to get started!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {lists.map((list, index) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GroceryListCard
                    list={{
                      id: list.id,
                      name: list.name,
                      itemCount: list.items.length,
                      completedCount: list.items.filter(item => item.completed).length,
                    }}
                    onClick={() => onSelectList(list.id)}
                    onDelete={(e) => {
                      e.stopPropagation();
                      onDeleteList(list.id);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
