import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, Download, XCircle } from 'lucide-react';

interface Ticket {
  id: string;
  agency: string;
  departure: {
    city: string;
    point: string;
  };
  destination: {
    city: string;
    point: string;
  };
  date: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  seatNumber: string;
  isVip: boolean;
  bookingReference: string;
  logo: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    agency: 'Bluebird Express',
    departure: { city: 'Douala', point: 'Bonanjo' },
    destination: { city: 'Yaoundé', point: 'Mvan' },
    date: '2024-03-15',
    departureTime: '08:00',
    arrivalTime: '12:00',
    price: 5000,
    status: 'upcoming',
    seatNumber: 'A12',
    isVip: true,
    bookingReference: 'VE-2024031501',
    logo: 'src/statics/logove.jpg'
  },
  // Add more mock tickets...
];

const MyTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const filteredTickets = MOCK_TICKETS.filter(ticket => {
    const matchesSearch = 
      ticket.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.departure.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Mes <span className="text-orange-400">Billets</span>
          </h1>
          <p className="text-gray-400">Gérez vos réservations et accédez à vos billets</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un billet..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as typeof statusFilter)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  statusFilter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {status === 'all' ? 'Tous' : 
                 status === 'upcoming' ? 'À venir' :
                 status === 'completed' ? 'Terminés' : 'Annulés'}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden"
              >
                {/* Ticket Header */}
                <div className="p-6 border-b border-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={ticket.logo}
                        alt={ticket.agency}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">{ticket.agency}</h3>
                        <p className="text-sm text-gray-400">Ref: {ticket.bookingReference}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                      ticket.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                      ticket.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {ticket.status === 'upcoming' ? 'À venir' :
                       ticket.status === 'completed' ? 'Terminé' : 'Annulé'}
                    </div>
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6 space-y-6">
                  {/* Journey Details */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        <span className="text-white font-medium">{ticket.departure.city}</span>
                      </div>
                      <p className="text-xs text-gray-500 pl-6">{ticket.departure.point}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-[2px] w-12 border-t-2 border-dashed border-gray-600"></div>
                      <Clock className="h-5 w-5 text-gray-600" />
                      <div className="h-[2px] w-12 border-t-2 border-dashed border-gray-600"></div>
                    </div>

                    <div className="flex-1 text-right">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <span className="text-white font-medium">{ticket.destination.city}</span>
                        <MapPin className="h-4 w-4 text-orange-400" />
                      </div>
                      <p className="text-xs text-gray-500">{ticket.destination.point}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="text-white font-medium">{new Date(ticket.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Heure</p>
                      <p className="text-white font-medium">{ticket.departureTime} - {ticket.arrivalTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Siège</p>
                      <p className="text-white font-medium">{ticket.seatNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Prix</p>
                      <p className="text-white font-medium">{ticket.price} XAF</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    {ticket.status === 'upcoming' && (
                      <button className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors">
                        <XCircle className="h-5 w-5" />
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg 
                                     hover:bg-orange-600 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyTickets;