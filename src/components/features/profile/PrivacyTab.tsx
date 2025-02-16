import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Shield,
  UserCircle,
  Bell,
  Trash,
  Download,
  History,
  Database,
} from "lucide-react";
import { useNotifications } from "../../../context/NotificationsContext";

const PrivacyTab = () => {
  const { showNotification } = useNotifications();
  const [settings, setSettings] = useState({
    profileVisibility: true,
    emailNotifications: true,
    travelHistory: false,
    locationSharing: false,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      showNotification(
        `Paramètre ${setting} ${newSettings[setting] ? "activé" : "désactivé"}`,
        "success"
      );
      return newSettings;
    });
  };

  const handleDataExport = async () => {
    try {
      showNotification("Préparation de vos données...", "info");
      // Simuler un délai d'export
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showNotification(
        "Vos données sont prêtes à être téléchargées",
        "success"
      );

      // Simuler un téléchargement
      const dummyLink = document.createElement("a");
      dummyLink.download = "mes-donnees.json";
      dummyLink.click();
    } catch (error) {
      showNotification("Erreur lors de l'export des données", "error");
    }
  };

  const handleAccountDeletion = async () => {
    if (deleteConfirmation !== "SUPPRIMER") {
      showNotification("Veuillez saisir SUPPRIMER pour confirmer", "warning");
      return;
    }

    try {
      // Simulation de suppression
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showNotification("Compte supprimé avec succès", "success");
      setIsDeleteModalOpen(false);
    } catch (error) {
      showNotification("Erreur lors de la suppression du compte", "error");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Paramètres de confidentialité
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              id: "profileVisibility",
              icon: UserCircle,
              title: "Visibilité du profil",
              description: "Autoriser les autres voyageurs à voir votre profil",
            },
            {
              id: "emailNotifications",
              icon: Bell,
              title: "Notifications par email",
              description: "Recevoir des notifications sur vos réservations",
            },
            {
              id: "travelHistory",
              icon: Shield,
              title: "Historique des voyages",
              description: "Rendre votre historique de voyages visible",
            },
            {
              id: "locationSharing",
              icon: Lock,
              title: "Partage de localisation",
              description: "Partager votre position pendant les voyages",
            },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <setting.icon className="w-5 h-5 text-orange-400" />
                <div>
                  <h3 className="text-white font-medium">{setting.title}</h3>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings[setting.id as keyof typeof settings]}
                  onChange={() =>
                    handleToggle(setting.id as keyof typeof settings)
                  }
                />
                <div
                  className="w-11 h-6 bg-gray-700 rounded-full peer 
                            peer-checked:after:translate-x-full peer-checked:bg-orange-500
                            after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                            after:bg-white after:rounded-full after:h-5 after:w-5
                            after:transition-all"
                ></div>
              </label>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <History className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Historique et traçage
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <h3 className="text-white font-medium">
                Historique de navigation
              </h3>
              <p className="text-sm text-gray-400">
                Effacer votre historique de recherche et de navigation
              </p>
            </div>
            <button
              onClick={() => {
                showNotification("Historique effacé avec succès", "success");
              }}
              className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              Effacer
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Gestion des données
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="text-white font-medium mb-2">Export de données</h3>
            <p className="text-sm text-gray-400 mb-4">
              Téléchargez une copie de vos données personnelles au format JSON
            </p>
            <button
              onClick={handleDataExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporter mes données
            </button>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h3 className="text-red-400 font-medium mb-2">Zone dangereuse</h3>
            <p className="text-sm text-gray-400 mb-4">
              La suppression de votre compte est irréversible
            </p>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <Trash className="w-4 h-4" />
              Supprimer mon compte
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* ...Modal content... */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivacyTab;
