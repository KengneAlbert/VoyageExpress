import React from 'react';
import { MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from "framer-motion";

const TOP_DESTINATIONS = [
  {
    from: 'Douala',
    to: 'Yaoundé',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&auto=format',
    price: '3500',
    duration: '4h',
    popularity: '98%',
    nextDeparture: '30min',
    description: 'La liaison la plus fréquentée entre les deux plus grandes villes du Cameroun.'
  },
  {
    from: 'Yaoundé',
    to: 'Bafoussam',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop&auto=format',
    price: '4000',
    duration: '5h',
    popularity: '95%',
    nextDeparture: '1h',
    description: 'Découvrez la beauté de l\'Ouest à travers ce trajet panoramique.'
  },
  {
    from: 'Douala',
    to: 'Kribi',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop&auto=format',
    price: '3000',
    duration: '3h',
    popularity: '92%',
    nextDeparture: '45min',
    description: 'Rejoignez la ville balnéaire la plus prisée du Cameroun.'
  },
  {
    from: 'Yaoundé',
    to: 'Bamenda',
    image: 'https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?w=800&h=600&fit=crop&auto=format',
    price: '5000',
    duration: '6h',
    popularity: '90%',
    nextDeparture: '2h',
    description: 'Une route pittoresque vers la capitale du Nord-Ouest.'
  }
];

const TopDestinations = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            Destinations les plus <span className="text-orange-400">populaires</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Découvrez nos trajets les plus appréciés par nos voyageurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOP_DESTINATIONS.map((destination, index) => (
            <motion.div
              key={`${destination.from}-${destination.to}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={destination.image}
                  alt={`${destination.from} - ${destination.to}`}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.from} → {destination.to}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-orange-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{destination.duration}</span>
                      </div>
                      <div className="flex items-center text-orange-400">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">{destination.popularity}</span>
                      </div>
                      <div className="flex items-center text-orange-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">Prochain départ: {destination.nextDeparture}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">À partir de</div>
                    <div className="text-3xl font-bold text-orange-400">
                      {destination.price} FCFA
                    </div>
                    <button className="mt-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors duration-200 flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Réserver</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;