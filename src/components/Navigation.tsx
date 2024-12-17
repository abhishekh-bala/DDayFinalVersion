import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: 'contest' | 'admin';
  onTabChange: (tab: 'contest' | 'admin') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4 bg-gray-100 p-2 rounded-full">
      {['contest', 'admin'].map((tab) => (
        <motion.button
          key={tab}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab as 'contest' | 'admin')}
          className={`px-6 py-2 rounded-full capitalize ${
            activeTab === tab
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-transparent text-gray-600'
          }`}
        >
          {tab} Dashboard
        </motion.button>
      ))}
    </div>
  );
};