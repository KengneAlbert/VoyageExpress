import React from "react";
import { Search, CreditCard, Bus, Phone } from "lucide-react";

const BOOKING_STEPS = [
  {
    icon: Search,
    title: "Recherchez votre trajet",
    description:
      "Sélectionnez votre ville de départ, d'arrivée et la date de voyage",
    image: "src/statics/searchform.png",
  },
  {
    icon: CreditCard,
    title: "Réservez votre billet",
    description: "Choisissez votre siège et procédez au paiement sécurisé",
    image: "src/statics/logove.jpg",
  },
  {
    icon: Bus,
    title: "Voyagez sereinement",
    description: "Présentez votre billet électronique au départ",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&auto=format",
  },
  {
    icon: Phone,
    title: "Support 24/7",
    description: "Notre équipe est disponible pour vous assister à tout moment",
    image:
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&h=600&fit=crop&auto=format",
  },
];

const BookingSteps = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            Comment <span className="text-orange-400">ça marche ?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Réserver votre billet de bus n'a jamais été aussi simple
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BOOKING_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col md:flex-row gap-8 items-center bg-gray-800/50 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="w-full md:w-1/2">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400">
                      <step.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-white">
                      Étape {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;
