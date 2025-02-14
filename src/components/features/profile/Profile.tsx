import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Calendar,
  Clock,
  Star,
  X,
  AlertTriangle,
} from "lucide-react";

interface ProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    photoURL?: string;
  };
}

const Profile = ({ user }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile', 'security', 'privacy'
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = () => {
    // Here you would typically make an API call to update the user password
    alert("Password changed successfully!");
    setIsEditingPassword(false);
  };

  const [isTravelHistoryVisible, setIsTravelHistoryVisible] = useState(false);
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] =
    useState(true);

  const handlePrivacySettingsChange = () => {
    // Here you would typically make an API call to update the user privacy settings
    console.log({ isTravelHistoryVisible, isEmailNotificationsEnabled });
    alert("Privacy settings updated successfully!");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "", // Add default or fetch if available
    address: "", // Add default or fetch if available
    profilePicture: user?.photoURL || "/default-avatar.png",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user data
    setIsEditing(false);
    // Update user data in the parent component or context
  };

  // Add review options
  const REVIEW_OPTIONS = [
    {
      id: "speed",
      label: "Excès de vitesse",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: "overtaking",
      label: "Mauvais dépassements",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: "stops",
      label: "Trop d'arrêts",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "comfort",
      label: "Manque de confort",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: "delay",
      label: "Retard important",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "other",
      label: "Autre",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  ];

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const [isTripDetailsModalOpen, setIsTripDetailsModalOpen] = useState(false);
  const [selectedTripDetails, setSelectedTripDetails] = useState<{
    id: number;
    departure: string;
    destination: string;
    date: string;
    time: string;
    price: number;
    status: string;
    agencyLogo: string;
  } | null>(null);

  const trips = [
    {
      id: 1,
      departure: "Douala",
      destination: "Yaoundé",
      date: "2024-03-15",
      time: "08:00",
      price: 5000,
      status: "upcoming",
      agencyLogo: "/src/assets/logove.jpg",
    },
    {
      id: 2,
      departure: "Yaoundé",
      destination: "Douala",
      date: "2024-02-15",
      time: "10:00",
      price: 5000,
      status: "past",
      agencyLogo: "/src/assets/logove.jpg",
    },
  ];

  const handleReviewSubmit = () => {
    // Handle review submission
    console.log({ tripId: selectedTrip, reviews: selectedReviews, comment });
    setIsReviewModalOpen(false);
    setSelectedReviews([]);
    setComment("");
  };

  const ReviewModal = () => (
    <AnimatePresence>
      {isReviewModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Évaluer votre voyage
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">
                  Sélectionnez vos critiques
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {REVIEW_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setSelectedReviews((prev) =>
                          prev.includes(option.id)
                            ? prev.filter((id) => id !== option.id)
                            : [...prev, option.id]
                        )
                      }
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors
                                ${
                                  selectedReviews.includes(option.id)
                                    ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                                    : "border-gray-700 text-gray-400 hover:border-gray-600"
                                }`}
                    >
                      {option.icon}
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Commentaire additionnel
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-orange-500 resize-none"
                  rows={4}
                  placeholder="Décrivez votre expérience..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReviewSubmit}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const TripDetailsModal = () => (
    <AnimatePresence>
      {isTripDetailsModalOpen && selectedTripDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Détails du voyage
              </h3>
              <button
                onClick={() => setIsTripDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-800">
                <img
                  src={selectedTripDetails.agencyLogo}
                  alt="Agency"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-lg font-medium text-white">
                    {selectedTripDetails.departure} →{" "}
                    {selectedTripDetails.destination}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-2
                                ${
                                  selectedTripDetails.status === "upcoming"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }`}
                  >
                    {selectedTripDetails.status === "upcoming"
                      ? "À venir"
                      : "Passé"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white">
                    {new Date(selectedTripDetails.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Heure</p>
                  <p className="text-white">{selectedTripDetails.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Prix</p>
                  <p className="text-orange-400 font-medium">
                    {selectedTripDetails.price} FCFA
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Siège</p>
                  <p className="text-white">A12</p>
                </div>
              </div>

              {selectedTripDetails.status === "past" && (
                <div className="pt-4 border-t border-gray-800">
                  <button
                    onClick={() => {
                      setIsTripDetailsModalOpen(false);
                      setSelectedTrip(selectedTripDetails.id);
                      setIsReviewModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600
                             flex items-center justify-center gap-2"
                  >
                    <Star className="w-5 h-5" />
                    Évaluer ce voyage
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderSecuritySettings = () => (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Sécurité</h3>
        <button
          onClick={() => setIsEditingPassword(!isEditingPassword)}
          className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          <span>Changer le mot de passe</span>
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Mot de passe actuel
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsEditingPassword(false)}
            className="px-4 py-2 text-gray-400 hover:text-gray-300"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={handleChangePassword}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Confidentialité
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Historique des voyages visible</p>
              <p className="text-sm text-gray-400">
                Autoriser les autres à voir votre historique
              </p>
            </div>
            <div>
              <p className="text-gray-300">Historique des voyages visible</p>
              <p className="text-sm text-gray-400">
                Autoriser les autres à voir votre historique
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isTravelHistoryVisible}
                onChange={() => {
                  setIsTravelHistoryVisible(!isTravelHistoryVisible);
                  handlePrivacySettingsChange();
                }}
              />
              <div
                className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
                          peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-0.5 
                          after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                          after:transition-all"
              ></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300">Notifications par email</p>
              <p className="text-sm text-gray-400">
                Recevoir des notifications sur vos réservations
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isEmailNotificationsEnabled}
                onChange={() => {
                  setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled);
                  handlePrivacySettingsChange();
                }}
                defaultChecked
              />
              <div
                className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
                          peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-0.5 
                          after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 
                          after:transition-all"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Données personnelles
        </h3>
        <div className="space-y-4">
          <p className="text-gray-400">
            Vous pouvez demander une copie de vos données personnelles ou leur
            suppression.
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-orange-400 hover:text-orange-300">
              Exporter mes données
            </button>
            <button className="px-4 py-2 text-red-400 hover:text-red-300">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">
          Informations personnelles
        </h3>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isEditing ? (
          // Display Mode
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Nom complet
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <UserCircle className="w-5 h-5 text-orange-400" />
                <span className="text-white">{user?.name}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-white">{user?.email}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Téléphone
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-white">{user?.phone}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Adresse
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-white">{user?.address}</span>
              </div>
            </div>
          </>
        ) : (
          // Edit Mode
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Adresse
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="text"
                  value={editedData.address}
                  onChange={(e) =>
                    setEditedData({ ...editedData, address: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-gray-400 hover:text-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Sauvegarder
          </button>
        </div>
      )}
    </div>
  );

  const renderRecentTravels = () => (
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Voyages récents</h3>
      <div className="space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <img
                src={trip.agencyLogo}
                alt="Agency"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-white font-medium flex items-center gap-2">
                  {trip.departure} → {trip.destination}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                                ${
                                  trip.status === "upcoming"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }`}
                  >
                    {trip.status === "upcoming" ? "À venir" : "Passé"}
                  </span>
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(trip.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{trip.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-orange-400 font-medium">
                {trip.price} FCFA
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedTripDetails(trip);
                    setIsTripDetailsModalOpen(true);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50"
                >
                  Voir détails
                </button>
                {trip.status === "past" && (
                  <button
                    onClick={() => {
                      setSelectedTrip(trip.id);
                      setIsReviewModalOpen(true);
                    }}
                    className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20
                             flex items-center gap-2 transition-colors"
                  >
                    <Star className="w-5 h-5" />
                    Évaluer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                    rounded-2xl border border-white/10 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-500/50">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full 
                              shadow-lg group-hover:bg-orange-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-white mb-2">
                {user?.name}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">12</p>
                <p className="text-sm text-gray-400">Voyages</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">4.8</p>
                <p className="text-sm text-gray-400">Note</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">3</p>
                <p className="text-sm text-gray-400">Réservations</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 mt-8 border-t border-gray-800 pt-8">
            {["Profile", "Sécurité", "Confidentialité"].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.toLowerCase()
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Profile Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {activeTab === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
                {/* Profile Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Quick Stats */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Statistiques
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Voyages effectués</span>
                        <span className="text-white font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Points fidélité</span>
                        <span className="text-orange-400 font-medium">
                          350 pts
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {renderPersonalInfo()}

                  {/* Recent Travels */}
                  {renderRecentTravels()}
                </motion.div>
              </div>
            )}

            {activeTab === "security" && renderSecuritySettings()}
            {activeTab === "privacy" && renderPrivacySettings()}
          </motion.div>
        </AnimatePresence>
      </div>
      <ReviewModal />
      <TripDetailsModal />
    </div>
  );
};

export default Profile;
