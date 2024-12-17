import React from 'react';
import { motion } from 'framer-motion';

interface VehicleImageProps {
  type: 'bike' | 'scooter';
}

export const VehicleImage: React.FC<VehicleImageProps> = ({ type }) => {
  const imageUrl = type === 'bike'
    ? 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-select-model-sparkle-black-red-single-disc-1671022675998.png?q=80'
    : 'https://imgd.aeplcdn.com/1056x594/n/bw/models/colors/tvs-select-model-white-1701165682549.png?q=80&wm=3';

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative w-64 h-48 mx-auto rounded-lg overflow-hidden shadow-xl"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <img
        src={imageUrl}
        alt={type === 'bike' ? 'Pulsar Bike' : 'Jupiter Scooty'}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};