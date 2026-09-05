import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import siteConfig from '../../data/siteConfig';

const HERO_IMAGES = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
];

/**
 * Hero
 * -----------------------------------------------------------------------
 * Full-viewport cinematic opener: crossfading background photography,
 * subtle scroll-parallax, a large serif headline with staggered word
 * reveal, and a scroll-cue. Sets the "luxury editorial" tone for the
 * entire site.
 * -----------------------------------------------------------------------
 */
const Hero = ({ onNavigate }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const headlineWords = ['Every', 'Story', 'Deserves', 'Art'];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-end sm:items-center overflow-hidden bg-ink-950"
    >
      {/* Crossfading background images */}
      <motion.div style={{ y }} className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === activeImage ? 1 : 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-ink-950/40" />
        <div className="grain-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-24 sm:pb-0"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <span className="h-px w-10 bg-brand-400" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-white/80 font-medium">
              {siteConfig.brand.tagline}
            </span>
          </motion.div>

          <h1 className="font-serif font-medium text-white leading-[0.98] text-[13vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem] mb-6 sm:mb-8">
            {headlineWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-bottom mr-3 sm:mr-5">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block ${i === headlineWords.length - 1 ? 'italic text-gradient-gold' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            {siteConfig.brand.fullName} is a Colombo-based fine-art photography and
            cinematography studio, crafting timeless imagery for weddings, portraits,
            and brands who value beauty in every detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex flex-wrap items-center gap-5"
          >
            <Button onClick={() => onNavigate('portfolio')} data-cursor="hover">
              View Portfolio
            </Button>
            <Button variant="outline" onClick={() => onNavigate('contact')} data-cursor="hover">
              Enquire Now
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Image index indicator */}
      <div className="hidden sm:flex absolute right-8 lg:right-10 bottom-32 z-20 flex-col items-center gap-3">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            data-cursor="hover"
            onClick={() => setActiveImage(i)}
            aria-label={`Show background ${i + 1}`}
            className="group py-1.5"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === activeImage ? 'w-2 h-6 bg-brand-400' : 'w-2 h-2 bg-white/40 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => onNavigate('about')}
        data-cursor="hover"
        className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
