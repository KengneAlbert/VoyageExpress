import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { SOCIAL_LINKS } from "../../utils/constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="src\assets\logove.jpg"
                alt="VoyageExpress Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-white">
                VoyageExpress
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour des voyages confortables et
              sécurisés à travers le Cameroun.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.facebook}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">
              Liens Rapides
            </h3>
            <ul className="space-y-4">
              {["Accueil", "Agences", "Mes Billets", "Contact", "Aide"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-orange-400" />
                <span>123 Rue Principale, Douala, Cameroun</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-orange-400" />
                <span>+237 123 456 789</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-orange-400" />
                <span>contact@voyageexpress.cm</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Clock className="w-5 h-5 mr-3 text-orange-400" />
                <span>Lun - Dim: 7h00 - 17h00</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Légal</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  Conditions générales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} VoyageExpress. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
