import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface SeatSelectionProps {
  selectedSeats: string[];
  onSeatSelect: (seat: string) => void;
  bookedSeats?: string[];
}

const SeatSelection = ({ selectedSeats, onSeatSelect, bookedSeats = [] }: SeatSelectionProps) => {
  const rows = ['A', 'B', 'C', 'D'];
  const columns = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Sélection des places</h3>
      
      {/* Bus Layout */}
      <div className="relative">
        {/* Driver Section */}
        <div className="absolute -top-8 left-0 right-0 flex justify-center">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Seats Grid */}
        <div className="grid grid-cols-4 gap-3">
          {rows.map((row) => (
            <div key={row} className="space-y-3">
              {columns.map((col) => {
                const seatNumber = `${row}${col}`;
                const isSelected = selectedSeats.includes(seatNumber);
                const isBooked = bookedSeats.includes(seatNumber);

                return (
                  <motion.button
                    key={seatNumber}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !isBooked && onSeatSelect(seatNumber)}
                    disabled={isBooked}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
                              transition-colors ${
                                isBooked
                                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700'
                              }`}
                  >
                    {seatNumber}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800/50 rounded" />
            <span className="text-sm text-gray-400">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded" />
            <span className="text-sm text-gray-400">Sélectionné</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded" />
            <span className="text-sm text-gray-400">Occupé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;