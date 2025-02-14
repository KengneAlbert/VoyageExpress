import { Post } from '../types/post';

export const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    author: {
      id: 1,
      name: "Général Express",
      logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
      verified: true
    },
    type: 'promo',
    content: `🎉 Promotion Exceptionnelle ! 
    
    -20% sur tous nos trajets Douala-Yaoundé ce weekend.
    
    🚌 Bus VIP climatisés
    💺 Sièges confortables
    🎯 Départs ponctuels
    
    Réservez maintenant pour profiter de cette offre limitée !`,
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
    ],
    date: new Date().toISOString(),
    likes: 245,
    comments: [
      {
        id: 1,
        author: {
          name: "Jean Paul",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        content: "Super promotion ! Je vais en profiter ce weekend.",
        date: new Date().toISOString(),
        likes: 12
      }
    ],
    shares: 58,
    isLiked: false,
    engagement: {
      totalReactions: 324,
      reactionTypes: {
        like: 245,
        love: 56,
        care: 23
      }
    },
    reactions: {
      like: 245,
      love: 56,
      care: 23,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0
    },
    userReaction: undefined
  },
  {
    id: 2,
    author: {
      id: 1,
      name: "Général Express",
      logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?fit=crop&w=64&h=64",
      verified: true
    },
    type: 'news',
    content: `📢 Nouveau dans notre flotte !

    Nous sommes fiers de vous présenter notre nouveau bus VIP de luxe pour encore plus de confort lors de vos voyages.

    ✨ Caractéristiques :
    - Sièges inclinables extra-larges
    - WiFi gratuit
    - Prises USB
    - Service de snacks
    - Écrans individuels`,
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
    ],
    date: new Date(Date.now() - 86400000).toISOString(),
    likes: 189,
    comments: [],
    shares: 42,
    isLiked: false,
    engagement: {
      totalReactions: 245,
      reactionTypes: {
        like: 189,
        love: 42,
        care: 14
      }
    },
    reactions: {
      like: 189,
      love: 42,
      care: 14,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0
    },
    userReaction: undefined
  }
];
