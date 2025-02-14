import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, ArrowRight, Eye } from "lucide-react";

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
  status: "upcoming" | "completed" | "cancelled";
  seatNumber: string;
  isVip: boolean;
  bookingReference: string;
  logo: string;
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    agency: "Bluebird Express",
    departure: { city: "Douala", point: "Bonanjo" },
    destination: { city: "Yaoundé", point: "Mvan" },
    date: "2024-03-15",
    departureTime: "08:00",
    arrivalTime: "12:00",
    price: 5000,
    status: "upcoming",
    seatNumber: "A12",
    isVip: true,
    bookingReference: "VE-2024031501",
    logo: "src/assets/logove.jpg",
  },
  // Add more mock tickets...
];

// Add these status configurations
const STATUS_CONFIGS = {
  upcoming: {
    label: "À venir",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
  },
  completed: {
    label: "Terminé",
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/20",
  },
  cancelled: {
    label: "Annulé",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20",
  },
};

const MyTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    const matchesSearch =
      ticket.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.departure.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.destination.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                  from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 
                     bg-clip-text text-transparent mb-4"
          >
            Mes Billets
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gérez vos réservations et accédez à tous vos billets en un seul
            endroit
          </p>
        </motion.div>

        {/* Improved Search and Filters */}
        <div
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                    rounded-2xl border border-white/10 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par destination, date..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 
                       rounded-xl text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center gap-4">
              {Object.entries(STATUS_CONFIGS).map(([status, config]) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setStatusFilter(
                      status as "all" | "upcoming" | "completed" | "cancelled"
                    )
                  }
                  className={`px-4 py-2 rounded-xl border transition-all
                          ${
                            statusFilter === status
                              ? `${config.bgColor} ${config.borderColor} ${config.color}`
                              : "border-gray-700 text-gray-400 hover:border-gray-600"
                          }`}
                >
                  {config.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                      rounded-2xl border border-white/10 hover:border-orange-500/50 
                      transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={ticket.logo}
                        alt={ticket.agency}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold text-white group-hover:text-orange-400 
                                 transition-colors"
                      >
                        {ticket.agency}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>{ticket.departure.city}</span>
                        <ArrowRight className="w-4 h-4" />
                        <span>{ticket.destination.city}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      STATUS_CONFIGS[ticket.status].bgColor
                    } 
                              ${
                                STATUS_CONFIGS[ticket.status].borderColor
                              } border`}
                  >
                    <span className={STATUS_CONFIGS[ticket.status].color}>
                      {STATUS_CONFIGS[ticket.status].label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Date de départ</p>
                    <p className="text-white font-medium">{ticket.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Heure</p>
                    <p className="text-white font-medium">
                      {ticket.departureTime}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Place</p>
                    <p className="text-white font-medium">
                      {ticket.seatNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-orange-400 hover:text-orange-300 
                           flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-xl 
                           hover:bg-orange-600 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Voir détails
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
