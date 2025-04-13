import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../../services/api/authApi";
import AuthLayout from "./AuthLayout";

const EmailVerification = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail({ key }).unwrap();
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("error");
      }
    };

    if (key) {
      verify();
    }
  }, [key, verifyEmail, navigate]);

  return (
    <AuthLayout
      title="Vérification"
      subtitle="Verification en de votre adresse email"
      imageSrc="/src/assets/images/auth-bg.jpg"
    >
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="max-w-md mx-auto p-6 text-center">
          {status === "verifying" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Vérification en cours...
              </h2>
              <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}
          {status === "success" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Email vérifié avec succès!
              </h2>
              <p className="text-gray-400">
                Redirection vers la page de connexion...
              </p>
            </div>
          )}
          {status === "error" && (
            <div>
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Erreur de vérification
              </h2>
              <p className="text-gray-400">
                Le lien de vérification est invalide ou a expiré.
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmailVerification;
