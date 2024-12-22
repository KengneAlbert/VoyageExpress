import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Phone, Mail, MessageCircle } from 'lucide-react';

const FAQ_SECTIONS = [
  {
    title: "Réservation",
    questions: [
      {
        q: "Comment réserver un billet ?",
        a: "Pour réserver un billet, sélectionnez votre trajet, choisissez une date et le nombre de passagers. Suivez ensuite les étapes de paiement pour confirmer votre réservation."
      },
      {
        q: "Puis-je annuler ma réservation ?",
        a: "Oui, vous pouvez annuler votre réservation jusqu'à 24h avant le départ. Des frais d'annulation peuvent s'appliquer."
      }
    ]
  },
  {
    title: "Paiement",
    questions: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons les paiements par carte bancaire, Mobile Money (Orange Money, MTN Mobile Money) et en espèces dans nos agences."
      }
    ]
  },
  {
    title: "Voyage",
    questions: [
      {
        q: "Quelle est la politique des bagages ?",
        a: "Chaque passager a droit à un bagage en soute et un bagage à main. Le poids total ne doit pas excéder 30kg."
      }
    ]
  }
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);

  const filteredFAQ = FAQ_SECTIONS.map(section => ({
    ...section,
    questions: section.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Comment pouvons-nous <span className="text-orange-400">vous aider ?</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une question..."
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredFAQ.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenSection(openSection === section.title ? null : section.title)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                {openSection === section.title ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {openSection === section.title && (
                <div className="px-6 pb-6 space-y-4">
                  {section.questions.map((qa, index) => (
                    <div key={index} className="border-t border-gray-800 pt-4">
                      <h3 className="text-white font-medium mb-2">{qa.q}</h3>
                      <p className="text-gray-400">{qa.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+237655555555"
            className="flex flex-col items-center p-6 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors"
          >
            <Phone className="h-8 w-8 text-orange-400 mb-3" />
            <h3 className="text-white font-medium">Appelez-nous</h3>
            <p className="text-gray-400 text-sm">+237 655 555 555</p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:support@voyageexpress.cm"
            className="flex flex-col items-center p-6 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors"
          >
            <Mail className="h-8 w-8 text-orange-400 mb-3" />
            <h3 className="text-white font-medium">Envoyez-nous un email</h3>
            <p className="text-gray-400 text-sm">support@voyageexpress.cm</p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#chat"
            className="flex flex-col items-center p-6 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800/50 hover:bg-gray-800/50 transition-colors"
          >
            <MessageCircle className="h-8 w-8 text-orange-400 mb-3" />
            <h3 className="text-white font-medium">Chat en direct</h3>
            <p className="text-gray-400 text-sm">Disponible 24/7</p>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Help;