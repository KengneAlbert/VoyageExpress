import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MessageCircle,
  Ticket,
  CreditCard,
  Bus,
  Map,
  Calendar,
  Users
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 
                       bg-clip-text text-transparent mb-4">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-gray-400 mb-8">
            Trouvez rapidement des réponses à vos questions
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 
                       rounded-2xl text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { title: "Réservation", icon: Ticket },
            { title: "Paiement", icon: CreditCard },
            { title: "Voyage", icon: Bus },
            { title: "Destinations", icon: Map },
            { title: "Horaires", icon: Calendar },
            { title: "Passagers", icon: Users }
          ].map((category, index) => (
            <motion.button
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveSection(category.title)}
              className={`p-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                       backdrop-blur-xl rounded-xl border transition-all
                       ${activeSection === category.title
                         ? 'border-orange-500 bg-orange-500/10'
                         : 'border-gray-700 hover:border-gray-600'}`}
            >
              <category.icon className={`w-6 h-6 mx-auto mb-2 
                ${activeSection === category.title ? 'text-orange-400' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium 
                ${activeSection === category.title ? 'text-orange-400' : 'text-gray-300'}`}>
                {category.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQ_SECTIONS.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                       backdrop-blur-xl rounded-xl border border-gray-700"
            >
              <button
                onClick={() => setActiveSection(
                  activeSection === section.title ? null : section.title
                )}
                className="w-full px-6 py-4 flex items-center justify-between"
              >
                <span className="text-lg font-medium text-white">{section.title}</span>
                {activeSection === section.title ? (
                  <ChevronUp className="w-5 h-5 text-orange-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              <AnimatePresence>
                {activeSection === section.title && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 space-y-4">
                      {section.questions.map((qa) => (
                        <div 
                          key={qa.q}
                          className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <button
                            onClick={() => setActiveQuestion(
                              activeQuestion === qa.q ? null : qa.q
                            )}
                            className="w-full flex items-center justify-between"
                          >
                            <span className="text-gray-200">{qa.q}</span>
                            {activeQuestion === qa.q ? (
                              <ChevronUp className="w-4 h-4 text-orange-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <AnimatePresence>
                            {activeQuestion === qa.q && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="mt-4 text-gray-400 text-sm">
                                  {qa.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-8">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Par téléphone",
                content: "+237 6XX XXX XXX",
                action: "Appelez-nous"
              },
              {
                icon: Mail,
                title: "Par email",
                content: "support@ve-transport.com",
                action: "Envoyez un email"
              },
              {
                icon: MessageCircle,
                title: "Chat en direct",
                content: "Temps de réponse < 5min",
                action: "Démarrer le chat"
              }
            ].map((contact) => (
              <motion.a
                key={contact.title}
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                         backdrop-blur-xl rounded-xl border border-gray-700
                         hover:border-orange-500/50 transition-all group"
              >
                <contact.icon className="w-8 h-8 mx-auto mb-4 text-orange-400" />
                <h3 className="text-lg font-medium text-white mb-2">{contact.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{contact.content}</p>
                <span className="text-orange-400 text-sm font-medium group-hover:text-orange-300">
                  {contact.action} →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;