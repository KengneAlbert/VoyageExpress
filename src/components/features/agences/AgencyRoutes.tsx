import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Coins, Zap } from 'lucide-react';
import { Route } from '../../../types/agency';

interface AgencyRoutesProps {
  routes: Route[];
}

const AgencyRoutes = ({ routes }: AgencyRoutesProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {routes.map((route) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                      rounded-xl border border-white/10 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Route Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xl font-semibold text-white mb-2">
                  <span>{route.from}</span>
                  <ArrowRight className="w-5 h-5 text-orange-400" />
                  <span>{route.to}</span>
                  {route.isPopular && (
                    <span className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-400 
                                   text-sm rounded-lg">Populaire</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4" />
                    <span>À partir de {route.price} FCFA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>{route.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Departure Times */}
              <div className="flex flex-wrap gap-2">
                {route.departureTime.map((time, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgencyRoutes;
