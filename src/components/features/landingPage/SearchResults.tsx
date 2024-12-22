import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Header from "../../layout/Header";
import SearchForm from "../resultSearch/SearchResultForm";
import FilterBar from "../resultSearch/FilterBar";
import TripCard from "../resultSearch/TripResultCard";

const trips = [
  {
    id: "1",
    agency: "Bluebird Express",
    price: 10000,
    availableSeats: 20,
    isVip: true,
    departure: { point: "Mvan, Yaoundé", city: "Yaoundé" },
    destination: { point: "Djadam, Bafoussam", city: "Bafoussam" },
    departureTime: "17:00",
    arrivalTime: "20:00",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
  },
  {
    id: "2",
    agency: "General Express",
    price: 5000,
    availableSeats: 20,
    isVip: false,
    departure: { point: "Brazaville, Douala", city: "Douala" },
    destination: { point: "Mvan, Yaoundé", city: "Yaoundé" },
    departureTime: "17:00",
    arrivalTime: "20:00",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
  },
  {
    id: "3",
    agency: "Maryland",
    price: 10000,
    availableSeats: 20,
    isVip: true,
    departure: { point: "Mvan, Yaoundé", city: "Yaoundé" },
    destination: { point: "Djadam, Bafoussam", city: "Bafoussam" },
    departureTime: "17:00",
    arrivalTime: "20:00",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
  },
  {
    id: "4",
    agency: "United Express",
    price: 5000,
    availableSeats: 20,
    isVip: false,
    departure: { point: "Brazaville, Douala", city: "Douala" },
    destination: { point: "Mvan, Yaoundé", city: "Yaoundé" },
    departureTime: "17:00",
    arrivalTime: "20:00",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
  },
];

export default function SearchResults() {
  const [sortType, setSortType] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    price?: string;
    time?: string;
    agency?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const sortedTrips = useMemo(() => {
    const sorted = [...trips];

    switch (sortType) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "time_asc":
        sorted.sort((a, b) => {
          const timeA = new Date(`2024-01-01 ${a.departureTime}`);
          const timeB = new Date(`2024-01-01 ${b.departureTime}`);
          return timeA.getTime() - timeB.getTime();
        });
        break;
      default:
        break;
    }

    return sorted;
  }, [trips, sortType]);

  const handleFilterChange = (filters: typeof activeFilters) => {
    setIsLoading(true);
    setActiveFilters(filters);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[420px,1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <SearchForm />
          </aside>

          {/* Results Section */}
          <div>
            {/* Sticky Filter Section */}
            <div className="sticky top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-8 mb-6">
              <div className="bg-gray-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Résultats ({trips.length})
                  </h2>
                </div>
                <FilterBar onFilterChange={handleFilterChange} onSort={(type) => setSortType(type)} />
              </div>
            </div>

            {/* Results List */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-gray-800/50 rounded-xl animate-pulse"
                    />
                  ))}
                </motion.div>
              ) : trips.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4"
                >
                  {sortedTrips.map((trip, index) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 },
                      }}
                    >
                      <TripCard trip={trip} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Search className="h-12 w-12 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-400">
                    Essayez de modifier vos critères de recherche
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
