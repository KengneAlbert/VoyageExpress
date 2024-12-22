import { CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { FormEvent } from 'react';
import { Lock } from 'lucide-react';

const StripeForm = ({ onSubmit, isProcessing }: { onSubmit: (e: FormEvent<HTMLFormElement>) => void, isProcessing: boolean }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="mt-8 space-y-6"
    >
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#fff',
                '::placeholder': {
                  color: '#9CA3AF',
                },
              },
            },
          }}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isProcessing}
        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                 rounded-lg text-white font-medium shadow-lg flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Traitement en cours...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            <span>Payer avec Stripe</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default StripeForm;