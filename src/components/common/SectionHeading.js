import React from 'react';
import Reveal from './Reveal';

/**
 * SectionHeading
 * -----------------------------------------------------------------------
 * Consistent editorial section header used across the site: a small
 * kicker label with a rule, a large serif headline (with an optional
 * highlighted word), and an optional supporting paragraph.
 * -----------------------------------------------------------------------
 */
const SectionHeading = ({ eyebrow, title, highlight, description, align = 'center' }) => {
  const alignClasses =
    align === 'left' ? 'items-start text-left mr-auto' : 'items-center text-center mx-auto';

  return (
    <div className={`flex flex-col ${alignClasses} max-w-3xl mb-16`}>
      {eyebrow && (
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            {align === 'center' && <span className="h-px w-8 bg-brand-400/70" />}
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-brand-400 font-medium">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-brand-400/70" />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="font-serif font-medium leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-white">
          {title}{' '}
          {highlight && <span className="text-gradient-gold italic">{highlight}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/60">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
