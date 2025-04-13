import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../../services/api/authApi';

const OtpInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (newValue.length <= 1) {
      const newOtp = value.split('');
      newOtp[index] = newValue;
      onChange(newOtp.join(''));
      
      if (newValue.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array(6).fill(0).map((_, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-2xl font-bold bg-gray-800/50 border border-gray-700 
                   rounded-lg text-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400 
                   transition-all"
        />
      ))}
    </div>
  );
};

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

//   useEffect(() => {
//     if (!userId) {
//       navigate('/register');
//       return;
//     }

//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [userId, navigate]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Veuillez entrer un code OTP valide');
      return;
    }

    try {
      await verifyOtp({ user_id: '', otp }).unwrap();
      navigate('/');
    } catch (err) {
      setError('Code OTP invalide');
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ user_id: userId }).unwrap();
      setTimer(30);
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'envoi du code');
    }
  };

  return (
    <AuthLayout
      title="Vérification"
      subtitle="Entrez le code reçu par WhatsApp"
      imageSrc="/src/assets/images/auth-bg.jpg"
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <OtpInput value={otp} onChange={setOtp} />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleVerify}
          disabled={isVerifying || otp.length !== 6}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   rounded-lg text-white font-medium shadow-lg flex items-center 
                   justify-center gap-2 disabled:opacity-50"
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Vérification...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Vérifier</span>
            </>
          )}
        </motion.button>

        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={timer > 0 || isResending}
            className="text-orange-400 hover:text-orange-500 disabled:text-gray-500 
                     flex items-center justify-center gap-2 mx-auto"
          >
            {isResending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>
                  {timer > 0 
                    ? `Renvoyer le code dans ${timer}s` 
                    : 'Renvoyer le code'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
