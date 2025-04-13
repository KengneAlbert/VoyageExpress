import { motion } from 'framer-motion';
import { Users, Clock, MapPin, ArrowRight, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { TripSearchResponse } from '../../../services/api/types';

interface TripPoint {
  city: string;
  point: string;
}

interface TripCardProps {
  trip: TripSearchResponse;
}

const TripCard = ({ trip }: TripCardProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleBooking = () => {
    if (!isAuthenticated) {
      // Save booking intent in session storage
      sessionStorage.setItem('bookingIntent', JSON.stringify({
        tripId: trip.id,
        redirectTo: '/booking'
      }));
      navigate('/login');
      return;
    }

    navigate('/booking', { state: { trip } });
  };

  return (
    <motion.div
      onClick={handleBooking}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl
                 rounded-xl overflow-hidden border border-gray-800/50 hover:border-orange-500/30
                 shadow-xl shadow-black/20 hover:shadow-orange-500/10 group"
    >
      {/* VIP Badge */}
      {trip.isVip && (
        <div className="absolute -top-2 -right-2 z-10">
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 0 }}
            className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 
                     p-0.5 rounded-lg shadow-lg"
          >
            <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Crown className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" />
                <span className="text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 
                               text-transparent bg-clip-text">VIP</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="p-4">
        {/* Agency Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={trip.logo}
                alt={trip.agency}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-800/50 group-hover:ring-orange-500/30"
              />
              <motion.div
                className="absolute -bottom-1 -right-1 bg-orange-500 text-xs font-bold text-white px-1.5 py-0.5 rounded"
                whileHover={{ scale: 1.1 }}
              >
                4.9
              </motion.div>
            </div>
            <div>
              <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors">{trip.agency.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Users className="h-4 w-4" />
                <span>{trip.availableSeats} places</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 
                          text-transparent bg-clip-text">
              {trip.price.toLocaleString()} XAF
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="relative py-4 border-t border-gray-800/50">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-4 py-3 border-t border-gray-800">
            {/* Departure */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-white font-medium">{trip.departure.city}</span>
              </div>
              <p className="text-xs text-gray-500 pl-6">{trip.departure.point}</p>
            </div>

            {/* Dotted Line with Arrow */}
            <div className="flex items-center gap-2 px-4">
              <div className="h-[2px] w-12 border-t-2 border-dashed border-gray-600"></div>
              <ArrowRight className="h-5 w-5 text-gray-600" />
              <div className="h-[2px] w-12 border-t-2 border-dashed border-gray-600"></div>
            </div>

            {/* Arrival */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-white font-medium">{trip.destination.city}</span>
              </div>
              <p className="text-xs text-gray-500 pl-6">{trip.destination.point}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-orange-400" />
              <span>{trip.departureTime}</span>
            </div>
            <span>→</span>
            <span>{trip.arrivalTime}</span>
          </div>
          <motion.button
            onClick={handleBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                     hover:shadow-orange-500/30 transition-shadow"
          >
            Réserver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;