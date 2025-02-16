import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Loader, PartyPopper } from "lucide-react";
import { useNotifications } from "../../../context/NotificationsContext";

const RatingTab = () => {
  const { showNotification } = useNotifications();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const improvementOptions = [
    "Interface utilisateur",
    "Performance",
    "Réservation",
    "Support client",
    "Prix",
    "Notifications",
    "Options de paiement",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      showNotification("Veuillez donner une note", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Afficher l'animation de succès
      setShowSuccess(true);
      showNotification("Merci pour votre retour !", "success");

      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        setRating(0);
        setFeedback("");
        setImprovements([]);
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      showNotification("Une erreur est survenue", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-green-500/20 p-8 
                     text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <PartyPopper className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white">
              Merci pour votre évaluation !
            </h3>
            <p className="text-gray-400">
              Votre retour nous aide à nous améliorer
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                Noter VoyageExpress
              </h3>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(rating)}
                      className="transform transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hover || rating)
                            ? "fill-orange-400 text-orange-400"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-gray-400">
                  {rating === 0
                    ? "Sélectionnez une note"
                    : `Vous avez donné ${rating} étoile${
                        rating > 1 ? "s" : ""
                      }`}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Que pouvons-nous améliorer ?
              </h3>
              <div className="flex flex-wrap gap-3">
                {improvementOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setImprovements((prev) =>
                        prev.includes(option)
                          ? prev.filter((item) => item !== option)
                          : [...prev, option]
                      );
                    }}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      improvements.includes(option)
                        ? "bg-orange-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Votre retour
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Partagez votre expérience avec nous..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-orange-500 resize-none min-h-[120px]
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={!rating || isSubmitting}
                    className={`px-6 py-2 rounded-lg flex items-center gap-2 
                             ${
                               rating && !isSubmitting
                                 ? "bg-orange-500 hover:bg-orange-600 text-white"
                                 : "bg-gray-700 text-gray-400 cursor-not-allowed"
                             }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatingTab;
