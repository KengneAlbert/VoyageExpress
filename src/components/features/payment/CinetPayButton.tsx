import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, AlertCircle } from 'lucide-react';
import { CinetPayService } from '../../../services/api/cinetpayService';
import { useConfirmPaymentMutation } from '../../../services/api/reservationApi';

interface CinetPayButtonProps {
  amount: number;
  reservationId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface PaymentState {
  status: 'idle' | 'loading' | 'processing' | 'success' | 'error';
  error?: string;
}

const CinetPayButton: React.FC<CinetPayButtonProps> = ({
  amount,
  reservationId,
  customerInfo,
  onSuccess,
  onError
}) => {
  const [paymentState, setPaymentState] = useState<PaymentState>({ status: 'idle' });

  const handlePayment = async () => {
    try {
      setPaymentState({ status: 'loading' });
      
      // Initialize CinetPay
      // @ts-ignore - CinetPay is loaded from CDN
      window.CinetPay.setConfig({
        apikey: import.meta.env.VITE_CINETPAY_APIKEY,
        site_id: import.meta.env.VITE_CINETPAY_SITE_ID,
        notify_url: import.meta.env.VITE_CINETPAY_NOTIFY_URL,
        mode: 'PRODUCTION'
      });

      setPaymentState({ status: 'processing' });

      // Process Payment
      // @ts-ignore
      window.CinetPay.getCheckout({
        transaction_id: `RES-${reservationId}-${Date.now()}`,
        amount,
        currency: 'XAF',
        channels: 'ALL',
        description: `Réservation #${reservationId}`,   
        customer_name: customerInfo.name.split(' ')[0],
        customer_surname: customerInfo.name.split(' ')[1] || '',
        customer_email: customerInfo.email,
        customer_phone_number: customerInfo.phone,
        customer_country: 'CM',
      });

      // Handle Response
      // @ts-ignore
      window.CinetPay.waitResponse((response: any) => {
        if (response.status === 'ACCEPTED') {
          setPaymentState({ status: 'success' });
          onSuccess();
        } else {
          setPaymentState({ 
            status: 'error', 
            error: 'Le paiement a été refusé. Veuillez réessayer.' 
          });
        }
      });

      // Handle Errors
      // @ts-ignore
      window.CinetPay.onError((error: any) => {
        setPaymentState({ 
          status: 'error', 
          error: 'Une erreur est survenue lors du paiement. Veuillez réessayer.' 
        });
        onError(error?.message || 'Payment failed');
      });

    } catch (error) {
      setPaymentState({ 
        status: 'error', 
        error: 'Une erreur inattendue est survenue. Veuillez réessayer.' 
      });
      onError('Payment initialization failed');
    }
  };

  return (
    <div className="space-y-4">
      {paymentState.status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg"
        >
          <AlertCircle className="w-5 h-5" />
          <span>{paymentState.error || 'Une erreur est survenue'}</span>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handlePayment}
        disabled={paymentState.status === 'loading' || paymentState.status === 'processing'}
        className={`w-full py-4 rounded-xl font-medium transition-all duration-300
          ${paymentState.status === 'processing' 
            ? 'bg-orange-500/50 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/20'
          }
        `}
      >
        <div className="flex items-center justify-center gap-3">
          {paymentState.status === 'loading' || paymentState.status === 'processing' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>
                {paymentState.status === 'loading' ? 'Initialisation...' : 'Traitement en cours...'}
              </span>
            </>
          ) : (
            <span>Payer maintenant avec CinetPay</span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default CinetPayButton;
