export type ReactionType = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

export interface ReactionEmoji {
  type: ReactionType;
  emoji: string;
  label: string;
  color: string;
}

export type ReactionStats = {
  [key in ReactionType]?: number;
}

export const REACTION_EMOJIS: ReactionEmoji[] = [
  { type: 'like', emoji: '👍', label: "J'aime", color: 'text-blue-500' },
  { type: 'love', emoji: '❤️', label: 'Super', color: 'text-red-500' },
  { type: 'care', emoji: '🤗', label: 'Soutien', color: 'text-yellow-500' },
  { type: 'haha', emoji: '😄', label: 'Haha', color: 'text-green-500' },
  { type: 'wow', emoji: '😮', label: 'Wow', color: 'text-purple-500' },
  { type: 'sad', emoji: '😢', label: 'Triste', color: 'text-blue-400' },
  { type: 'angry', emoji: '😠', label: 'Grrr', color: 'text-red-600' }
];

export interface ReactionEvent {
  type: ReactionType;
  postId: number;
  userId: string;
  timestamp: string;
}
