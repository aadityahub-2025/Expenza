import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-2xl flex items-center justify-center text-white text-2xl z-50"
    >
      <FaPlus />
    </motion.button>
  );
}