import { useState, useCallback } from 'react';
import { Post, PostComment } from '../types/post';
import { ReactionType } from '../types/reaction';

export const usePosts = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = useCallback((post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  }, []);

  const likePost = useCallback((postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          };
        }
        return post;
      })
    );
  }, []);

  const addComment = useCallback((postId: number, comment: PostComment) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
        }
        return post;
      })
    );
  }, []);

  const sharePost = useCallback((postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1
          };
        }
        return post;
      })
    );
  }, []);

  const deletePost = useCallback((postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  const updatePost = useCallback((postId: number, updates: Partial<Post>) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, ...updates };
        }
        return post;
      })
    );
  }, []);

  const likeComment = useCallback((postId: number, commentId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                  isLiked: !comment.isLiked
                };
              }
              return comment;
            })
          };
        }
        return post;
      })
    );
  }, []);

  const replyToComment = useCallback((postId: number, parentCommentId: number, reply: Omit<PostComment, 'id'>) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === parentCommentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), {
                    ...reply,
                    id: Date.now(),
                    replyTo: parentCommentId
                  }]
                };
              }
              return comment;
            })
          };
        }
        return post;
      })
    );
  }, []);

  const handleReaction = useCallback((postId: number, reactionType: ReactionType) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const oldReaction = post.userReaction;
          const newReactions = { ...post.reactions };

          // Retirer l'ancienne réaction
          if (oldReaction) {
            newReactions[oldReaction] = (newReactions[oldReaction] || 1) - 1;
          }

          // Ajouter/Retirer la nouvelle réaction
          if (oldReaction !== reactionType) {
            newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          }

          return {
            ...post,
            reactions: newReactions,
            userReaction: oldReaction === reactionType ? undefined : reactionType
          };
        }
        return post;
      })
    );
  }, []);

  return {
    posts,
    addPost,
    likePost,
    addComment,
    sharePost,
    deletePost,
    updatePost,
    likeComment,
    replyToComment,
    handleReaction
  };
};
