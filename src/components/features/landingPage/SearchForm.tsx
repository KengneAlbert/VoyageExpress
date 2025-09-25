import React, { useState } from "react";
import {
  MapPin,
  Search,
  ArrowLeftRight,
  Users,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CityAutocomplete from "./CityAutocomplete";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "../../common/DatePicker/index";

interface SearchFormData {
  departure: string;
  destination: string;
  date: string;
  returnDate?: string;
  passengers: number;
  isRoundTrip: boolean;
}

interface SearchFormProps {
  defaultValues: SearchFormData;
}

const SearchForm: React.FC<SearchFormProps> = ({ defaultValues }) => {
  // Modifier l'état initial pour inclure la date du jour
  const [formData, setFormData] = useState<SearchFormData>({
    ...defaultValues,
    date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
    returnDate: "",
    isRoundTrip: false,
  });
  const [errors, setErrors] = useState<Partial<SearchFormData>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const navigate = useNavigate();

  const swapCities = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche le formulaire de se soumettre
    const prevDeparture = formData.departure;
    const prevDestination = formData.destination;

    // Mise à jour directe sans utiliser le state précédent
    setFormData({
      ...formData,
      departure: prevDestination,
      destination: prevDeparture,
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

    // Validation pour aller-retour
    if (formData.isRoundTrip) {
      if (!formData.returnDate) {
        newErrors.returnDate = "Date de retour requise";
      } else {
        const returnDate = new Date(formData.returnDate);
        returnDate.setHours(0, 0, 0, 0);
        if (returnDate < selectedDate) {
          newErrors.returnDate =
            "La date de retour doit être après la date de départ";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSearching(true);
      try {
        console.log("Form data being sent:", formData);

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation d'un appel API

        navigate("/search-results", {
          state: {
            searchData: formData,
          },
        });
      } catch (error) {
        console.error("Error during search:", error);
        // Ajouter ici la gestion des erreurs si nécessaire
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 
  backdrop-blur-xl p-4 sm:p-6 rounded-xl border border-white/10 shadow-xl overflow-visible"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full">
        <div className="flex flex-col xl:flex-row gap-4 w-full">
          {/* Villes Section */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            {/* Ville de départ */}
            <div className="relative">
              <CityAutocomplete
                placeholder="Ville de départ"
                value={formData.departure}
                onChange={(value) =>
                  setFormData({ ...formData, departure: value })
                }
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                error={errors.departure}
              />
            </div>

            {/* Bouton d'échange pour desktop */}
            <div className="hidden xl:flex justify-center">
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
              {/* Bouton d'échange pour mobile/tablet */}
              <div className="xl:hidden absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <motion.button
                  type="button"
                  onClick={swapCities}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 
                           rounded-full flex items-center justify-center
                           shadow-lg hover:shadow-orange-500/25 
                           transition-all duration-300 cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           border-2 border-gray-900"
                >
                  <ArrowLeftRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>
              <CityAutocomplete
                placeholder="Ville d'arrivée"
                value={formData.destination}
                onChange={(value) =>
                  setFormData({ ...formData, destination: value })
                }
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                error={errors.destination}
              />
            </div>
          </div>

          {/* Dates + Passagers (groupe compact) */}
          <div
            className={`grid grid-cols-1 xl:grid-cols-[max-content,260px] gap-3 xl:flex-none xl:w-auto`}
          >
            {/* Date range group (compact) */}
            <div className="w-full xl:w-auto">
              <label className="block xl:hidden text-sm font-medium text-gray-400 mb-1">
                {formData.isRoundTrip ? "Dates" : "Date de départ"}
              </label>
              <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-2">
                <div
                  className={`w-full shrink-0 ${
                    formData.isRoundTrip ? "xl:w-[200px]" : "xl:w-[180px]"
                  }`}
                >
                  <DatePicker
                    value={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    className="w-full"
                    error={errors.date}
                  />
                </div>
                {formData.isRoundTrip && (
                  <>
                    <span className="hidden xl:inline text-gray-500">→</span>
                    <div className="w-full xl:w-[200px] shrink-0">
                      <DatePicker
                        value={formData.returnDate || ""}
                        onChange={(date) =>
                          setFormData({ ...formData, returnDate: date })
                        }
                        className="w-full"
                        error={errors.returnDate}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* Inline errors */}
              {(errors.date || errors.returnDate) && (
                <div className="mt-1 flex flex-col sm:flex-row gap-2 text-xs text-red-400">
                  {errors.date && <span>{errors.date}</span>}
                  {errors.returnDate && <span>{errors.returnDate}</span>}
                </div>
              )}
            </div>

            {/* Passengers Selector */}
            <div className="xl:w-full relative">
              <button
                type="button"
                onClick={() => setIsPassengersOpen(!isPassengersOpen)}
                className="w-full h-[42px] px-4 rounded-lg bg-gray-800/50 border border-white/20
                         text-white flex items-center justify-between hover:border-orange-400
                         transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span className="whitespace-nowrap">
                    {formData.passengers} voyageur
                    {formData.passengers > 1 ? "s" : ""}
                  </span>
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
                           shadow-xl border border-gray-800 p-2 z-[60] max-h-48 overflow-y-auto custom-scrollbar"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, passengers: num });
                          setIsPassengersOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left rounded-md transition-colors
                                ${
                                  formData.passengers === num
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "text-gray-400 hover:bg-gray-800"
                                }`}
                      >
                        {num} voyageur{num > 1 ? "s" : ""}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Trip Type Toggle (placé juste au-dessus du bouton de recherche) */}
        <div className="flex items-center justify-center">
          <div
            className="flex items-center bg-gray-800/50 rounded-xl p-1 border border-white/20 
                        shadow-lg backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isRoundTrip: false, returnDate: "" })
              }
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                !formData.isRoundTrip
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Aller simple
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isRoundTrip: true })}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                formData.isRoundTrip
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Aller-retour
            </button>
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
