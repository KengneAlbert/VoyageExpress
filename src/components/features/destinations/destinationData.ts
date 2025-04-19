export interface Destination {
  id: number;
  name: string;
  region: string;
  images: string[];
  description: string;
  highlights: string[];
  activities: string[];
  climate: {
    bestTime: string;
    temperature: string;
    rainfall: string;
  };
  accommodation: {
    hotels: number;
    priceRange: string;
  };
  popularSeason: string;
  culturalEvents: string[];
  transportation: {
    access: string[];
    localTransport: string[];
  };
  cuisine: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Kribi",
    region: "Littoral",
    images: [
      "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg",
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg", 
      "https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg",
      "https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg"
    ],
    description:
      "Kribi, surnommée la ville paradisiaque du Cameroun, vous séduira par ses plages de sable doré, ses chutes spectaculaires de la Lobé qui se jettent directement dans l'océan, et sa délicieuse gastronomie maritime locale.",
    highlights: [
      "Plages de sable fin",
      "Chutes de la Lobé",
      "Fruits de mer frais",
      "Port en eau profonde",
    ],
    activities: [
      "Baignade",
      "Pêche sportive",
      "Visites guidées",
      "Sports nautiques",
    ],
    climate: {
      bestTime: "Novembre à Février",
      temperature: "24-32°C",
      rainfall: "Modérée",
    },
    accommodation: {
      hotels: 45,
      priceRange: "15,000 - 150,000 FCFA",
    },
    popularSeason: "Décembre à Mars - Festival de la Mer",
    culturalEvents: [
      "Festival de la Mer",
      "Fête des Pêcheurs",
      "Carnaval de Kribi",
    ],
    transportation: {
      access: [
        "Bus depuis Douala (4h)",
        "Location de voiture",
        "Taxi collectif",
      ],
      localTransport: ["Moto-taxi", "Taxi ville", "Location de vélos"],
    },
    cuisine: [
      "Poisson braisé",
      "Crevettes géantes",
      "Langoustes grillées",
      "Sauce Nyembwe",
    ],
  },
  {
    id: 2,
    name: "Mont Cameroun",
    region: "Sud-Ouest",
    images: [
      "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg",
      "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg",
      "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg",
      "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
    ],
    description:
      "Le Mont Cameroun, plus haut sommet d'Afrique de l'Ouest, offre une expérience unique d'ascension à travers différents écosystèmes, de la forêt tropicale aux prairies d'altitude.",
    highlights: [
      "Sommet à 4095m",
      "Randonnées guidées",
      "Flore unique",
      "Vues panoramiques",
    ],
    activities: [
      "Alpinisme",
      "Observation d'oiseaux",
      "Camping en altitude",
      "Photographie",
    ],
    climate: {
      bestTime: "Novembre à Février",
      temperature: "10-25°C",
      rainfall: "Modérée",
    },
    accommodation: {
      hotels: 25,
      priceRange: "20,000 - 150,000 FCFA",
    },
    popularSeason: "Course du Mont Cameroun - Février",
    culturalEvents: [
      "Course du Mont Cameroun",
      "Festival des Planteurs",
      "Cérémonies traditionnelles",
    ],
    transportation: {
      access: ["Vol vers Douala", "Bus depuis Douala", "Transport local"],
      localTransport: ["Guides locaux", "4x4", "Porteurs"],
    },
    cuisine: ["Eru", "Achu", "Poulet DG", "Thé de montagne"],
  },
  {
    id: 3,
    name: "Yaoundé",
    region: "Centre",
    images: [
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3",
    ],
    description:
      "Capitale politique du Cameroun, Yaoundé offre un mélange unique d'architecture moderne et de nature luxuriante, avec ses sept collines emblématiques et ses jardins verdoyants.",
    highlights: [
      "Mont Fébé",
      "Musée National",
      "Basilique Marie-Reine",
      "Marchés traditionnels",
    ],
    activities: [
      "Visites culturelles",
      "Shopping local",
      "Randonnée urbaine",
      "Gastronomie",
    ],
    climate: {
      bestTime: "Novembre à Février",
      temperature: "18-28°C",
      rainfall: "Modérée",
    },
    accommodation: {
      hotels: 60,
      priceRange: "25,000 - 200,000 FCFA",
    },
    popularSeason: "Novembre à Février",
    culturalEvents: [
      "Festival des Arts",
      "Fête de la Musique",
      "Salon de l'Artisanat",
    ],
    transportation: {
      access: ["Vols directs", "Bus interurbains", "Taxis"],
      localTransport: ["Taxis", "Moto-taxis", "Transports en commun"],
    },
    cuisine: ["Ndolé", "Poulet DG", "Sangah", "Brochettes de viande"],
  },
  {
    id: 4,
    name: "Bamenda",
    region: "Nord-Ouest",
    images: [
      "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg",
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg", 
      "https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg",
      "https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg"
    ],
    description:
      "Ville des hauts plateaux, Bamenda séduit par son climat frais, ses paysages montagneux et sa riche culture traditionnelle des Grassfields.",
    highlights: [
      "Sabga Hills",
      "Marché artisanal",
      "Palais royal",
      "Chutes d'eau",
    ],
    activities: [
      "Trekking",
      "Artisanat local",
      "Festivals culturels",
      "Photographie",
    ],
    climate: {
      bestTime: "Octobre à Mars",
      temperature: "15-25°C",
      rainfall: "Forte",
    },
    accommodation: {
      hotels: 30,
      priceRange: "15,000 - 100,000 FCFA",
    },
    popularSeason: "Octobre à Mars",
    culturalEvents: ["Festival des Masques", "Fête des Fon", "Marché de Noël"],
    transportation: {
      access: ["Bus depuis Douala", "Location de voiture", "Taxi collectif"],
      localTransport: ["Moto-taxi", "Taxi ville", "Location de vélos"],
    },
    cuisine: ["Fufu et Njama Njama", "Koki", "Ndolé", "Brochettes de viande"],
  },
];
