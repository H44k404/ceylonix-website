import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reveal
 * -----------------------------------------------------------------------
 * Generic scroll-triggered reveal wrapper built on framer-motion's
 * viewport detection. Use `direction` to control the entrance axis and
 * `delay`/`duration` to stagger groups of elements.
 * -----------------------------------------------------------------------
 */
const directions = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  as = 'div',
  once = true,
  amount = 0.2,
  ...props
}) => {
  const offset = directions[direction] || directions.up;
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
