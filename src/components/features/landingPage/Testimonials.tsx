import React, { useState } from "react";
import { Star, StarHalf, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Cabrel from "../../../assets/cabrel.jpg";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sophie M.",
    role: "Voyageuse Régulière",
    image: Cabrel,
    content:
      "Service exceptionnel ! La réservation en ligne est simple et rapide. Je recommande vivement VoyageExpress pour tous vos déplacements au Cameroun.",
    rating: 5,
    date: "2024-02-15",
  },
  {
    id: 2,
    name: "Jean P.",
    role: "Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format",
    content:
      "En tant que professionnel qui voyage souvent, je trouve que VoyageExpress offre un service fiable et ponctuel. Les bus sont confortables et le personnel est courtois.",
    rating: 4.5,
    date: "2024-02-10",
  },
  {
    id: 3,
    name: "Marie C.",
    role: "Étudiante",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format",
    content:
      "Prix abordables et service de qualité. La possibilité de réserver via l'application rend tout tellement plus facile !",
    rating: 5,
    date: "2024-02-05",
  },
  {
    id: 4,
    name: "Paul K.",
    role: "Commerçant",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format",
    content:
      "Excellent service client et ponctualité remarquable. Les chauffeurs sont professionnels et les bus sont toujours propres.",
    rating: 5,
    date: "2024-01-30",
  },
  {
    id: 5,
    name: "Claire B.",
    role: "Enseignante",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&auto=format",
    content:
      "Je voyage régulièrement entre Douala et Yaoundé, et VoyageExpress est de loin la meilleure compagnie. Service impeccable !",
    rating: 4.5,
    date: "2024-01-25",
  },
  {
    id: 6,
    name: "Thomas R.",
    role: "Ingénieur",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
    content:
      "L'application est intuitive et les réservations sont très simples. Le service est à la hauteur des attentes.",
    rating: 5,
    date: "2024-01-20",
  },
];

const Testimonials = () => {
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredTestimonials = TESTIMONIALS.filter((testimonial) => {
    if (filter === "all") return true;
    return filter === "5" ? testimonial.rating === 5 : testimonial.rating < 5;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-5 h-5 fill-orange-400 text-orange-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-5 h-5 fill-orange-400 text-orange-400"
        />
      );
    }

    return stars;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-24 bg-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white">
            Ce que disent <span className="text-orange-400">nos clients</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Découvrez les expériences de nos voyageurs satisfaits
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "all"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Tous les avis
            </button>
            <button
              onClick={() => setFilter("5")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "5"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              5 étoiles
            </button>
            <button
              onClick={() => setFilter("4")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === "4"
                  ? "bg-orange-400 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              4+ étoiles
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-lg p-8 transform transition-all duration-300 hover:scale-105 hover:bg-gray-800"
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative mb-6">
                <Quote
                  className={`absolute -top-4 -left-4 w-8 h-8 text-orange-400 opacity-50 transition-all duration-300 ${
                    hoveredId === testimonial.id ? "rotate-12 scale-110" : ""
                  }`}
                />
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-orange-400 transform scale-110 transition-transform duration-300 group-hover:scale-125"></div>
                  </div>
                  <div className="ml-4">
                    <div className="text-white font-semibold group-hover:text-orange-400 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-orange-400 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {formatDate(testimonial.date)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mb-4 transition-transform duration-300 group-hover:scale-110">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="text-gray-300 text-base italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
