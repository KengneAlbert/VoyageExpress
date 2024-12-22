import { motion } from "framer-motion";
import { Clock, MapPin, Users } from "lucide-react";

interface TripCardProps {
  trip: {
    id: string;
    agency: string;
    departure: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    availableSeats: number;
  };
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{trip.agency}</h3>
          <span className="text-orange-500 font-bold">
            {trip.price} FCFA
          </span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPin className="text-orange-500" />
            <div>
              <p className="text-gray-300">{trip.departure}</p>
              <p className="text-sm text-gray-500">{trip.departureTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="text-orange-500" />
            <div>
              <p className="text-gray-300">{trip.destination}</p>
              <p className="text-sm text-gray-500">{trip.arrivalTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="text-orange-500" />
            <span className="text-gray-300">
              {trip.availableSeats} places
            </span>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Réserver
        </button>
      </div>
    </motion.div>
  );
}