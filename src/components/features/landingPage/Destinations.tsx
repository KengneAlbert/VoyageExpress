import React, { useState } from 'react';
import { TOURIST_DESTINATIONS } from '../../../utils/constants';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from "framer-motion";

const Destinations = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedDestinations = showAll ? TOURIST_DESTINATIONS : TOURIST_DESTINATIONS.slice(0, 3);

  return (
    <section className="py-24 bg-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Destinations <span className="text-orange-400">Touristiques</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez les merveilles du Cameroun à travers nos destinations les plus prisées
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDestinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-400" />
                  {destination.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.attractions.map((attraction) => (
                    <span
                      key={attraction}
                      className="px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full text-sm"
                    >
                      {attraction}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors duration-200"
          >
            <span>{showAll ? 'Voir moins' : 'Voir plus'}</span>
            {showAll ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Destinations;