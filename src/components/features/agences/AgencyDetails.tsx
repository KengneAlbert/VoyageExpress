import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Calendar, Clock, Info, Shield, Share2, MessageSquare, MessageCircle, Link2, Facebook, Twitter, Send, Building, Award, Bus, MapPin, Phone, Mail, Globe, CheckCircle2, ThumbsUp 
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Post, PostComment } from '../../../types/post';
import { ReactionType } from '../../../types/reaction';
import { usePosts } from '../../../hooks/usePosts';
import { SAMPLE_POSTS } from '../../../data/samplePosts';
import ReactionMenu from '../posts/ReactionMenu';
import { Review } from '../../../types/review';
import { SAMPLE_REVIEWS } from '../../../data/sampleReviews';
import { useReviews } from '../../../hooks/useReviews';
import AgencyRoutes from './AgencyRoutes';
import Logo from '../../../assets/logove.jpg';

const AgencyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('posts'); // Changé pour afficher les annonces par défaut
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [reactionMenuOpen, setReactionMenuOpen] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [reviewCommentText, setReviewCommentText] = useState('');
  const [commentingReviewId, setCommentingReviewId] = useState<number | null>(null);
  const { reviews, addReview, handleLike: likeReview, addReviewComment } = useReviews(SAMPLE_REVIEWS);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Exemple de données d'agence (à remplacer par un appel API)
const agency = {
  id: 1,
  name: "Général Express",
  logo: Logo,
  rating: 4.8,
  trips: 150,
  description: "Leader dans le transport interurbain depuis plus de 15 ans.",
  address: "123 Avenue de l'Union, Douala",
  phone: "+237 655 555 555",
  email: "contact@general-express.cm",
  features: ["WiFi", "Climatisation", "Sièges inclinables", "TV"],
  operatingHours: "24/7",
  fleetSize: 45,
  yearFounded: 2005,
  certifications: ["ISO 9001", "Certification Transport"],
  dailyTrips: 50
};

  // Exemple de voyages programmés
  const trips = [
    {
      id: 1,
      departure: "Douala",
      destination: "Yaoundé",
      date: "2024-03-15",
      time: "08:00",
      duration: "4h",
      price: 5000,
      seatsAvailable: 15,
      isVip: true,
      vehicle: "Toyota Coaster"
    },
    // ... autres voyages
  ];

  // Ajoutez ces données d'exemple pour les routes
  const agencyRoutes = [
    {
      id: 1,
      from: "Douala",
      to: "Yaoundé",
      price: 5000,
      duration: "4h",
      frequency: "Toutes les heures",
      departureTime: ["06:00", "07:00", "08:00", "09:00", "10:00"],
      isPopular: true
    },
    {
      id: 2,
      from: "Douala",
      to: "Bafoussam",
      price: 6000,
      duration: "5h",
      frequency: "Toutes les 2 heures",
      departureTime: ["07:00", "09:00", "11:00", "13:00"]
    },
    // Ajoutez d'autres routes...
  ];

  // Remplacer l'état posts par le hook personnalisé
  const { posts, handleReaction, addComment, likeComment, replyToComment } = usePosts(SAMPLE_POSTS);

  const handleShare = (type: string, post: Post) => {
    try {
      let shareUrl = '';
      const postUrl = `${window.location.origin}/agences/${id}/posts/${post.id}`;
      const text = encodeURIComponent(post.content);

      switch (type) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${postUrl}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${text} ${postUrl}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(postUrl);
          // Vous pouvez ajouter une notification ici
          return;
      }
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  // Fonction pour gérer l'expansion du texte
  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Fonction pour tronquer le texte
  const truncateText = (text: string, maxLength: number = 250) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Ajout de la fonction pour gérer les commentaires
  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    const comment: PostComment = {
      id: Math.random(),
      author: {
        name: "Utilisateur",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    addComment(postId, comment);
    setNewComment("");
  };

  // Ajoutez cette fonction pour gérer les réponses aux commentaires
  const handleReply = (postId: number, commentId: number) => {
    if (!replyContent.trim()) return;

    const reply: Omit<PostComment, 'id'> = {
      author: {
        name: "Utilisateur",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    replyToComment(postId, commentId, reply);
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now(),
      author: {
        name: "Utilisateur",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        location: "Douala"
      },
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      trip: {
        from: "Douala",
        to: "Yaoundé",
        date: new Date().toISOString()
      }
    };

    addReview(review);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    );
  }

  // Protection contre l'absence d'agence
  if (!id || !agency) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>Agence introuvable</div>
      </div>
    );
  }

  // Dans la section du rendu des posts, ajoutez des badges pour le type de post
  const getPostBadge = (type: Post['type']) => {
    const badges = {
      promo: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Promotion' },
      news: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Actualité' },
      update: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Mise à jour' },
      event: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Événement' }
    };

    const badge = badges[type];
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  // Dans la section de rendu des commentaires, remplacez le code existant par :
  const renderComment = (comment: PostComment, postId: number, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-8 mt-3' : ''}`}>
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-800/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-sm font-medium">
              {comment.author.name}
            </span>
            <span className="text-gray-400 text-xs">
              {new Date(comment.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <p className="text-gray-300 text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 ml-2">
          <button 
            onClick={() => likeComment(postId, comment.id)}
            className={`text-xs ${comment.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
          >
            J'aime · {comment.likes}
          </button>
          <button 
            onClick={() => setReplyingTo(comment.id)}
            className="text-gray-400 hover:text-orange-400 text-xs"
          >
            Répondre
          </button>
        </div>

        {/* Formulaire de réponse */}
        {replyingTo === comment.id && (
          <div className="mt-3 ml-2 flex gap-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Écrire une réponse..."
              className="flex-1 px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-lg
                       text-sm text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={() => handleReply(postId, comment.id)}
              disabled={!replyContent.trim()}
              className="px-3 py-1 bg-orange-500 text-white text-sm rounded-lg
                       hover:bg-orange-600 disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        )}

        {/* Affichage des réponses */}
        {comment.replies?.map((reply: PostComment) => renderComment(reply, postId, true))}
      </div>
    </div>
  );

  const renderInfoSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Informations de base */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                       rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-400" />
            <span>Informations générales</span>
          </h3>
          <div className="space-y-4">
            {[
              { icon: Clock, label: "Heures d'ouverture", value: agency.operatingHours },
              { icon: Building, label: "Année de création", value: agency.yearFounded },
              { icon: Bus, label: "Taille de la flotte", value: `${agency.fleetSize} véhicules` },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                       rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            <span>Certifications</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {agency.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-white">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact et Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Coordonnées */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                       rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-400" />
            <span>Contact</span>
          </h3>
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Adresse", value: agency.address },
              { icon: Phone, label: "Téléphone", value: agency.phone },
              { icon: Mail, label: "Email", value: agency.email },
              { icon: Globe, label: "Site web", value: "www.example.com" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                       rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-orange-400" />
            <span>Services</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {agency.features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderReviewsSection = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* En-tête des avis */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                     rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Avis des voyageurs</h3>
            <p className="text-gray-400 mt-1">Basé sur {SAMPLE_REVIEWS.length} avis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-white">{agency.rating}</div>
            <div className="flex flex-col items-start">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= agency.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">Note moyenne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowReviewForm(true)}
        className="w-full py-3 bg-orange-500 text-white rounded-xl 
                   hover:bg-orange-600 transition-colors"
      >
        Ajouter un avis
      </motion.button>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                     flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg 
                       border border-gray-800"
            >
              <form onSubmit={handleAddReview} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                  Partagez votre expérience
                </h3>

                {/* Rating Selection */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Note</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-2xl"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= newReview.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Votre avis
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 
                             rounded-xl text-white resize-none focus:outline-none 
                             focus:ring-2 focus:ring-orange-500"
                    placeholder="Partagez votre expérience avec cette agence..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!newReview.comment.trim()}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg 
                             hover:bg-orange-600 disabled:opacity-50"
                  >
                    Publier
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des avis */}
      {reviews.map((review: Review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                    rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-start gap-4">
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{review.author.name}</h4>
                  {review.author.location && (
                    <p className="text-sm text-gray-400">{review.author.location}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {review.trip && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{review.trip.from}</span>
                  <span>→</span>
                  <span>{review.trip.to}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(review.trip.date).toLocaleDateString()}</span>
                </div>
              )}

              <p className="mt-3 text-gray-300">{review.comment}</p>

              {/* Réponse de l'agence */}
              {review.response && (
                <div className="mt-4 ml-4 p-4 bg-gray-800/50 rounded-xl border-l-2 border-orange-500">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span className="font-medium text-orange-400">
                      {review.response.author}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">
                      {new Date(review.response.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    {review.response.comment}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => likeReview(review.id)}
                  className={`text-sm flex items-center gap-1
                    ${review.isLiked ? 'text-orange-400' : 'text-gray-400 hover:text-orange-400'}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Utile · {review.likes}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCommentingReviewId(commentingReviewId === review.id ? null : review.id)}
                  className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                >
                  Répondre
                </motion.button>
              </div>

              {/* Comments Section */}
              {review.comments && review.comments.length > 0 && (
                <div className="mt-4 ml-8 space-y-3">
                  {review.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Form */}
              {commentingReviewId === review.id && (
                <div className="mt-3 ml-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reviewCommentText}
                      onChange={(e) => setReviewCommentText(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 
                               rounded-lg text-sm text-white placeholder-gray-400 
                               focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      onClick={() => {
                        if (reviewCommentText.trim()) {
                          addReviewComment(review.id, reviewCommentText);
                          setReviewCommentText('');
                          setCommentingReviewId(null);
                        }
                      }}
                      disabled={!reviewCommentText.trim()}
                      className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg 
                               hover:bg-orange-600 disabled:opacity-50"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Ajoutez un nouvel onglet dans la navigation
  const tabs = [
    { id: 'trips', label: 'Voyages', icon: Calendar },
    { id: 'posts', label: 'Annonces', icon: MessageCircle },
    { id: 'routes', label: 'Trajets', icon: MapPin }, // Nouvel onglet
    { id: 'info', label: 'Informations', icon: Info },
    { id: 'reviews', label: 'Avis', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                    from-orange-900/20 via-gray-900 to-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de l'agence */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                    rounded-2xl border border-white/10 p-8 mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden">
              <img src={agency.logo} alt={agency.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{agency.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">{agency.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Certifié VE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="flex gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors
                ${activeTab === tab.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-800/50 text-gray-400 hover:text-white'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenu des onglets */}
        {activeTab === 'trips' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8">
            {/* Liste des voyages */}
            <div className="space-y-4">
              {trips.map(trip => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                            rounded-xl border border-white/10 p-6"
                >
                  {/* Détails du voyage */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-white mb-2">
                        <span className="text-xl font-semibold">{trip.departure}</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-xl font-semibold">{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{trip.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{trip.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{trip.price} FCFA</div>
                      <div className="text-sm text-gray-400">{trip.seatsAvailable} places disponibles</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {trip.isVip && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                          VIP
                        </span>
                      )}
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                        {trip.vehicle}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      Réserver
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Filtres */}
            <div className="space-y-6">
              {/* ... Ajoutez ici les filtres pour les voyages ... */}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="max-w-3xl mx-auto space-y-6"> {/* Réduit la largeur maximale */}
            {posts.map((post: Post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl 
                          rounded-xl border border-white/10 overflow-hidden" // Ajout de overflow-hidden
              >
                {/* En-tête du post plus compact */}
                <div className="p-4 border-b border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.logo}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{post.author.name}</h3>
                        {post.author.verified && (
                          <Shield className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Badge de type de post */}
                  {post.type && (
                    <div className="mb-3">{getPostBadge(post.type)}</div>
                  )}

                  {/* Contenu du post avec gestion du "voir plus" */}
                  <div className="text-gray-200 mb-4 text-sm leading-relaxed">
                    {expandedPosts.includes(post.id) ? (
                      <p className="whitespace-pre-line">{post.content}</p>
                    ) : (
                      <p className="whitespace-pre-line">
                        {truncateText(post.content)}
                      </p>
                    )}
                    {post.content.length > 250 && (
                      <button
                        onClick={() => togglePostExpansion(post.id)}
                        className="text-orange-400 hover:text-orange-300 text-sm font-medium mt-2"
                      >
                        {expandedPosts.includes(post.id) ? 'Voir moins' : 'Voir plus'}
                      </button>
                    )}
                  </div>

                  {/* Images du post - Mise en page améliorée */}
                  {post.images && post.images.length > 0 && (
                    <div className={`mb-4 grid ${
                      post.images.length === 1 ? 'grid-cols-1' : 
                      post.images.length === 2 ? 'grid-cols-2' :
                      post.images.length === 3 ? 'grid-cols-2' :
                      'grid-cols-2'
                    } gap-1`}>
                      {post.images.map((image, index) => (
                        <div key={index} className={`${
                          post.images.length === 3 && index === 0 ? 'col-span-2' : ''
                        } relative pt-[75%]`}>
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Statistiques d'engagement */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    {post.engagement && (
                      <>
                        <span>{post.engagement.totalReactions} réactions</span>
                        <span>•</span>
                        <span>{post.comments.length} commentaires</span>
                      </>
                    )}
                  </div>

                  {/* Actions sur le post */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                    <div className="flex items-center gap-6">
                      <ReactionMenu
                        onReact={(type) => handleReaction(post.id, type as ReactionType)}
                        userReaction={post.userReaction}
                        reactions={post.reactions}
                        isOpen={reactionMenuOpen === post.id}
                        setIsOpen={(isOpen) => setReactionMenuOpen(isOpen ? post.id : null)}
                      />
                      <button 
                        className="flex items-center gap-2 text-gray-400 hover:text-orange-400"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>

                    {/* Menu de partage amélioré */}
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(showShareMenu === post.id ? null : post.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-orange-400"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>

                      <AnimatePresence>
                        {showShareMenu === post.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl border border-gray-700 
                                    shadow-lg z-50"
                          >
                            <div className="p-2 space-y-1">
                              {[
                                { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
                                { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-500' },
                                { icon: MessageSquare, label: 'WhatsApp', color: 'hover:text-green-500' },
                                { icon: Link2, label: 'Copier le lien', color: 'hover:text-orange-500' }
                              ].map((option) => (
                                <button
                                  key={option.label}
                                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg 
                                          text-gray-400 ${option.color} hover:bg-gray-700/50`}
                                  onClick={() => {
                                    handleShare(option.label.toLowerCase(), post);
                                    setShowShareMenu(null);
                                  }}
                                >
                                  <option.icon className="w-4 h-4" />
                                  <span className="text-sm">{option.label}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Section des commentaires */}
                  <div className="border-t border-gray-700/50 mt-4">
                    {showComments === post.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 space-y-4"
                      >
                        {/* Liste des commentaires */}
                        {post.comments.map(comment => renderComment(comment, post.id))}

                        {/* Formulaire de commentaire */}
                        <div className="flex gap-3 mt-4">
                          <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="Your avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="relative">
                              <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Écrire un commentaire..."
                                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl
                                        text-white placeholder-gray-400 focus:outline-none focus:ring-2
                                        focus:ring-orange-500 resize-none text-sm"
                                rows={1}
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                disabled={!newComment.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 
                                        hover:text-orange-300 disabled:opacity-50 
                                        disabled:cursor-not-allowed"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Bouton pour afficher/masquer les commentaires */}
                    <button
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="w-full pt-4 text-gray-400 hover:text-gray-300 text-sm font-medium"
                    >
                      {showComments === post.id ? 'Masquer les commentaires' : `Voir les commentaires (${post.comments.length})`}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'info' && renderInfoSection()}

        {activeTab === 'reviews' && renderReviewsSection()}

        {/* Dans la section des onglets, ajoutez le rendu des routes */}
        {activeTab === 'routes' && (
          <div className="max-w-4xl mx-auto">
            <AgencyRoutes routes={agencyRoutes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyDetails;
