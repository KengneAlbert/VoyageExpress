import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
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

const SearchResults = () => {
  const location = useLocation();
  const searchData = location.state?.searchData;

  console.log("Search Data received:", searchData);

  const defaultValues = location.state?.searchData || {
    departure: "",
    destination: "",
    date: "",
    returnDate: "",
    passengers: 1,
    isRoundTrip: false,
  };

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
  }, [sortType]);

  const handleFilterChange = (filters: typeof activeFilters) => {
    setIsLoading(true);
    setActiveFilters(filters);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-24 pb-12 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-[380px,1fr] gap-4 lg:gap-8">
          {/* Sidebar - Hidden on mobile, shown as modal or collapsible */}
          <aside className="xl:sticky xl:top-24 h-fit order-2 xl:order-1">
            <div className="lg:block">
              <SearchForm defaultValues={defaultValues} />
            </div>
          </aside>

          {/* Results Section */}
          <div className="order-1 xl:order-2 w-full min-w-0">
            {/* Sticky Filter Section */}
            <div className="sticky top-20 z-30 -mx-3 sm:-mx-4 lg:-mx-8 mb-4 lg:mb-6">
              <div className="bg-gray-950/90 backdrop-blur-md px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                  <h2 className="text-lg sm:text-2xl font-bold text-white">
                    Résultats ({trips.length})
                  </h2>
                </div>
                <FilterBar
                  onFilterChange={handleFilterChange}
                  onSort={(type) => setSortType(type)}
                />
              </div>
            </div>

            {/* Results List */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 sm:h-40 lg:h-48 bg-gray-800/50 rounded-xl animate-pulse"
                    />
                  ))}
                </motion.div>
              ) : trips.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-3 sm:gap-4"
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
                      <TripCard trip={trip} searchData={defaultValues} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4"
                >
                  <Search className="h-10 sm:h-12 w-10 sm:w-12 text-gray-600 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
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
};

export default SearchResults;
