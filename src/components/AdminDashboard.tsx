import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Guide } from '../types';
import { TicketNumber } from './TicketNumber';
import { PageLoader } from './PageLoader';

interface AdminDashboardProps {
  guides: Guide[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ guides }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 50;

  const filteredGuides = guides.filter((guide) =>
    guide.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);
  const currentGuides = filteredGuides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    // Reduced loading time
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearch(value);
    setCurrentPage(1);
    // Reduced loading time
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 relative"
    >
      {isLoading && <PageLoader />}
      
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 group-hover:opacity-30 transition-opacity" />
          <h3 className="text-blue-100 font-medium mb-2 text-lg">Total Guides</h3>
          <p className="text-5xl font-bold mb-2">{guides.length}</p>
          <div className="h-1 w-20 bg-blue-300/30 rounded-full" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 group-hover:opacity-30 transition-opacity" />
          <h3 className="text-emerald-100 font-medium mb-2 text-lg">Total Tickets</h3>
          <p className="text-5xl font-bold mb-2">
            {guides.reduce((acc, guide) => acc + guide.tickets.length, 0)}
          </p>
          <div className="h-1 w-20 bg-emerald-300/30 rounded-full" />
        </motion.div>
      </div>

      <motion.div className="relative">
        <input
          type="text"
          placeholder="Search guides..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-4 border rounded-xl bg-white/95 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </motion.div>

      <motion.div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-purple-100">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Guide Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Number of Tickets</th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Ticket Numbers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {currentGuides.map((guide, idx) => (
              <motion.tr
                key={guide.jomax_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-purple-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-medium text-gradient">{guide.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    {guide.tickets.length}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-1">
                  {guide.tickets.map((ticket, index) => (
                    <TicketNumber key={index} number={ticket} />
                  ))}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === i + 1
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100'
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};