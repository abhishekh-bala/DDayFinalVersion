import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Star, PartyPopper, Sparkles } from 'lucide-react';
import type { Winner } from '../types';
import { VehicleImage } from './VehicleImage';

interface WinnerModalProps {
  winner: Winner | null;
  onClose: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!winner) return null;

  const isFirstPrize = winner.prize === 'Pulsar Bike';

  const floatingIcons = [
    { Icon: Trophy, color: 'text-yellow-400', delay: 0 },
    { Icon: Star, color: 'text-pink-400', delay: 0.2 },
    { Icon: PartyPopper, color: 'text-purple-400', delay: 0.4 },
    { Icon: Sparkles, color: 'text-blue-400', delay: 0.6 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden"
        style={{ position: 'fixed', height: '100vh' }}
      >
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#E879F9', '#C084FC', '#F472B6', '#38BDF8']}
        />

        {/* Floating celebration icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingIcons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              initial={{ y: '100vh', x: index * 100 }}
              animate={{ 
                y: '-100vh',
                x: [index * 100, (index + 1) * 150, index * 100],
                rotate: [0, 360, 720]
              }}
              transition={{
                duration: 15,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`absolute ${color}`}
            >
              <Icon size={32} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="card-gradient p-1 rounded-2xl shadow-xl max-w-md w-full mx-4 relative"
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-50"
            animate={{
              background: [
                "linear-gradient(0deg, #E879F9, #C084FC)",
                "linear-gradient(90deg, #C084FC, #F472B6)",
                "linear-gradient(180deg, #F472B6, #E879F9)",
                "linear-gradient(270deg, #E879F9, #C084FC)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="bg-white rounded-xl p-8 relative">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative mb-6"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 drop-shadow-lg" />
              </motion.div>
              
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                className="font-space-grotesk text-4xl font-bold mb-2 text-gradient"
              >
                Winner {isFirstPrize ? '1' : '2'}
              </motion.h2>
            </motion.div>
            
            <div className="space-y-4 mb-8">
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-medium"
              >
                <span className="text-gray-600">Guide Name: </span>
                <span className="text-gradient font-bold">{winner.guide.name}</span>
              </motion.p>

              <motion.p
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl font-medium text-gray-600"
              >
                Congratulations! You've won:
              </motion.p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200
                }}
                className="text-5xl font-bold font-space-grotesk text-gradient"
              >
                {winner.prize}
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <VehicleImage type={isFirstPrize ? 'bike' : 'scooter'} />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="card-gradient w-full px-8 py-3 rounded-full font-semibold mt-8 text-white text-lg shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};