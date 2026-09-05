import React, { useEffect, useState } from 'react';
import Marquee from '../common/Marquee';
import Reveal from '../common/Reveal';

/**
 * LogoCarousel
 * -----------------------------------------------------------------------
 * "Trusted By" strip using the shared Marquee primitive for a smooth,
 * pausable infinite scroll. Tries the backend API first (keeps the admin
 * dashboard's logo manager functional) and falls back to a curated set
 * of neutral placeholder marks otherwise.
 * -----------------------------------------------------------------------
 */
const fallbackLogos = [
  { id: 1, name: 'Wanderlust Weddings' },
  { id: 2, name: 'Colombo Grand Hotels' },
  { id: 3, name: 'Isle & Ivory' },
  { id: 4, name: 'Nexus Holdings' },
  { id: 5, name: 'The Gallery Collective' },
  { id: 6, name: 'Meridian Events' },
];

const LogoCarousel = () => {
  const [logos, setLogos] = useState(fallbackLogos);
  const [hasImages, setHasImages] = useState(false);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/logos`
        );
        const json = await res.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setLogos(json.data);
          setHasImages(true);
        }
      } catch (err) {
        // Fall back silently to text-mark logos
      }
    };
    loadLogos();
  }, []);

  return (
    <div className="relative py-16 sm:py-20 bg-ink-950 border-y border-white/5 overflow-hidden">
      <Reveal className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-white/40">
          Trusted by couples & brands across Sri Lanka
        </span>
      </Reveal>

      <Marquee
        items={logos.map((logo) =>
          hasImages ? (
            <img
              key={logo.id}
              src={logo.image}
              alt={logo.name}
              className="h-8 sm:h-10 w-auto object-contain opacity-40 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          ) : (
            <span
              key={logo.id}
              className="font-display text-xl sm:text-2xl text-white/25 hover:text-brand-400/70 transition-colors duration-300 whitespace-nowrap tracking-wide"
            >
              {logo.name}
            </span>
          )
        )}
        gapClassName="gap-16 sm:gap-24"
      />

      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-ink-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-ink-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default LogoCarousel;
