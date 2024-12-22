import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Star, Users } from 'lucide-react';

const AGENCIES = [
  {
    id: 1,
    name: "Général Voyage",
    logo: "src/statics/logove.jpg",
    rating: 4.8,
    trips: 150,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Leader dans le transport interurbain depuis plus de 15 ans.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: "contact@general-voyage.cm"
  },
  {
    id: 2,
    name: "United Express",
    logo: "src/statics/logove.jpg",
    rating: 4.6,
    trips: 120,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Transport rapide et sécurisé dans tout le Cameroun.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: "",
    },
    {
    id: 3,
    name: "Bluebird",
    logo: "src/statics/logove.jpg",
    rating: 4.4,
    trips: 100,
    destinations: ["Douala", "Yaoundé", "Bafoussam"],
    description: "Transport rapide et sécurisé dans tout le Cameroun.",
    address: "123 Avenue de l'Union, Douala",
    phone: "+237 6XX XXX XXX",
    email: ""
    }

];

const AgenciesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgencies = AGENCIES.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Nos Agences <span className="text-orange-400">Partenaires</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez nos agences de voyage partenaires offrant des services de qualité
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une agence..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgencies.map((agency) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 
                       overflow-hidden hover:border-orange-500/30 transition-all duration-300"
            >
              {/* Agency Header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-4">
                  <img
                    src={agency.logo}
                    alt={agency.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{agency.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm">{agency.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4" />
                        <span className="ml-1 text-sm">{agency.trips}+ voyages</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agency Body */}
              <div className="p-6 space-y-4">
                <p className="text-gray-400">{agency.description}</p>
                
                {/* Destinations */}
                <div className="flex flex-wrap gap-2">
                  {agency.destinations.map((destination) => (
                    <span
                      key={destination}
                      className="px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full text-sm"
                    >
                      {destination}
                    </span>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 pt-4 border-t border-gray-800/50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{agency.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{agency.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{agency.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenciesPage;