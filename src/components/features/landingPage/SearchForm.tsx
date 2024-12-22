import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import CityAutocomplete from "./CityAutocomplete";
// import Input from "../../common/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import { DatePicker } from "../../common/DatePicker";

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
  const [formData, setFormData] = useState<SearchFormData>(defaultValues);
  const [errors, setErrors] = useState<Partial<SearchFormData>>({});
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Partial<SearchFormData> = {};

    if (!formData.departure) {
      newErrors.departure = "Ville de départ requise";
    }

    if (!formData.destination) {
      newErrors.destination = "Ville d'arrivée requise";
    }

    if (
      formData.departure === formData.destination &&
      formData.departure !== ""
    ) {
      newErrors.destination = "La destination doit être différente du départ";
    }

    if (!formData.date) {
      newErrors.date = "Date requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "La date doit être aujourd'hui ou ultérieure";
      }
    }

    if (formData.passengers < 1 || formData.passengers > 9) {
      newErrors.passengers = formData.passengers;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSearching(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSearching(false);
      console.log("Form submitted:", formData);
      navigate("/search-results", { state: { searchParams: formData } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <CityAutocomplete
              placeholder="Ville de départ"
              value={formData.departure}
              onChange={(value) =>
                setFormData({ ...formData, departure: value })
              }
              icon={<MapPin className="h-5 w-5" />}
            />
            {errors.departure && (
              <p className="mt-1 text-sm text-red-400">{errors.departure}</p>
            )}
          </div>

          <div>
            <CityAutocomplete
              placeholder="Ville d'arrivée"
              value={formData.destination}
              onChange={(value) =>
                setFormData({ ...formData, destination: value })
              }
              icon={<MapPin className="h-5 w-5" />}
            />
            {errors.destination && (
              <p className="mt-1 text-sm text-red-400">{errors.destination}</p>
            )}
          </div>

          <div>
            <DatePicker
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="w-full rounded-md bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-400">{errors.date}</p>
            )}
          </div>

          <div>
            <select
              value={formData.passengers}
              onChange={(e) =>
                setFormData({ ...formData, passengers: Number(e.target.value) })
              }
              className="w-full py-2 pl-10 pr-3 rounded-md bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num} className="text-gray-900">
                  {num} {num === 1 ? "voyageur" : "voyageurs"}
                </option>
              ))}
            </select>
            {errors.passengers && (
              <p className="mt-1 text-sm text-red-400">{errors.passengers}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSearching}
          className="w-full"
          isLoading={isSearching}
          leftIcon={<Search className="w-5 h-5" />}
        >
          Rechercher
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchForm;
