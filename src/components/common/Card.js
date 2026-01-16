import React from 'react';

const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  ...props
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';

  const glassClasses = glass
    ? 'glass-morphism'
    : 'bg-gray-900/50 border border-white/10';

  const hoverClasses = hover
    ? 'hover-lift'
    : '';

  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const ImageCard = ({
  image,
  title,
  subtitle,
  overlay = true,
  className = '',
  ...props
}) => {
  return (
    <Card className={`relative image-hover-zoom ${className}`} {...props}>
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
            {subtitle && (
              <p className="text-white/80 text-sm">{subtitle}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export { Card, ImageCard };
export default Card;