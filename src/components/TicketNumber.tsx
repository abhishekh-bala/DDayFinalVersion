import React from 'react';
import { motion } from 'framer-motion';

interface TicketNumberProps {
  number: number;
}

const colors = [
  'bg-blue-100 text-blue-800',
  'bg-pink-100 text-pink-800',
  'bg-purple-100 text-purple-800',
  'bg-emerald-100 text-emerald-800',
  'bg-amber-100 text-amber-800',
];

export const TicketNumber: React.FC<TicketNumberProps> = ({ number }) => {
  const colorIndex = number % colors.length;
  
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${colors[colorIndex]} cursor-default`}
    >
      {number}
    </motion.span>
  );
};