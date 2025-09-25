import React, { useState } from "react";
import { MapPin, Users, Plus, Minus } from "lucide-react";
import CityAutocomplete from "../landingPage/CityAutocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { DatePicker } from "../../common/DatePicker/index";

interface FormData {
  departure: string;
  destination: string;
  date: string;
  returnDate?: string;
  passengers: number;
  isRoundTrip: boolean;
}

interface SearchResultFormProps {
  defaultValues: FormData;
}

const SearchResultForm = ({ defaultValues }: SearchResultFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    ...defaultValues,
    isRoundTrip: defaultValues.isRoundTrip || false,
    returnDate: defaultValues.returnDate || "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handlePassengersChange = (increment: number) => {
    const newValue = Math.max(1, Math.min(9, formData.passengers + increment));
    setFormData({ ...formData, passengers: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!formData.departure)
      newErrors.departure = "Veuillez sélectionner une ville de départ";
    if (!formData.destination)
      newErrors.destination = "Veuillez sélectionner une ville d'arrivée";
    if (!formData.date) newErrors.date = "Veuillez sélectionner une date";

    // Validation pour aller-retour
    if (formData.isRoundTrip) {
      if (!formData.returnDate) {
        newErrors.returnDate = "Date de retour requise";
      } else {
        const departDate = new Date(formData.date);
        const returnDate = new Date(formData.returnDate);
        if (returnDate <= departDate) {
          newErrors.returnDate =
            "La date de retour doit être après la date de départ";
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl 
         rounded-lg sm:rounded-xl border border-gray-800/50 shadow-xl overflow-visible
         w-full"
    >
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
          Modifier votre recherche
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            {/* Departure */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-400">
                Ville de départ
              </label>
              <CityAutocomplete
                placeholder="Ville de départ"
                value={formData.departure}
                onChange={(value) =>
                  setFormData({ ...formData, departure: value })
                }
                icon={
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                }
                className="transition-all focus-within:ring-2 focus-within:ring-orange-500/50"
              />
              {errors.departure && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs sm:text-sm text-red-400"
                >
                  {errors.departure}
                </motion.p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-400">
                Ville d'arrivée
              </label>
              <CityAutocomplete
                placeholder="Ville d'arrivée"
                value={formData.destination}
                onChange={(value) =>
                  setFormData({ ...formData, destination: value })
                }
                icon={
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                }
                className="transition-all focus-within:ring-2 focus-within:ring-orange-500/50"
              />
              {errors.destination && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs sm:text-sm text-red-400"
                >
                  {errors.destination}
                </motion.p>
              )}
            </div>

            {/* Trip Type Toggle */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-400">
                Type de voyage
              </label>
              <div
                className="flex items-center bg-gray-800/50 rounded-xl p-1 border border-white/20 
                            shadow-lg backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isRoundTrip: false,
                      returnDate: "",
                    })
                  }
                  className={`flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    !formData.isRoundTrip
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Aller simple
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isRoundTrip: true })
                  }
                  className={`flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    formData.isRoundTrip
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Aller-retour
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-400">
                Date de départ
              </label>
              <DatePicker
                value={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                className="w-full transition-all duration-200 
                         focus-within:ring-2 focus-within:ring-orange-500/50"
                error={errors.date}
              />
            </div>

            {/* Return Date - Only show if round trip */}
            <AnimatePresence mode="wait">
              {formData.isRoundTrip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <label className="block text-xs sm:text-sm font-medium text-gray-400">
                    Date de retour
                  </label>
                  <DatePicker
                    value={formData.returnDate || ""}
                    onChange={(date) =>
                      setFormData({ ...formData, returnDate: date })
                    }
                    className="w-full transition-all duration-200 
                             focus-within:ring-2 focus-within:ring-orange-500/50"
                    error={errors.returnDate}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Passengers Input */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-400">
                Nombre de passagers
              </label>
              <div
                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-800/50 border border-gray-700 
                            rounded-lg text-gray-300 hover:border-orange-500/50 transition-all"
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0" />
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(-1)}
                    className="p-1 hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
                    disabled={formData.passengers <= 1}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <span className="font-medium text-xs sm:text-sm text-center min-w-0">
                    {formData.passengers} passager
                    {formData.passengers > 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(1)}
                    className="p-1 hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
                    disabled={formData.passengers >= 9}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
              {errors.passengers && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs sm:text-sm text-red-400"
                >
                  {errors.passengers}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600
                       text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                       hover:shadow-orange-500/30 transition-all text-sm sm:text-base"
            >
              Rechercher
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SearchResultForm;
