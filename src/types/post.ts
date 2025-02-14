export interface PostAuthor {
  id: number;
  name: string;
  logo: string;
  verified: boolean;
}

// Renommer PostComment pour éviter la confusion
export interface PostComment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies?: PostComment[];
  replyTo?: number; // ID du commentaire parent
}

export type ReactionType = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Reaction {
  type: ReactionType;
  count: number;
}

export interface Post {
  id: number;
  author: PostAuthor;
  content: string;
  images: string[];
  date: string;
  likes: number;
  comments: PostComment[];
  shares: number;
  isLiked: boolean;
  type: 'promo' | 'news' | 'update' | 'event';
  engagement?: {
    totalReactions: number;
    reactionTypes: {
      like: number;
      love: number;
      care: number;
    };
  };
  reactions: {
    [key in ReactionType]?: number;
  };
  userReaction?: ReactionType;
}

export interface PostResponse {
  success: boolean;
  message?: string;
  data?: Post;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export type PostAction = 
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'LIKE_POST'; payload: number }
  | { type: 'ADD_COMMENT'; payload: { postId: number; comment: PostComment } }
  | { type: 'SHARE_POST'; payload: number }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };
