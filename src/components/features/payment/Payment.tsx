import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Phone,
  Wallet,
  Lock,
  Shield,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

// Payment method icons
import orangeMoneyLogo from "../../../assets/images/orange_money.jpg";
import mtnMoneyLogo from "../../../assets/images/mtn-momo.png";
import stripeLogo from "../../../assets/images/playstore.png";
import paypalLogo from "../../../assets/images/playstore.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const paymentMethods = [
  {
    id: "orange-money",
    name: "Orange Money",
    logo: orangeMoneyLogo,
    icon: <Phone className="w-5 h-5" />,
    type: "mobile",
  },
  {
    id: "mtn-momo",
    name: "MTN Mobile Money",
    logo: mtnMoneyLogo,
    icon: <Phone className="w-5 h-5" />,
    type: "mobile",
  },
  {
    id: "stripe",
    name: "Carte bancaire",
    logo: stripeLogo,
    icon: <CreditCard className="w-5 h-5" />,
    type: "card",
  },
  {
    id: "paypal",
    name: "PayPal",
    logo: paypalLogo,
    icon: <Wallet className="w-5 h-5" />,
    type: "digital",
  },
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Correction du formatage de la date
      const formattedBookingData = {
        ...bookingData,
        trip: {
          ...bookingData.trip,
          date: bookingData.trip.date
            ? new Date(bookingData.trip.date).toISOString()
            : new Date().toISOString(),
        },
      };

      // Simulation du délai de paiement
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigation vers la page de succès
      navigate("/payment-success", {
        state: { bookingData: formattedBookingData },
        replace: true,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      // Gestion des erreurs si nécessaire
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400
                     rounded-full border border-green-500/20"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Paiement 100% Sécurisé</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          {/* Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Payment Methods Grid */}
            <div
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                          rounded-2xl border border-white/10 shadow-xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-700/50">
                <h2
                  className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 
                             bg-clip-text text-transparent"
                >
                  Choisissez votre mode de paiement
                </h2>
                <p className="mt-2 text-gray-400">
                  Sélectionnez votre méthode de paiement préférée
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative p-6 rounded-xl border transition-all duration-300
                              ${
                                selectedMethod === method.id
                                  ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/10"
                                  : "bg-gray-800/50 border-gray-700 hover:bg-gray-800/80"
                              }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-lg bg-gray-800/50 p-2 
                                    flex items-center justify-center"
                        >
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {method.type === "mobile" && "Paiement mobile"}
                            {method.type === "card" && "Paiement par carte"}
                            {method.type === "digital" &&
                              "Portefeuille numérique"}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle className="w-5 h-5 text-orange-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Security Features */}
              <div className="px-8 pb-8 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">Cryptage SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm">Données sécurisées</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Forms */}
            {/* Mobile Money Form */}
            {(selectedMethod === "orange-money" ||
              selectedMethod === "mtn-momo") && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handlePayment}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+237 6XX XXX XXX"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isProcessing || !formData.phoneNumber}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                          rounded-lg text-white font-medium shadow-lg flex items-center justify-center gap-2
                          disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Payer {bookingData?.totalPrice} FCFA</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* Credit Card Form */}
            {selectedMethod === "stripe" && (
              <Elements stripe={stripePromise}>
                <StripeForm
                  onSubmit={handlePayment}
                  isProcessing={isProcessing}
                />
              </Elements>
            )}

            {/* PayPal Button */}
            {selectedMethod === "stripe" && (
              <div className="mt-8">{/* PayPal button will go here */}</div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                          rounded-2xl border border-white/10 shadow-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                Résumé de la commande
              </h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={bookingData?.trip?.logo}
                        alt={bookingData?.trip?.agency}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {bookingData?.trip?.agency}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{bookingData?.trip?.departure.city}</span>
                        <span>→</span>
                        <span>{bookingData?.trip?.destination.city}</span>
                        {bookingData?.tripType?.isRoundTrip && (
                          <span className="text-orange-400 ml-2">(A/R)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-400">
                    <span>Passagers</span>
                    <span>{bookingData?.passengers?.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Places</span>
                    <span>{bookingData?.selectedSeats?.join(", ")}</span>
                  </div>
                  <div className="flex justify-between text-white font-medium pt-3 border-t border-gray-800">
                    <span>
                      Total {bookingData?.tripType?.isRoundTrip ? "(A/R)" : ""}
                    </span>
                    <span className="text-orange-400">
                      {bookingData?.totalPrice} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
