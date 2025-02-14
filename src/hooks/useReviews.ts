import { useState, useCallback } from 'react';
import { Review } from '../types/review';

export const useReviews = (initialReviews: Review[]) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);

  const addReview = useCallback((review: Review) => {
    setReviews(prev => [review, ...prev]);
  }, []);

  const handleLike = useCallback((reviewId: number) => {
    setReviews(prev => 
      prev.map(review => {
        if (review.id === reviewId) {
          const isCurrentlyLiked = likedReviews.includes(reviewId);
          return {
            ...review,
            likes: isCurrentlyLiked ? review.likes - 1 : review.likes + 1,
            isLiked: !isCurrentlyLiked
          };
        }
        return review;
      })
    );
    setLikedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  }, [likedReviews]);

  const addReviewComment = useCallback((reviewId: number, comment: string) => {
    setReviews(prev =>
      prev.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            comments: [
              ...(review.comments || []),
              {
                id: Date.now(),
                author: "Utilisateur",
                content: comment,
                date: new Date().toISOString(),
              }
            ]
          };
        }
        return review;
      })
    );
  }, []);

  return {
    reviews,
    likedReviews,
    addReview,
    handleLike,
    addReviewComment
  };
};
