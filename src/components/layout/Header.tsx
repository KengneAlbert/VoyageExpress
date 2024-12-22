import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./Navigation";
import LanguageSelector from "./LanguageSelector";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("FR");

  const languages = [
    { code: "FR", label: "Français" },
    { code: "EN", label: "English" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 min-w-[200px]">
            <img
              src="/src/statics/logove.jpg"
              alt="Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-orange-500"
            />
            <span className="text-lg sm:text-xl font-bold text-white truncate">
              VoyageExpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Mobile Menu Controls */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-300 hover:text-white rounded-md"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{currentLanguage}</span>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        {currentLanguage === lang.code && (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSelector />

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white rounded-lg
                           bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800
                           border border-white/10 hover:border-white/20
                           transition-all duration-300 hover:shadow-md hover:shadow-white/5
                           group"
              >
                <span className="relative z-10">Connexion</span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-0 
                              group-hover:opacity-100 rounded-lg blur transition-opacity"
                />
              </Link>

              <Link
                to="/register"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white rounded-lg
                           bg-gradient-to-r from-orange-500 to-orange-600
                           hover:from-orange-600 hover:to-orange-700
                           transition-all duration-300
                           transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <span className="relative z-10">Inscription</span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 
                              group-hover:opacity-100 rounded-lg blur transition-opacity"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/10"
          >
            <Navigation isMobile />
            <div className="p-4 flex flex-col space-y-3">
              <Link
                to="/login"
                className="relative w-full text-center px-4 py-2.5 text-sm font-medium text-white rounded-lg
                           bg-gradient-to-r from-gray-800 to-gray-900 
                           border border-white/10 hover:border-white/20
                           transition-all duration-300"
              >
                Connexion
              </Link>
              <Link
                to="/signup"
                className="relative w-full text-center px-4 py-2.5 text-sm font-medium text-white rounded-lg
                           bg-gradient-to-r from-orange-500 to-orange-600
                           hover:from-orange-600 hover:to-orange-700
                           transition-all duration-300"
              >
                Inscription
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
