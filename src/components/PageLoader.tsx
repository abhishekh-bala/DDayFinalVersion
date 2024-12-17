import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(0deg, #D946EF 0%, #C026D3 100%)",
              "linear-gradient(120deg, #8B5CF6 0%, #D946EF 100%)",
              "linear-gradient(240deg, #C026D3 0%, #8B5CF6 100%)",
              "linear-gradient(360deg, #D946EF 0%, #C026D3 100%)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            borderRadius: "100%",
            filter: "blur(15px)",
            opacity: 0.3,
            transform: "scale(1.5)"
          }}
        />
        
        <motion.div
          className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{
              background: "linear-gradient(45deg, #D946EF, #8B5CF6)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};