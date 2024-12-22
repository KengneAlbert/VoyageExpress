import React from 'react';
import { Clock, Shield, CreditCard, Phone } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Clock,
      title: 'Rapide et Simple',
      description: 'Réservez votre billet en quelques clics, 24h/24 et 7j/7'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Vos paiements sont 100% sécurisés avec notre plateforme'
    },
    {
      icon: CreditCard,
      title: 'Flexible',
      description: 'Plusieurs options de paiement disponibles pour votre confort'
    },
    {
      icon: Phone,
      title: 'Support 24/7',
      description: 'Notre équipe est disponible pour vous assister à tout moment'
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pourquoi Choisir <span className="text-orange-400">VoyageExpress</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nous simplifions vos voyages en bus à travers le Cameroun avec une plateforme moderne et fiable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-800/50 p-6 rounded-lg text-center hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-400/10 text-orange-400 mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;