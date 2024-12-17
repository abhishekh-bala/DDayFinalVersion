import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const LoadingSpinner: React.FC = () => {
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-animate bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        <Logo />
        
        <div className="relative flex justify-center my-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full card-gradient"
              initial="initial"
              animate="animate"
              variants={circleVariants}
              style={{
                opacity: 0.2,
                scale: 1 + i * 0.5,
              }}
              transition={{
                delay: i * 0.2,
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse"
              }}
            />
          ))}
          
          <motion.div
            className="relative z-10 w-16 h-16 rounded-full card-gradient flex items-center justify-center"
            variants={pulseVariants}
            animate="animate"
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 rounded-full card-gradient" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold font-space-grotesk text-gradient mb-4">
            Loading Dashboard
          </h2>
          <div className="flex gap-2 justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};