import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ThermometerSun,
  Hotel,
  Clock,
  Sun,
  Utensils,
  Car,
  Bus,
  PartyPopper,
  Navigation,
  Share2,
  Heart,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { DESTINATIONS } from "./destinationData";
import ShareModal from "../../common/ShareModal";

// Définition du type Bus localement pour éviter les problèmes d'import
interface Bus {
  id: number;
  company: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
  type: string;
  amenities: string[];
  logo?: string; // Ajout du logo
}

interface BusCardProps {
  bus: Bus;
  onBooking: (id: number) => void;
  selectedDate: string;
  passengers: number; // Ajout du nombre de passagers
}

const BusCard: React.FC<BusCardProps> = ({
  bus,
  onBooking,
  selectedDate,
  passengers,
}) => {
  const isDateValid = selectedDate && new Date(selectedDate) >= new Date();
  const isPassengersValid = passengers > 0 && passengers <= bus.seatsAvailable;
  const canBook = isDateValid && isPassengersValid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-gray-800/60 
               transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30"
    >
      {/* En-tête du bus avec logo */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {bus.logo ? (
              <img
                src={bus.logo}
                alt={`Logo ${bus.company}`}
                className="w-10 h-10 rounded-full object-cover border border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Bus className="w-6 h-6 text-orange-400" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white">{bus.company}</h3>
              <span className="text-sm text-gray-400">
                Compagnie de transport
              </span>
            </div>
          </div>
          <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
            {bus.type}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-6">
        {/* Horaires et Prix */}
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Départ - Arrivée</div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-lg">
                {bus.departureTime} - {bus.arrivalTime}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-gray-400 text-sm">Prix par personne</div>
            <div className="text-2xl font-bold text-white">
              {bus.price.toLocaleString()} FCFA
            </div>
          </div>
        </div>

        {/* Commodités */}
        <div className="space-y-2">
          <div className="text-gray-400 text-sm">Services à bord</div>
          <div className="flex flex-wrap gap-2">
            {bus.amenities.map((amenity: string) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 px-3 py-1 
                           bg-gray-700/50 rounded-full text-sm text-gray-300"
              >
                <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Places disponibles et Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div
            className={`flex items-center gap-2 
          ${bus.seatsAvailable > 10 ? "text-green-400" : "text-orange-400"}`}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {bus.seatsAvailable} places disponibles
              {!isPassengersValid && passengers > bus.seatsAvailable && (
                <span className="block text-xs text-red-400">
                  Nombre de passagers trop élevé
                </span>
              )}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            {!isDateValid && selectedDate && (
              <span className="text-xs text-red-400">Date invalide</span>
            )}
            <button
              onClick={() => canBook && onBooking(bus.id)}
              disabled={!canBook}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300
            ${
              canBook
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [passengers, setPassengers] = useState(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareCount, setShareCount] = useState(0);

  const destination = DESTINATIONS.find((d) => d.id === Number(id));

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Destination non trouvée</h2>
          <button
            onClick={() => navigate("/destinations")}
            className="px-6 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retour aux destinations
          </button>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === destination.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? destination.images.length - 1 : prev - 1
    );
  };

  const availableBuses: Bus[] = [
    {
      id: 1,
      company: "VoyageExpress Premium",
      departureTime: "08:00",
      arrivalTime: "14:00",
      price: 15000,
      seatsAvailable: 25,
      type: "VIP",
      amenities: ["Climatisation", "WiFi", "USB", "Toilettes"],
      logo: "/src/assets/logove.jpg", // Ajout du logo
    },
    {
      id: 2,
      company: "VoyageExpress Classic",
      departureTime: "10:30",
      arrivalTime: "16:30",
      price: 10000,
      seatsAvailable: 15,
      type: "Standard",
      amenities: ["Climatisation", "USB"],
      logo: "/src/assets/logove.jpg", // Ajout du logo
    },
  ];

  const handleBooking = (busId: number) => {
    navigate(
      `/booking?destination=${id}&bus=${busId}&date=${selectedDate}&passengers=${passengers}`
    );
  };

  const shareUrl = window.location.href;
  const shareTitle = destination
    ? `Découvrez ${destination.name} sur VoyageExpress`
    : "";

  const handleShare = () => {
    setShareCount((prev) => prev + 1);
    // Vous pouvez ajouter ici une logique pour suivre les partages
  };

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation et Actions */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/destinations")}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </motion.button>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${
                isLiked ? "bg-red-500" : "bg-gray-800"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full 
                        transition-colors relative group"
            >
              <Share2 className="w-5 h-5" />
              {shareCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-xs bg-orange-500 
                               text-white w-4 h-4 rounded-full flex items-center 
                               justify-center"
                >
                  {shareCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Hero Section avec Carousel */}
        <div className="relative h-[70vh] rounded-2xl overflow-hidden mb-12 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={destination.images[currentImageIndex]}
              alt={destination.name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Navigation du carousel */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {destination.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all
                           ${
                             idx === currentImageIndex
                               ? "bg-orange-500 w-4"
                               : "bg-white/50"
                           }`}
              />
            ))}
          </div>

          {/* Informations principales */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-bold text-white">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span>{destination.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span>Meilleure période: {destination.climate.bestTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-orange-400" />
                  <span>{destination.popularSeason}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contenu Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          {/* Colonne Principale */}
          <div className="space-y-8">
            {/* Section de réservation */}
            <motion.section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-8">
                Réserver votre trajet
              </h2>

              {/* Formulaire de recherche amélioré */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    Date de départ
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 rounded-xl text-white border border-gray-600
                             focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    Nombre de passagers
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-xl text-white border border-gray-600
                               focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      pers.
                    </div>
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 rounded-xl 
                                   text-white font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Rechercher
                  </button>
                </div>
              </div>

              {/* Liste des bus avec le nouveau composant */}
              <div className="space-y-4">
                {availableBuses.map((bus) => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                    onBooking={handleBooking}
                    selectedDate={selectedDate}
                    passengers={passengers}
                  />
                ))}
              </div>
            </motion.section>

            {/* À propos */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">À propos</h2>
              <p className="text-gray-300 leading-relaxed">
                {destination.description}
              </p>
            </motion.section>

            {/* Événements Culturels */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Événements Culturels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.culturalEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl"
                  >
                    <PartyPopper className="w-6 h-6 text-orange-400" />
                    <span className="text-gray-200">{event}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Transport */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Transport</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-orange-400 mb-4">
                    Comment y accéder
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.transportation.access.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl"
                      >
                        <Navigation className="w-5 h-5 text-orange-400" />
                        <span className="text-gray-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-orange-400 mb-4">
                    Transport local
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.transportation.localTransport.map(
                      (item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl"
                        >
                          <Car className="w-5 h-5 text-orange-400" />
                          <span className="text-gray-200">{item}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Galerie d'images */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Galerie Photos
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destination.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setShowImageModal(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${destination.name} ${idx + 1}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Modal de galerie */}
            <AnimatePresence>
              {showImageModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                >
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-50"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 p-2 text-white/80 hover:text-white z-50"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 p-2 text-white/80 hover:text-white z-50"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>

                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-5xl aspect-video"
                  >
                    <img
                      src={destination.images[selectedImageIndex]}
                      alt={`${destination.name} ${selectedImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation miniatures */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {destination.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 
                                   ${
                                     idx === selectedImageIndex
                                       ? "border-orange-500"
                                       : "border-transparent"
                                   }`}
                        >
                          <img
                            src={destination.images[idx]}
                            alt={`Miniature ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Transport Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Informations de voyage
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bus className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Durée moyenne</p>
                    <p className="text-white">6 heures</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Prix moyen</p>
                    <p className="text-white">10,000 - 15,000 FCFA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white text-sm">
                      Réservez à l'avance pendant les périodes de pointe
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Planifiez votre voyage
              </h3>
              <p className="text-white/90 mb-6">
                Réservez maintenant et vivez une expérience unique à{" "}
                {destination.name}
              </p>
              <div className="space-y-4">
                <button
                  className="w-full py-3 px-4 bg-white text-orange-500 rounded-xl font-medium
                                hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Contactez-nous
                </button>
                <button
                  className="w-full py-3 px-4 bg-black/20 text-white rounded-xl font-medium
                                hover:bg-black/30 transition-colors"
                >
                  En savoir plus
                </button>
              </div>
            </motion.div>

            {/* Informations climatiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4">Climat</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Meilleure période</p>
                    <p className="text-white">{destination.climate.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ThermometerSun className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Température</p>
                    <p className="text-white">
                      {destination.climate.temperature}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Précipitations</p>
                    <p className="text-white">{destination.climate.rainfall}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hébergement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4">Hébergement</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Hotel className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Hôtels disponibles</p>
                    <p className="text-white">
                      {destination.accommodation.hotels}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-gray-400">Fourchette de prix</p>
                    <p className="text-white">
                      {destination.accommodation.priceRange}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gastronomie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Gastronomie Locale
              </h2>
              <div className="space-y-3">
                {destination.cuisine.map((dish, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-orange-400" />
                    <span className="text-gray-300">{dish}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isShareModalOpen && (
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            title={shareTitle}
            url={shareUrl}
            onShare={handleShare}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationDetails;
