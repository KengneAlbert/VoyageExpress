import { Review } from '../types/review';

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    author: {
      name: "Jean Michel",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Douala"
    },
    rating: 5,
    comment: "Excellent service ! Le bus était très confortable et le personnel très professionnel. Je recommande vivement cette agence pour vos voyages.",
    date: new Date(Date.now() - 86400000).toISOString(),
    trip: {
      from: "Douala",
      to: "Yaoundé",
      date: "2024-02-15"
    },
    likes: 12,
    isLiked: false,
    likedBy: [] as string[]
  },
  {
    id: 2,
    author: {
      name: "Marie Claire",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "Yaoundé"
    },
    rating: 4,
    comment: "Très bon voyage dans l'ensemble. La climatisation fonctionnait bien et le chauffeur était prudent. Seul petit bémol : un léger retard au départ.",
    date: new Date(Date.now() - 172800000).toISOString(),
    trip: {
      from: "Yaoundé",
      to: "Douala",
      date: "2024-02-10"
    },
    likes: 8,
    isLiked: false,
    response: {
      author: "Général Express",
      comment: "Merci pour votre retour. Nous nous excusons pour le retard et travaillons constamment à améliorer notre ponctualité.",
      date: new Date(Date.now() - 86400000).toISOString()
    },
    likedBy: [] as string[]
  }
];
