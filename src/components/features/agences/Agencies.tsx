import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Mail, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logove.jpg";

const AGENCIES = [
  {
    id: 1,
    name: "Général Voyage",
    logo: Logo,
    rating: 4.8,
    trips: 150,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Leader dans le transport interurbain depuis plus de 15 ans.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: "contact@general-voyage.cm",
  },
  {
    id: 2,
    name: "United Express",
    logo: Logo,
    rating: 4.6,
    trips: 120,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Transport rapide et sécurisé dans tout le Cameroun.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: "contact@general-voyage.cm",
  },
  {
    id: 3,
    name: "Bluebird",
    logo: Logo,
    rating: 4.4,
    trips: 100,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Transport rapide et sécurisé dans tout le Cameroun.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: "contact@general-voyage.cm",
  },
];

const AgenciesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleViewAgency = (agencyId: number) => {
    navigate(`/agences/${agencyId}`);
  };

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 
                         bg-clip-text text-transparent mb-4"
            >
              Nos Agences Partenaires
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto mb-8"
            >
              Découvrez nos agences de voyage partenaires et trouvez celle qui
              correspond à vos besoins
            </motion.p>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une agence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 
                           rounded-xl text-white placeholder-gray-400 focus:outline-none 
                           focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl 
                         text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Toutes les agences</option>
                <option value="rating">Meilleures notes</option>
                <option value="trips">Plus de voyages</option>
              </select>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENCIES.map((agency, index) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                        rounded-2xl border border-white/10 shadow-xl overflow-hidden 
                        hover:border-orange-500/50 transition-all duration-300"
            >
              {/* Agency Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img
                      src={agency.logo}
                      alt={agency.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-white group-hover:text-orange-400 
                                 transition-colors"
                    >
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">
                        {agency.rating}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">
                        {agency.trips} voyages
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agency Details */}
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">{agency.description}</p>

                <div className="flex flex-wrap gap-2">
                  {agency.destinations.map((destination) => (
                    <span
                      key={destination}
                      className="px-3 py-1 bg-gray-800 rounded-full 
                                                     text-sm text-gray-300"
                    >
                      {destination}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{agency.address}</span>
                  </div>
                  {agency.phone && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{agency.phone}</span>
                    </div>
                  )}
                  {agency.email && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{agency.email}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewAgency(agency.id)}
                  className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                           rounded-xl text-white font-medium shadow-lg flex items-center justify-center 
                           gap-2 group-hover:shadow-orange-500/25 transition-all"
                >
                  <span>Voir les voyages</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenciesPage;
