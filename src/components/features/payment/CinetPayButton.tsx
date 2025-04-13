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

const CinetPayButton: React.FC<CinetPayButtonProps> = ({
  amount,
  reservationId,
  customerInfo,
  onSuccess,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPayment] = useConfirmPaymentMutation();

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // @ts-ignore - CinetPay is loaded from CDN
      window.CinetPay.setConfig({
        apikey: import.meta.env.VITE_CINETPAY_APIKEY,
        site_id: import.meta.env.VITE_CINETPAY_SITE_ID,
        notify_url: import.meta.env.VITE_CINETPAY_NOTIFY_URL,
        mode: 'PRODUCTION'
      });

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
        customer_address : "",
        customer_city: "",
        customer_country : "CM",
        customer_state : "CM",
        customer_zip_code : ""
      });

      // @ts-ignore
      window.CinetPay.waitResponse((data: any) => {
        if (data.status === "REFUSED") {
          setError("Le paiement a échoué");
          onError("Payment refused");
        } else if (data.status === "ACCEPTED") {
          onSuccess();
        }
      });

      // @ts-ignore
      window.CinetPay.onError((error: any) => {
        setError("Une erreur s'est produite");
        onError(error?.message || "Payment error");
      });
    } catch (error) {
      setError("Une erreur s'est produite");
      onError("Payment initialization failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg"
        ></motion.div>
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                  rounded-xl text-white font-medium shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <></>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Traitement en cours...</span>
          </>
        ) : (
          <span>Payer maintenant avec CinetPay</span>
        )}
      </motion.button>
    </div>
  );
};

export default CinetPayButton;
