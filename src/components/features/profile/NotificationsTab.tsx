import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Info,
  AlertTriangle,
  Check,
  Search,
  Trash2,
  CheckCheck,
  X,
} from "lucide-react";
import { useNotifications } from "../../../context/NotificationsContext";

interface Notification {
  id: string;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  link?: string;
}

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Réservation confirmée",
      message: "Votre voyage Douala → Yaoundé a été confirmé",
      date: "2024-02-20T10:00:00",
      isRead: false,
      link: "/mes-billets",
    },
    {
      id: "2",
      type: "info",
      title: "Points de fidélité",
      message: "Vous avez gagné 50 points de fidélité",
      date: "2024-02-19T15:30:00",
      isRead: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Rappel de voyage",
      message: "Votre voyage est prévu dans 24 heures",
      date: "2024-02-18T09:00:00",
      isRead: true,
    },
  ]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.isRead) ||
      (filter === "read" && notification.isRead);

    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || notification.type === selectedType;

    return matchesFilter && matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-orange-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Supprimer toutes les notifications"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setNotifications(
                  notifications.map((n) => ({ ...n, isRead: true }))
                )
              }
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Tout marquer comme lu
            </button>
          </div>
        </div>

        {/* Barre de filtres et recherche */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "unread" | "read")
              }
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Tous</option>
              <option value="unread">Non lus</option>
              <option value="read">Lus</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                       focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Tous les types</option>
              <option value="success">Succès</option>
              <option value="info">Information</option>
              <option value="warning">Avertissement</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
              className={`p-4 rounded-xl border transition-all duration-200 
                         ${
                           !notification.isRead
                             ? "bg-gray-800/80 border-orange-500/50 shadow-lg shadow-orange-500/10"
                             : "bg-gray-800/40 border-gray-700/50"
                         }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {formatDate(notification.date)}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300">{notification.message}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {notification.link && (
                      <a
                        href={notification.link}
                        className="text-sm text-orange-400 hover:text-orange-300"
                      >
                        Voir les détails
                      </a>
                    )}
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-gray-400 hover:text-white"
                      >
                        Marquer comme lu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p>Aucune notification ne correspond à vos critères</p>
          </motion.div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <AnimatePresence>
        {showDeleteConfirm && (
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
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Supprimer toutes les notifications ?
              </h3>
              <p className="text-gray-400 mb-6">
                Cette action est irréversible. Voulez-vous continuer ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    setNotifications([]);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsTab;
