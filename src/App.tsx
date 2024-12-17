import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ContestDashboard } from './components/ContestDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Logo } from './components/Logo';
import { PageLoader } from './components/PageLoader';
import { fetchGuideData } from './utils/fetchData';
import type { Guide, Winner } from './types';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'contest' | 'admin'>('contest');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [usedTickets, setUsedTickets] = useState<number[]>([]);
  const [winnerCount, setWinnerCount] = useState(0);
  const [availableTickets, setAvailableTickets] = useState<Map<number, Guide>>(new Map());

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGuideData();
        setGuides(data);
        
        // Create a map of all tickets to their corresponding guides
        const ticketMap = new Map<number, Guide>();
        data.forEach(guide => {
          guide.tickets.forEach(ticket => {
            ticketMap.set(ticket, guide);
          });
        });
        setAvailableTickets(ticketMap);
      } catch (error) {
        toast.error('Failed to load guide data. Please try again later.');
        console.error('Error loading guide data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (tab: 'contest' | 'admin') => {
    setPageLoading(true);
    setActiveTab(tab);
    setTimeout(() => setPageLoading(false), 800);
  };

  const selectWinner = (): Winner => {
    // Get all available tickets (excluding used ones)
    const remainingTickets = Array.from(availableTickets.keys())
      .filter(ticket => !usedTickets.includes(ticket));
    
    if (remainingTickets.length === 0) {
      throw new Error('No more available tickets');
    }
    
    // Select a random ticket from the remaining pool
    const randomIndex = Math.floor(Math.random() * remainingTickets.length);
    const winningTicket = remainingTickets[randomIndex];
    
    // Find the guide who owns this ticket
    const winningGuide = availableTickets.get(winningTicket);
    
    if (!winningGuide) {
      throw new Error('Could not find guide for winning ticket');
    }
    
    // Update used tickets
    setUsedTickets(prev => [...prev, winningTicket]);
    setWinnerCount(prev => prev + 1);
    
    return {
      guide: winningGuide,
      ticket: winningTicket,
      prize: winnerCount === 0 ? 'Jupiter Scooty' : 'Pulsar Bike'
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-animate bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <Logo />
          <div className="flex justify-center mb-8">
            <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
          
          {pageLoading ? (
            <PageLoader />
          ) : activeTab === 'contest' ? (
            <ContestDashboard guides={guides} onSelectWinner={selectWinner} />
          ) : (
            <AdminDashboard guides={guides} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;