import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  CreditCard,
  Calendar,
  MapPin,
  Clock,
  Crown,
  X,
  User,
  Armchair,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import SeatSelection from "./SeatSelection";

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
}

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;

  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idNumber: "",
    },
  ]);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const bookedSeats = ["A1", "B4", "C7", "D10"]; // Example of booked seats

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        idNumber: "",
      },
    ]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const newPassengers = passengers.filter((_, i) => i !== index);
      setPassengers(newPassengers);

      // Remove excess selected seats if needed
      if (selectedSeats.length > newPassengers.length) {
        setSelectedSeats(selectedSeats.slice(0, newPassengers.length));
      }
    }
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handleSeatSelect = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < passengers.length) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all passengers data
    const isValid = passengers.every(p => 
      p.firstName && 
      p.lastName && 
      p.email && 
      p.phone && 
      p.idNumber
    );

    // Validate seat selection
    const hasAllSeats = selectedSeats.length === passengers.length;

    if (isValid && hasAllSeats) {
      const bookingData = {
        trip,
        passengers,
        selectedSeats,
        totalPrice: trip?.price * passengers.length + (trip?.isVip ? 2000 : 0)
      };

      // Navigate to payment page with booking data
      navigate('/payment', { 
        state: { bookingData }
      });
    }
  };

  // Add steps state
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    { id: 1, title: "Passagers", icon: <User className="w-5 h-5" /> },
    { id: 2, title: "Places", icon: <Armchair className="w-5 h-5" /> },
    // { id: 3, title: "Paiement", icon: <CreditCard className="w-5 h-5" /> }
  ];

  // Add step navigation controls
  const handleNextStep = () => {
    if (activeStep === 1 && passengers.every(p => 
      p.firstName && p.lastName && p.email && p.phone && p.idNumber)) {
      setActiveStep(2);
    } else if (activeStep === 2 && selectedSeats.length === passengers.length) {
      setActiveStep(3);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex flex-col items-center ${
                    activeStep >= step.id ? 'text-orange-400' : 'text-gray-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                    ${activeStep >= step.id 
                      ? 'border-orange-400 bg-orange-400/10' 
                      : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="mt-2 text-sm font-medium">{step.title}</span>
                </motion.button>
                {idx < steps.length - 1 && (
                  <div className={`w-24 h-0.5 ${
                    activeStep > step.id ? 'bg-orange-400' : 'bg-gray-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          <motion.div 
            layout
            className="space-y-6"
          >
            {/* Trip Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                        rounded-2xl border border-white/10 shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={trip?.logo} alt={trip?.agency} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{trip?.agency}</h2>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{trip?.departure.city}</span>
                      <span>→</span>
                      <span>{trip?.destination.city}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-800/50">
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Départ</span>
                  </div>
                  <p className="text-white font-medium">15 Mars 2024</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Heure</span>
                  </div>
                  <p className="text-white font-medium">{trip?.departureTime}</p>
                </div>
              </div>
            </motion.div>

            {/* Passenger Forms - Show only if step 1 is active */}
            {activeStep === 1 && (
              <AnimatePresence>
                {passengers.map((passenger, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                              rounded-2xl border border-white/10 shadow-xl p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-white">
                        Passager {index + 1}
                      </h2>
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePassenger(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) =>
                            updatePassenger(index, "firstName", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) =>
                            updatePassenger(index, "lastName", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={passenger.email}
                            onChange={(e) =>
                              updatePassenger(index, "email", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Téléphone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={passenger.phone}
                            onChange={(e) =>
                              updatePassenger(index, "phone", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="+237 6XX XXX XXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Numéro CNI
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={passenger.idNumber}
                            onChange={(e) =>
                              updatePassenger(index, "idNumber", e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                                 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="XXXXXXXXX"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addPassenger}
                  className="w-full py-3 mt-4 bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/20
                            hover:bg-orange-500/30 transition-colors duration-200 font-medium"
                >
                  + Ajouter un passager
                </motion.button>
              </AnimatePresence>
            )}

            {/* Seat Selection - Show only if step 2 is active */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SeatSelection
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                  bookedSeats={bookedSeats}
                />
              </motion.div>
            )}

            {/* Payment Section - Show only if step 3 is active */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                          rounded-2xl border border-white/10 shadow-xl p-6"
              >
                {/* Add payment form here */}
              </motion.div>
            )}

            {/* Add navigation buttons at the bottom of each step section */}
            {activeStep === 1 && (
              <motion.div className="flex justify-between mt-6">
                <div /> {/* Empty div for spacing */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  disabled={!passengers.every(p => 
                    p.firstName && p.lastName && p.email && p.phone && p.idNumber)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                            rounded-xl text-white font-medium shadow-lg shadow-orange-500/20
                            hover:shadow-orange-500/30 transition-all flex items-center gap-2
                            disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choisir vos places
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-800 rounded-xl text-gray-300 
                            font-medium hover:bg-gray-700 transition-colors
                            flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Retour
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  disabled={selectedSeats.length !== passengers.length}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                            rounded-xl text-white font-medium shadow-lg shadow-orange-500/20
                            hover:shadow-orange-500/30 transition-all flex items-center gap-2
                            disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer vers le paiement
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

          </motion.div>

          {/* Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl 
                  rounded-2xl border border-white/10 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-400" />
                </div>
                <h3
                  className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 
                     bg-clip-text text-transparent"
                >
                  Résumé
                </h3>
              </div>

              <div className="space-y-4">
                {/* Passengers Count */}
                <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-300">
                        Billet{passengers.length > 1 ? "s" : ""} (
                        {passengers.length})
                      </span>
                    </div>
                    <span className="text-white font-medium">
                      {trip?.price * passengers.length} FCFA
                    </span>
                  </div>
                </div>

                {/* VIP Supplement */}
                {trip?.isVip && (
                  <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-300">Supplément VIP</span>
                      </div>
                      <span className="text-white font-medium">2000 FCFA</span>
                    </div>
                  </div>
                )}

                {/* Selected Seats */}
                {selectedSeats.length > 0 && (
                  <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Armchair className="w-5 h-5 text-orange-400" />
                      <span className="text-gray-300">
                        Places sélectionnées
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map((seat) => (
                        <span
                          key={seat}
                          className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg 
                         text-sm font-medium border border-orange-500/20"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-300 font-medium">
                      Total
                    </span>
                    <span
                      className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 
                         bg-clip-text text-transparent"
                    >
                      {trip?.price * passengers.length +
                        (trip?.isVip ? 2000 : 0)}{" "}
                      FCFA
                    </span>
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!passengers.every(p => 
                    p.firstName && 
                    p.lastName && 
                    p.email && 
                    p.phone && 
                    p.idNumber
                  ) || selectedSeats.length !== passengers.length}
                  className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 
                 rounded-xl text-white font-semibold shadow-lg shadow-orange-500/25
                 hover:shadow-orange-500/40 transition-all duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center gap-3"
                >
                  <CreditCard className="w-5 h-5" />
                  Procéder au paiement
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
