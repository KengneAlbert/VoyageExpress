import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Contactez <span className="text-orange-400">Nous</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Notre équipe est disponible 24/7 pour répondre à vos questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Votre message..."
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 
                         text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 
                         hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Envoyer</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50">
                <Phone className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Téléphone</h3>
                <p className="text-gray-400">+237 655 555 555</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50">
                <Mail className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Email</h3>
                <p className="text-gray-400">contact@voyageexpress.cm</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50">
                <MapPin className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Adresse</h3>
                <p className="text-gray-400">123 Avenue de l'Union, Douala, Cameroun</p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50">
                <Clock className="h-8 w-8 text-orange-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Horaires</h3>
                <p className="text-gray-400">Lun - Dim: 24h/24</p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-900/50 backdrop-blur-xl p-4 rounded-xl border border-gray-800/50 h-[300px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254355.27751083425!2d9.645768591789698!3d4.050864852335181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128f72b4521d%3A0xc336c4d5a996c534!2sDouala%2C+Cameroun!5e0!3m2!1sfr!2sfr!4v1453911153385"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;