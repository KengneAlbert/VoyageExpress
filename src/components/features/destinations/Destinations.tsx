import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  ThermometerSun,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { DESTINATIONS } from "./destinationData";

const regions = [
  { value: "", label: "Toutes les régions" },
  { value: "littoral", label: "Littoral" },
  { value: "centre", label: "Centre" },
  { value: "sud-ouest", label: "Sud-Ouest" },
  { value: "nord-ouest", label: "Nord-Ouest" },
  { value: "ouest", label: "Ouest" },
  { value: "sud", label: "Sud" },
  { value: "est", label: "Est" },
  { value: "extreme-nord", label: "Extrême-Nord" },
  { value: "nord", label: "Nord" },
  { value: "adamaoua", label: "Adamaoua" },
];

const Destinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const handleExploreDestination = (destinationId: number) => {
    navigate(`/destinations/${destinationId}`);
  };

  const filteredDestinations = DESTINATIONS.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      !selectedRegion ||
      destination.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative overflow-hidden rounded-3xl h-[60vh] min-h-[500px]"
        >
          {/* Background avec parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
              <img
                src="https://images.unsplash.com/photo-1528732807373-ba48c09d6739?ixlib=rb-4.0.3"
                alt="Cameroun paysage"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />
          </div>

          {/* Contenu du hero */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Destinations <span className="text-orange-500">Touristiques</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 mb-12 max-w-2xl mx-auto text-lg"
            >
              Découvrez la beauté et la diversité du Cameroun à travers ses
              régions emblématiques
            </motion.p>

            {/* Barre de recherche améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 max-w-3xl w-full"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border 
                           border-white/20 rounded-xl text-white placeholder-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-orange-500/50
                           focus:border-orange-500/50 transition-all duration-300"
                />
              </div>

              {/* Dropdown amélioré */}
              <div className="relative min-w-[200px]">
                <button
                  onClick={() => setIsRegionOpen(!isRegionOpen)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 
                           rounded-xl text-gray-200 focus:outline-none focus:ring-2 
                           focus:ring-orange-500/50 transition-all duration-300
                           flex items-center justify-between"
                >
                  <span>
                    {regions.find((r) => r.value === selectedRegion)?.label ||
                      "Toutes les régions"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 
                                      ${isRegionOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Menu déroulant */}
                <AnimatePresence>
                  {isRegionOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 py-2 bg-gray-800/95 backdrop-blur-lg 
                               border border-white/10 rounded-xl shadow-xl"
                    >
                      {regions.map((region) => (
                        <button
                          key={region.value}
                          onClick={() => {
                            setSelectedRegion(region.value);
                            setIsRegionOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-700/50
                                   ${
                                     selectedRegion === region.value
                                       ? "text-orange-400 bg-orange-500/10"
                                       : "text-gray-200"
                                   }`}
                        >
                          {region.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Grille de destinations avec effet de masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleExploreDestination(destination.id)}
              className="group cursor-pointer bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                       backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden 
                       hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 
                       transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 
                           transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.region}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm line-clamp-2">
                  {destination.description}
                </p>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {destination.climate.bestTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <ThermometerSun className="w-4 h-4" />
                    <span className="text-sm">
                      {destination.climate.temperature}
                    </span>
                  </div>
                </div>

                {/* Points d'intérêt */}
                <div className="flex flex-wrap gap-2">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Add new activity badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {destination.activities.slice(0, 3).map((activity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full
                               bg-orange-500/10 text-orange-400 text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>

                {/* Improved action button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-orange-500 
                           to-orange-600 rounded-xl text-white font-medium shadow-lg 
                           hover:shadow-orange-500/25 transition-all duration-300
                           flex items-center justify-center gap-2"
                >
                  <span>Explorer la destination</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Destinations", value: DESTINATIONS.length },
            { label: "Régions", value: "10+" },
            { label: "Activités", value: "50+" },
            { label: "Hébergements", value: "100+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl font-bold text-orange-500 mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Destinations;
