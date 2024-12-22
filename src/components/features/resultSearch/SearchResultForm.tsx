import React, { useState } from "react";
import { MapPin, Users, Plus, Minus } from "lucide-react";
import CityAutocomplete from "../landingPage/CityAutocomplete";
import { motion } from "framer-motion";
import { DatePicker } from "../../common/DatePicker";

interface FormData {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
}

interface SearchResultFormProps {
  defaultValues: FormData;
}

const SearchResultForm = ({ defaultValues }: SearchResultFormProps) => {
  const [formData, setFormData] = useState<FormData>(defaultValues);
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
                 rounded-xl border border-gray-800/50 shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Modifier votre recherche
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Departure */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Ville de départ
              </label>
              <CityAutocomplete
                placeholder="Ville de départ"
                value={formData.departure}
                onChange={(value) =>
                  setFormData({ ...formData, departure: value })
                }
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                className="transition-all focus-within:ring-2 focus-within:ring-orange-500/50"
              />
              {errors.departure && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.departure}
                </motion.p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Ville d'arrivée
              </label>
              <CityAutocomplete
                placeholder="Ville d'arrivée"
                value={formData.destination}
                onChange={(value) =>
                  setFormData({ ...formData, destination: value })
                }
                icon={<MapPin className="h-5 w-5 text-orange-400" />}
                className="transition-all focus-within:ring-2 focus-within:ring-orange-500/50"
              />
              {errors.destination && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.destination}
                </motion.p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Date du voyage
              </label>
              <DatePicker
                value={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                className="w-full transition-all duration-200 
                         focus-within:ring-2 focus-within:ring-orange-500/50"
              />
              {errors.date && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.date}
                </motion.p>
              )}
            </div>

            {/* Passengers Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Nombre de passagers
              </label>
              <div
                className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700 
                            rounded-lg text-gray-300 hover:border-orange-500/50 transition-all"
              >
                <Users className="h-5 w-5 text-orange-400" />
                <div className="flex items-center justify-between flex-1">
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(-1)}
                    className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                    disabled={formData.passengers <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium">
                    {formData.passengers} passager
                    {formData.passengers > 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePassengersChange(1)}
                    className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                    disabled={formData.passengers >= 9}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {errors.passengers && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400"
                >
                  {errors.passengers}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600
                       text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                       hover:shadow-orange-500/30 transition-all"
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
