import React from 'react';

/**
 * Marquee
 * -----------------------------------------------------------------------
 * Infinite horizontal scrolling strip. Pass any array of React nodes as
 * `items`; the component duplicates them automatically for a seamless
 * loop and pauses the animation on hover.
 * -----------------------------------------------------------------------
 */
const Marquee = ({ items = [], speedClassName = '', reverse = false, gapClassName = 'gap-16' }) => {
  return (
    <div className="marquee-row overflow-hidden w-full">
      <div className={`marquee-track ${reverse ? 'reverse' : ''} ${speedClassName} flex ${gapClassName}`}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
