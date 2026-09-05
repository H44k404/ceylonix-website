import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram, ExternalLink, Plus } from 'lucide-react';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import portfolioItems, { portfolioCategories } from '../../data/portfolio';
import siteConfig from '../../data/siteConfig';

/**
 * Portfolio
 * -----------------------------------------------------------------------
 * Filterable, animated masonry-style gallery. Tries the live backend API
 * first (so the admin dashboard stays fully functional); falls back to
 * the local `data/portfolio.js` table when the API is unavailable or
 * empty. Includes a full-screen lightbox with keyboard navigation.
 * -----------------------------------------------------------------------
 */
const Portfolio = () => {
  const [items, setItems] = useState(portfolioItems);
  const [usingFallback, setUsingFallback] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const res = await fetch(`${siteConfig.api.baseUrl}/portfolio`);
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
          setUsingFallback(false);
        }
      } catch (err) {
        // Silently fall back to local table — no console noise in production UX
      }
    };
    loadFromApi();
  }, []);

  const filtered = items.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="A Glimpse Into Our"
          highlight="Portfolio"
          description="A curated selection of weddings, portraits and events — each frame chosen for how honestly it tells the story."
        />

        {/* Category filters */}
        {usingFallback && (
          <Reveal className="flex flex-wrap justify-center gap-3 mb-14">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                data-cursor="hover"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-brand-500 border-brand-500 text-ink-950 font-medium'
                    : 'border-white/15 text-white/60 hover:text-white hover:border-white/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </Reveal>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          >
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative group cursor-pointer overflow-hidden rounded-sm ${
                    index % 5 === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[3/4]'
                  }`}
                  onClick={() =>
                    item.isEmbed && item.embedUrl
                      ? window.open(item.embedUrl, '_blank', 'noopener,noreferrer')
                      : openLightbox(index)
                  }
                  data-cursor="hover"
                >
                  <img
                    src={item.isEmbed ? item.thumbnailImage : item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-brand-400 text-[10px] uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      {item.isEmbed && <Instagram className="w-3 h-3" />}
                      {item.category || item.platform}
                    </span>
                    <h3 className="text-white font-serif text-lg sm:text-xl leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    {item.isEmbed ? (
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/50">No portfolio items yet. Check back soon.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex items-center justify-center px-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full max-h-[80vh] object-contain mx-auto rounded-sm"
              />
              <div className="text-center mt-5">
                <span className="text-brand-400 text-xs uppercase tracking-widest">
                  {activeItem.category}
                </span>
                <h3 className="text-white font-serif text-2xl mt-1">{activeItem.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
