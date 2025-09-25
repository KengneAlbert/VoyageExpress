import { motion } from "framer-motion";
import { Users, Clock, MapPin, ArrowRight, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TripPoint {
  city: string;
  point: string;
}

interface SearchData {
  departure: string;
  destination: string;
  date: string;
  returnDate?: string;
  passengers: number;
  isRoundTrip: boolean;
}

interface TripCardProps {
  trip: {
    id: string;
    agency: string;
    logo: string;
    price: number;
    departure: TripPoint;
    destination: TripPoint;
    departureTime: string;
    arrivalTime: string;
    availableSeats: number;
    isVip?: boolean;
  };
  searchData?: SearchData;
}

const TripCard = ({ trip, searchData }: TripCardProps) => {
  const navigate = useNavigate();
  const isRoundTrip = !!searchData?.isRoundTrip;
  const displayPrice = trip.price * (isRoundTrip ? 2 : 1);

  const handleBooking = () => {
    navigate("/booking", { state: { trip, searchData } });
  };
  return (
    <motion.div
      onClick={handleBooking}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl
                 rounded-lg sm:rounded-xl overflow-hidden border border-gray-800/50 hover:border-orange-500/30
                 shadow-xl shadow-black/20 hover:shadow-orange-500/10 group cursor-pointer
                 w-full"
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
                <Crown
                  className="h-3.5 w-3.5 text-yellow-400"
                  fill="currentColor"
                />
                <span
                  className="text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 
                               text-transparent bg-clip-text"
                >
                  VIP
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="p-3 sm:p-4">
        {/* Agency Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <img
                src={trip.logo}
                alt={trip.agency}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover ring-2 ring-gray-800/50 group-hover:ring-orange-500/30"
              />
              <motion.div
                className="absolute -bottom-1 -right-1 bg-orange-500 text-xs font-bold text-white px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs"
                whileHover={{ scale: 1.1 }}
              >
                4.9
              </motion.div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors text-sm sm:text-base truncate">
                {trip.agency}
              </h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>{trip.availableSeats} places</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 
                          text-transparent bg-clip-text"
            >
              {displayPrice.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">
              XAF {isRoundTrip ? "(A/R)" : ""}
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="relative py-3 sm:py-4 border-t border-gray-800/50">
          <div
            className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-2 sm:py-3 border-t border-gray-800">
            {/* Departure */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0" />
                <span className="text-white font-medium text-sm sm:text-base truncate">
                  {trip.departure.city}
                </span>
              </div>
              <p className="text-xs text-gray-500 pl-4 sm:pl-6 truncate">
                {trip.departure.point}
              </p>
            </div>

            {/* Dotted Line with Arrow - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 px-2 sm:px-4 flex-shrink-0">
              <div className="h-[2px] w-8 sm:w-12 border-t-2 border-dashed border-gray-600"></div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              <div className="h-[2px] w-8 sm:w-12 border-t-2 border-dashed border-gray-600"></div>
            </div>

            {/* Mobile Arrow */}
            <div className="sm:hidden flex justify-center">
              <ArrowRight className="h-4 w-4 text-gray-600 transform rotate-90" />
            </div>

            {/* Arrival */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0" />
                <span className="text-white font-medium text-sm sm:text-base truncate">
                  {trip.destination.city}
                </span>
              </div>
              <p className="text-xs text-gray-500 pl-4 sm:pl-6 truncate">
                {trip.destination.point}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400" />
              <span>{trip.departureTime}</span>
            </div>
            <span>→</span>
            <span>{trip.arrivalTime}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                     hover:shadow-orange-500/30 transition-shadow text-sm sm:text-base"
          >
            Réserver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;
