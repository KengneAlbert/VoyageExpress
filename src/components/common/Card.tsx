import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl bg-gray-800/30 backdrop-blur-sm p-6",
          "transition-all duration-300",
          gradient && "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
          hover && "hover:scale-105 hover:bg-gray-800/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;