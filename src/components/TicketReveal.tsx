import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Winner } from '../types';

interface TicketRevealProps {
  isVisible: boolean;
  winner: Winner | null;
  onComplete: () => void;
}

export const TicketReveal: React.FC<TicketRevealProps> = ({ isVisible, winner, onComplete }) => {
  const [revealedDigits, setRevealedDigits] = useState<string[]>([]);
  const [showFullNumber, setShowFullNumber] = useState(false);
  
  useEffect(() => {
    if (isVisible && winner) {
      const ticketString = winner.ticket.toString();
      let currentIndex = 0;
      setRevealedDigits([]);
      setShowFullNumber(false);
      
      const interval = setInterval(() => {
        if (currentIndex < ticketString.length) {
          setRevealedDigits(prev => [...prev, ticketString[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowFullNumber(true);
          // Wait 2 seconds after showing full number before completing
          setTimeout(onComplete, 4000);
        }
      }, 15000); // 4 second delay between each digit

      return () => {
        clearInterval(interval);
        setRevealedDigits([]);
        setShowFullNumber(false);
      };
    }
  }, [isVisible, winner, onComplete]);

  if (!isVisible || !winner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-12 max-w-2xl w-full mx-4 text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Revealing Winning Ticket
            </h2>
            
            <div className="flex justify-center gap-4 mb-8">
              {winner.ticket.toString().split('').map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{
                    rotateY: revealedDigits[index] || showFullNumber ? 0 : 180,
                    opacity: revealedDigits[index] || showFullNumber ? 1 : 0,
                    scale: showFullNumber ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 150,
                    scale: {
                      duration: 0.3,
                      times: [0, 0.5, 1],
                    }
                  }}
                  className="w-16 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center perspective"
                >
                  <span className="text-4xl font-bold text-white">
                    {(revealedDigits[index] || showFullNumber) ? digit : '?'}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600"
            >
              {showFullNumber ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-gradient"
                >
                  Congratulations {winner.guide.name}!
                </motion.span>
              ) : (
                "Revealing the winning number..."
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};