import React from 'react';
import { motion } from 'framer-motion';
import type { Winner } from '../types';

interface WinnerCardProps {
  winner: Winner;
  index: number;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ winner, index }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow-xl relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Winner {index + 1}
      </h3>
      <div className="space-y-4">
        <p className="text-xl">
          <span className="text-gray-600 font-medium">Guide Name: </span>
          <span className="text-purple-700 font-semibold">{winner.guide.name}</span>
        </p>
        <p className="text-xl">
          <span className="text-gray-600 font-medium">Winning Ticket: </span>
          <span className="text-pink-600 font-mono font-semibold">{winner.ticket}</span>
        </p>
        <p className="text-2xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          {winner.prize}
        </p>
      </div>
    </motion.div>
  );
};