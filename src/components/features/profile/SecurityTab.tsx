import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  Smartphone,
  Key,
  History,
  ChevronDown,
  AlertOctagon,
  FileWarning,
  Laptop, // Remplacer Devices par Laptop
  Monitor, // Ajouter Monitor pour les appareils desktop
} from "lucide-react";
import { useNotifications } from "../../../context/NotificationsContext";

const SecurityTab = () => {
  const { showNotification } = useNotifications();
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Nouveaux états
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [recentActivities] = useState([
    {
      id: 1,
      action: "Connexion réussie",
      device: "iPhone 13",
      location: "Douala, Cameroun",
      date: "2024-02-20T10:30:00",
      status: "success",
    },
    {
      id: 2,
      action: "Tentative de connexion échouée",
      device: "Windows PC",
      location: "Yaoundé, Cameroun",
      date: "2024-02-19T15:45:00",
      status: "error",
    },
    // Plus d'activités...
  ]);

  const [securityAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Connexion inhabituelle détectée",
      message: "Une connexion depuis un nouvel appareil a été détectée",
      date: "2024-02-21T08:30:00",
    },
    {
      id: 2,
      type: "alert",
      title: "Tentatives de connexion multiples",
      message: "3 tentatives de connexion échouées",
      date: "2024-02-20T15:45:00",
    },
  ]);

  const [connectedDevices] = useState([
    {
      id: 1,
      name: "iPhone 13",
      type: "mobile",
      lastActive: "2024-02-21T10:00:00",
      location: "Douala, Cameroun",
      browser: "Safari",
      isCurrentDevice: true,
    },
    {
      id: 2,
      name: "Windows PC",
      type: "desktop",
      lastActive: "2024-02-20T14:30:00",
      location: "Yaoundé, Cameroun",
      browser: "Chrome",
      isCurrentDevice: false,
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      showNotification("Veuillez remplir tous les champs", "warning");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification("Les mots de passe ne correspondent pas", "error");
      return;
    }

    try {
      // Simulation d'appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification("Mot de passe modifié avec succès", "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showNotification("Erreur lors du changement de mot de passe", "error");
    }
  };

  const handle2FAToggle = async () => {
    try {
      // Simulation d'activation/désactivation 2FA
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIs2FAEnabled((prev) => !prev);
      showNotification(
        `Authentification à deux facteurs ${
          !is2FAEnabled ? "activée" : "désactivée"
        }`,
        "success"
      );
    } catch (error) {
      showNotification(
        "Erreur lors de la modification des paramètres 2FA",
        "error"
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Mot de passe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        {/* En-tête avec bouton toggle */}
        <button
          onClick={() => setIsPasswordFormOpen(!isPasswordFormOpen)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">
              Changer le mot de passe
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200
            ${isPasswordFormOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Formulaire déroulant */}
        <AnimatePresence>
          {isPasswordFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* Mot de passe actuel */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Nouveau mot de passe */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirmer le mot de passe */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      })
                    }
                    className="px-4 py-2 text-gray-400 hover:text-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Mettre à jour
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Section 2FA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">
              Authentification à deux facteurs
            </h2>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={is2FAEnabled}
              onChange={handle2FAToggle}
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

        <div className="space-y-4">
          <p className="text-gray-300">
            L'authentification à deux facteurs ajoute une couche de sécurité
            supplémentaire à votre compte.
          </p>
          {is2FAEnabled ? (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium mb-1">
                    2FA est activé
                  </h3>
                  <p className="text-sm text-gray-400">
                    Votre compte est protégé par l'authentification à deux
                    facteurs.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium mb-1">
                    2FA n'est pas activé
                  </h3>
                  <p className="text-sm text-gray-400">
                    Activez l'authentification à deux facteurs pour plus de
                    sécurité.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Section Activités récentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <History className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Activités récentes
          </h2>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg
                       bg-gray-800/50 border border-gray-700/50"
            >
              <div
                className={`p-2 rounded-full ${
                  activity.status === "success"
                    ? "bg-green-500/10"
                    : "bg-red-500/10"
                }`}
              >
                {activity.status === "success" ? (
                  <Shield className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium">{activity.action}</h3>
                  <span className="text-sm text-gray-400">
                    {formatDate(activity.date)}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {activity.device} • {activity.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section Alertes de Sécurité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertOctagon className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Alertes de Sécurité
          </h2>
        </div>

        <div className="space-y-4">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
            >
              <div className="flex items-start gap-3">
                <FileWarning className="w-5 h-5 text-red-400 mt-1" />
                <div>
                  <h3 className="text-white font-medium mb-1">{alert.title}</h3>
                  <p className="text-sm text-gray-400">{alert.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {formatDate(alert.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section Appareils Connectés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Laptop className="w-5 h-5 text-orange-400" />{" "}
          {/* Remplacer Devices par Laptop */}
          <h2 className="text-lg font-semibold text-white">
            Appareils Connectés
          </h2>
        </div>

        <div className="space-y-4">
          {connectedDevices.map((device) => (
            <div
              key={device.id}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  {device.type === "mobile" ? (
                    <Smartphone className="w-5 h-5 text-orange-400 mt-1" />
                  ) : (
                    <Monitor className="w-5 h-5 text-orange-400 mt-1" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{device.name}</h3>
                      {device.isCurrentDevice && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Appareil actuel
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">
                      {device.browser} • {device.location}
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      Dernière activité : {formatDate(device.lastActive)}
                    </span>
                  </div>
                </div>
                {!device.isCurrentDevice && (
                  <button
                    onClick={() => {
                      showNotification(
                        "Appareil déconnecté avec succès",
                        "success"
                      );
                    }}
                    className="px-3 py-1 text-sm text-red-400 hover:text-red-300"
                  >
                    Déconnecter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityTab;
