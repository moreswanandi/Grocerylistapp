import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

interface ListItemProps {
  item: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: () => void;
  onDelete: () => void;
}

export function ListItem({ item, onToggle, onDelete }: ListItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="flex-shrink-0"
      >
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
          className="w-5 h-5 rounded-md border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
        />
      </motion.div>

      <motion.span
        animate={{
          textDecoration: item.completed ? "line-through" : "none",
          color: item.completed ? "#9ca3af" : "#1f2937",
        }}
        className="flex-grow text-base"
      >
        {item.text}
      </motion.span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </motion.button>
    </motion.li>
  );
}
