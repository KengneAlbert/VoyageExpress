import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart} from 'lucide-react';
import { ReactionType, REACTION_EMOJIS, ReactionStats } from '../../../types/reaction';

interface ReactionMenuProps {
  onReact: (type: ReactionType) => void;
  userReaction?: ReactionType;
  reactions: ReactionStats;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ReactionMenu = ({ onReact, userReaction, reactions, isOpen, setIsOpen }: ReactionMenuProps) => {
  return (
    <div className="relative group">
      <button 
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => onReact('like')}
        className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
      >
        {userReaction ? (
          <span className="text-xl">
            {REACTION_EMOJIS.find(r => r.type === userReaction)?.emoji}
          </span>
        ) : (
          <Heart className="w-5 h-5" />
        )}
        <span>{Object.values(reactions).reduce((a, b) => a + (b || 0), 0)}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onMouseLeave={() => setIsOpen(false)}
            className="absolute bottom-full left-0 mb-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-2"
          >
            <div className="flex gap-1">
              {REACTION_EMOJIS.map(reaction => (
                <motion.button
                  key={reaction.type}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    onReact(reaction.type);
                    setIsOpen(false);
                  }}
                  className={`p-2 hover:bg-gray-700 rounded-lg transition-all ${reaction.color}`}
                  title={reaction.label}
                >
                  <span className="text-2xl">{reaction.emoji}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReactionMenu;
