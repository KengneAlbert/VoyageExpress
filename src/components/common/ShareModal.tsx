import React from "react";
import { motion } from "framer-motion";
import { X, Link2, Facebook, Twitter, MessageCircle, Mail } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  onShare?: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  onShare,
}) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareOptions = [
    {
      name: "Copier le lien",
      icon: Link2,
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          const toast = document.createElement("div");
          toast.className =
            "fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg";
          toast.textContent = "Lien copié !";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2000);
          if (onShare) onShare();
        } catch (err) {
          console.error("Erreur lors de la copie:", err);
        }
      },
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        );
        if (onShare) onShare();
      },
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        );
        if (onShare) onShare();
      },
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => {
        window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`);
        if (onShare) onShare();
      },
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      name: "Email",
      icon: Mail,
      action: () => {
        window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`);
        if (onShare) onShare();
      },
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white
                   rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">Partager</h3>

        <div className="grid grid-cols-2 gap-4">
          {shareOptions.map((option) => (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={option.action}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl
                        text-white transition-all duration-200 ${option.color}`}
            >
              <option.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{option.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;
