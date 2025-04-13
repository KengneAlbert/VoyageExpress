import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentErrorProps {
  message: string;
  onRetry?: () => void;
}

const PaymentError: React.FC<PaymentErrorProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-red-500 font-medium mb-1">
            Erreur de paiement
          </h3>
          <p className="text-red-400 text-sm">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Réessayer
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentError;
