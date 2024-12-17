import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Guide, Winner } from '../types';
import { WinnerModal } from './WinnerModal';
import { CountdownOverlay } from './CountdownOverlay';
import { WinnerCard } from './WinnerCard';
import { TicketReveal } from './TicketReveal';

interface ContestDashboardProps {
  guides: Guide[];
  onSelectWinner: () => Winner;
}

export const ContestDashboard: React.FC<ContestDashboardProps> = ({
  guides,
  onSelectWinner,
}) => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showTicketReveal, setShowTicketReveal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);

  const handleGenerateWinner = () => {
    if (winners.length >= 2 || isSelecting) return;
    setIsSelecting(true);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    const winner = onSelectWinner();
    setSelectedWinner(winner);
    setShowTicketReveal(true);
  };

  const handleTicketRevealComplete = () => {
    setShowTicketReveal(false);
    setCurrentWinner(selectedWinner);
  };

  const handleModalClose = () => {
    setCurrentWinner(null);
    setIsSelecting(false);
    setWinners(prev => [...prev, selectedWinner!]);
    setSelectedWinner(null);
  };

  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center items-center space-x-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12 text-yellow-500" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Thrilling Contest Dashboard
        </h1>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12 text-yellow-500" />
        </motion.div>
      </motion.div>

      {winners.length < 2 && (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateWinner}
          disabled={isSelecting}
          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg relative overflow-hidden group ${
            isSelecting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="relative z-10">
            {winners.length === 0 ? 'Reveal Second Winner!' : 'Reveal First Winner!'}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      )}

      <div className="grid grid-cols-2 gap-6">
        {winners.map((winner, index) => (
          <WinnerCard 
            key={winner.guide.jomax_id} 
            winner={winner} 
            index={winners.length === 2 ? (index === 0 ? 1 : 0) : 1} 
          />
        ))}
      </div>

      <CountdownOverlay isVisible={showCountdown} onComplete={handleCountdownComplete} />
      <TicketReveal 
        isVisible={showTicketReveal} 
        winner={selectedWinner} 
        onComplete={handleTicketRevealComplete} 
      />
      <WinnerModal winner={currentWinner} onClose={handleModalClose} />
    </div>
  );
};