export interface Review {
  id: number;
  author: {
    name: string;
    avatar: string;
    location?: string;
  };
  rating: number;
  comment: string;
  date: string;
  trip?: {
    from: string;
    to: string;
    date: string;
  };
  likes: number;
  isLiked?: boolean;
  response?: {
    author: string;
    comment: string;
    date: string;
  };
  comments?: ReviewComment[];
}

export interface ReviewComment {
  id: number;
  author: string;
  content: string;
  date: string;
}
