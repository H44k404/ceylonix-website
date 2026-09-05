import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '../../data/siteConfig';

/**
 * PageLoader
 * -----------------------------------------------------------------------
 * A short, luxurious first-visit intro: the studio crown mark draws in,
 * the name letters fan out, then the curtain lifts to reveal the hero.
 * Only shown once per session (sessionStorage flag) so repeat navigation
 * within the SPA never re-triggers it.
 * -----------------------------------------------------------------------
 */
const NAME_LETTERS = siteConfig.brand.fullName.split('');

const PageLoader = ({ onFinished }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('ceylonix_loader_seen');
    if (alreadySeen) {
      setVisible(false);
      onFinished && onFinished();
      return undefined;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('ceylonix_loader_seen', '1');
      onFinished && onFinished();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <React.Fragment>
          <motion.div
            className="fixed inset-0 z-[100] bg-ink-950 flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.35 } }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-14 sm:w-16 sm:h-16 mb-6"
            >
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.fullName}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="flex overflow-hidden">
              {NAME_LETTERS.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-xl sm:text-2xl tracking-[0.25em] text-white inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="h-px w-32 bg-gradient-to-r from-transparent via-brand-400 to-transparent mt-6 origin-center"
            />
          </motion.div>

          {/* Curtain panels slide away independently for a cinematic reveal */}
          <motion.div
            className="fixed top-0 left-0 h-full w-1/2 bg-ink-950 z-[101]"
            initial={{ x: 0 }}
            exit={{ x: '-100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-1/2 bg-ink-950 z-[101]"
            initial={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          />
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
