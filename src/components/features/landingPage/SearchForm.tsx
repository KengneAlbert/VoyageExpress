import React, { useState } from "react";
import { MapPin, Search, ArrowLeftRight, Users, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CityAutocomplete from "./CityAutocomplete";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "../../common/DatePicker";
import { useLazySearchTripsQuery, useGetCitiesQuery } from '../../../services/api/voyagesApi';

interface SearchFormData {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
}

interface SearchFormProps {
  defaultValues: SearchFormData;
}

const SearchForm: React.FC<SearchFormProps> = ({ defaultValues }) => {
  const [formData, setFormData] = useState<SearchFormData>({
    ...defaultValues,
    date: new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
  });
  const [errors, setErrors] = useState<Partial<SearchFormData>>({});
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const navigate = useNavigate();

  const { data: cities = [] } = useGetCitiesQuery();
  const [searchTrips, { isLoading: isSearching }] = useLazySearchTripsQuery();

  const swapCities = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche le formulaire de se soumettre
    const prevDeparture = formData.departure;
    const prevDestination = formData.destination;
    
    setFormData({
      ...formData,
      departure: prevDestination,
      destination: prevDeparture
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SearchFormData> = {};
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (!formData.departure) {
      newErrors.departure = "Ville de départ requise";
    }

    if (!formData.destination) {
      newErrors.destination = "Ville d'arrivée requise";
    }

    if (formData.departure === formData.destination && formData.departure) {
      newErrors.destination = "La destination doit être différente du départ";
    }

    if (!formData.date) {
      newErrors.date = "Date requise";
    } else if (selectedDate < currentDate) {
      newErrors.date = "La date ne peut pas être dans le passé";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const results = await searchTrips({
          departure: formData.departure,
          destination: formData.destination,
          date: formData.date,
          passengers: formData.passengers
        }).unwrap();
        
        navigate('/search-results', {
          state: {
            searchData: formData,
            searchResults: results
          }
        });
      } catch (error) {
        console.error('Error during search:', error);
        // Handle error state here
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Villes Section */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            {/* Ville de départ */}
            <div className="relative">
              <CityAutocomplete
                placeholder="Ville de départ"
                value={formData.departure}
                onChange={(value) => setFormData({ ...formData, departure: value })}
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                error={errors.departure}
              />
            </div>

            {/* Bouton d'échange pour desktop */}
            <div className="hidden lg:flex justify-center">
              <button
                type="button"
                onClick={swapCities}
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center
                         shadow-lg hover:bg-orange-600 transition-colors z-20 cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <ArrowLeftRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Ville d'arrivée */}
            <div className="relative">
              {/* Bouton d'échange pour mobile */}
              <div className="lg:hidden absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <button
                  type="button"
                  onClick={swapCities}
                  className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center
                           shadow-lg hover:bg-orange-600 transition-colors cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <ArrowLeftRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <CityAutocomplete
                placeholder="Ville d'arrivée"
                value={formData.destination}
                onChange={(value) => setFormData({ ...formData, destination: value })}
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                error={errors.destination}
              />
            </div>
          </div>

          {/* Date Picker */}
          <div className="lg:w-[220px]">
            <DatePicker
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="w-full"
              error={errors.date}
            />
          </div>

          {/* Passengers Selector */}
          <div className="lg:w-[200px] relative">
            <button
              type="button"
              onClick={() => setIsPassengersOpen(!isPassengersOpen)}
              className="w-full h-[42px] px-4 rounded-lg bg-gray-800/50 border border-white/20
                       text-white flex items-center justify-between hover:border-orange-400
                       transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                <span>{formData.passengers} voyageur{formData.passengers > 1 ? 's' : ''}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>

            <AnimatePresence>
              {isPassengersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg
                           shadow-xl border border-gray-800 p-2 z-50"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, passengers: num });
                        setIsPassengersOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-md transition-colors
                                ${formData.passengers === num
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                      {num} voyageur{num > 1 ? 's' : ''}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Button - Now full width and below form fields */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSearching}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                   rounded-xl text-white font-medium shadow-lg shadow-orange-500/20
                   hover:shadow-orange-500/30 transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2 text-lg"
        >
          {isSearching ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Recherche en cours...</span>
              
            </>
          ) : (
            <>
              <Search className="w-6 h-6" />
              <span>Rechercher des voyages</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchForm;
