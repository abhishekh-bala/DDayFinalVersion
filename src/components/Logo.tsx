import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-center mb-8"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        src="/godaddy-logo.png"
        alt="GoDaddy Logo"
        className="h-12 mb-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://img.logos-world.net/wp-content/uploads/2020/11/GoDaddy-Logo.png';
        }}
      />
    </motion.div>
  );
};