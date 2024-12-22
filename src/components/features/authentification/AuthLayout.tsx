import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  imageSrc,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Form Side */}
      <div
        className="w-full lg:w-[45%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                    p-8 lg:p-12 xl:p-20 flex items-center justify-center relative z-10"
      >
        <div className="w-full max-w-lg space-y-8 ">
          <div>
            <h2
              className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 
                         bg-clip-text text-transparent"
            >
              {title}
            </h2>
            <p className="mt-2 text-gray-400">{subtitle}</p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">{children}</div>

          {/* Social Auth Section */}
          <div className="pt-6 mt-8 border-t border-gray-800">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-400">Ou continuer avec</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 
                         bg-white hover:bg-gray-50 rounded-xl transition-all"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="text-gray-600 font-medium">Google</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 
                         bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-xl transition-all"
              >
                <FaFacebook className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Facebook</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:w-[55%] relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt="Travel"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Floating Cards */}
        <div className="absolute inset-0 flex items-center justify-center p-20">
          <div className="grid grid-cols-2 gap-8 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-white font-medium mb-2">Voyages Sécurisés</h3>
              <p className="text-gray-300 text-sm">
                Plus de 1000 voyages quotidiens en toute sécurité
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-white font-medium mb-2">
                Service Client 24/7
              </h3>
              <p className="text-gray-300 text-sm">
                Une équipe disponible pour vous assister
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
