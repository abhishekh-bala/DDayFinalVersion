import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ isVisible, onComplete }) => {
  const count = useCountdown({
    isActive: isVisible,
    startFrom: 5,
    onComplete,
  });

  useEffect(() => {
    let audio: HTMLAudioElement;
    if (isVisible) {
      audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568.wav');
      audio.play();
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isVisible, count]);

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const numberVariants = {
    initial: { 
      scale: 2,
      opacity: 0,
      rotateX: -180,
      y: 50
    },
    animate: { 
      scale: 1,
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      rotateX: 180,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-gradient-to-br from-purple-900/95 to-black/95 flex items-center justify-center z-40"
          style={{ position: 'fixed', height: '100vh' }}
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                borderRadius: ["20%", "50%", "20%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -m-8 opacity-30 blur-xl"
            />
            <motion.div
              key={count}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
              <span className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    style={{ textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
                {count}
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-1/4 left-0 right-0 text-center"
          >
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Selecting winner...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};