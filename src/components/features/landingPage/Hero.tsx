import React, { useState, useEffect } from "react";
import { HERO_IMAGES } from "../../../utils/constants";
import { POPULAR_ROUTES } from "../../../utils/routes";
// import SearchForm, { SearchFormProps } from './SearchForm';
import { motion } from "framer-motion";
import SearchForm from "./SearchForm";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      );
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-visible">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Hero Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-8 px-2"
            >
              Voyagez à Travers le
              <br />
              <span className="text-orange-400">Cameroun</span>
            </motion.h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-12 px-4">
              Réservez vos billets de bus en ligne et voyagez en toute sérénité
            </p>
          </div>

          {/* Search Form */}
          <SearchForm
            defaultValues={{
              departure: "",
              destination: "",
              date: new Date().toISOString().split("T")[0],
              passengers: 1,
              isRoundTrip: false,
            }}
          />

          {/* Featured Routes */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 px-2">
            {POPULAR_ROUTES.slice(0, 3).map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg hover:bg-white/20 transition-colors duration-200 cursor-pointer group w-full"
              >
                <div className="text-white text-center">
                  <p className="text-xs sm:text-sm uppercase tracking-wider mb-2">
                    À partir de
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">
                    {route.price} FCFA
                  </p>
                  <p className="text-sm sm:text-lg group-hover:text-orange-400 transition-colors duration-200 break-words">
                    {route.from} → {route.to}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">
                    {route.duration} de trajet
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
