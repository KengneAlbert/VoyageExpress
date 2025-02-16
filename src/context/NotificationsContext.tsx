import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertTriangle, X } from "lucide-react";

type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationsContextType {
  showNotification: (
    message: string,
    type: NotificationType,
    duration?: number
  ) => void;
  clearNotification: (id: string) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: NotificationType, duration = 5000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setNotifications((prev) => [...prev, { id, type, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          clearNotification(id);
        }, duration);
      }
    },
    []
  );

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "error":
        return <X className="w-5 h-5 text-red-400" />;
    }
  };

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/50 text-green-400";
      case "info":
        return "bg-blue-500/10 border-blue-500/50 text-blue-400";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/50 text-yellow-400";
      case "error":
        return "bg-red-500/10 border-red-500/50 text-red-400";
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ showNotification, clearNotification }}
    >
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`p-4 rounded-xl border backdrop-blur-lg shadow-lg 
                         flex items-center gap-3 min-w-[300px] max-w-md
                         ${getNotificationStyles(notification.type)}`}
            >
              {getNotificationIcon(notification.type)}
              <p className="flex-1">{notification.message}</p>
              <button
                onClick={() => clearNotification(notification.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationsContext.Provider>
  );
};

export { useNotifications, NotificationsProvider };
