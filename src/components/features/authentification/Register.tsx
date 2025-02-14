import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  AlertCircle,
} from "lucide-react";
import AuthLayout from "./AuthLayout";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Le nom est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Handle registration logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AuthLayout
        title="Créer un compte"
        subtitle="Rejoignez VoyageExpress aujourd'hui"
        imageSrc="src/assets/logove.jpg"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg 
                           text-white placeholder-gray-400 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           ${
                             errors.name
                               ? "border-red-500"
                               : "border-gray-700 focus:border-orange-500"
                           }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg 
                           text-white placeholder-gray-400 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           ${
                             errors.email
                               ? "border-red-500"
                               : "border-gray-700 focus:border-orange-500"
                           }`}
                    placeholder="nom@exemple.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg 
                           text-white placeholder-gray-400 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           ${
                             errors.phone
                               ? "border-red-500"
                               : "border-gray-700 focus:border-orange-500"
                           }`}
                    placeholder="+237 6XX XXX XXX"
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg 
                           text-white placeholder-gray-400 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           ${
                             errors.password
                               ? "border-red-500"
                               : "border-gray-700 focus:border-orange-500"
                           }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 text-left">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border rounded-lg 
                           text-white placeholder-gray-400 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-orange-500
                           ${
                             errors.confirmPassword
                               ? "border-red-500"
                               : "border-gray-700 focus:border-orange-500"
                           }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                       hover:shadow-orange-500/30 transition-all disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Création du compte...</span>
                  </>
                ) : (
                  <span>Créer un compte</span>
                )}
              </motion.button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-400">
                Déjà un compte?{" "}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Register;
