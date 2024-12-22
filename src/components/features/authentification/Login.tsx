import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Handle login logic
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
        title="Bon retour!"
        subtitle="Nous sommes ravis de vous revoir"
        imageSrc="/src/assets/images/auth-bg.jpg"
      >
        <div className="flex flex-col items-left w-full">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
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

            {/* Password Input */}
            <div className="w-full">
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  Mot de passe oublié?
                </Link>
              </div>
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-700 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Se souvenir de moi
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white font-medium rounded-lg shadow-lg shadow-orange-500/20
                     hover:shadow-orange-500/30 transition-all disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </motion.button>

            <p className="text-center text-sm text-gray-400">
              Pas encore de compte?{" "}
              <Link
                to="/register"
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;
