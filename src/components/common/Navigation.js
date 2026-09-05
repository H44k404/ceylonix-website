import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import Button from './Button';
import navigation, { primaryCta } from '../../data/navigation';
import siteConfig from '../../data/siteConfig';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

/**
 * Navigation
 * -----------------------------------------------------------------------
 * Fixed top bar that goes from fully transparent (over the hero) to a
 * frosted dark bar once the user scrolls. Includes a full-screen mobile
 * menu with staggered link reveal and the studio logo + wordmark.
 * -----------------------------------------------------------------------
 */
const Navigation = ({ activeSection, onNavigate, className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavigate = (id) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Logo + wordmark */}
          <button
            onClick={() => handleNavigate('home')}
            data-cursor="hover"
            className="flex items-center gap-3 group"
          >
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.fullName}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-500 group-hover:rotate-[8deg]"
            />
            <span className="font-display text-lg sm:text-xl tracking-[0.15em] text-white">
              {siteConfig.brand.name}
              <span className="text-brand-400">{siteConfig.brand.suffix}</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <button
                key={item.id}
                data-cursor="hover"
                onClick={() => handleNavigate(item.id)}
                className={`relative text-[13px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 py-1 ${
                  activeSection === item.id ? 'text-brand-400' : 'text-white/75 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brand-400 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button size="small" onClick={() => handleNavigate(primaryCta.id)} data-cursor="hover">
              {primaryCta.label}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            data-cursor="hover"
            className="lg:hidden text-white z-[70] relative"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-ink-950 flex flex-col justify-center px-8 sm:px-16"
          >
            <nav className="flex flex-col gap-2">
              {navigation.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavigate(item.id)}
                  className="text-left group flex items-baseline gap-4 py-3 border-b border-white/5"
                >
                  <span className="numeral text-brand-400/70 text-sm">{item.index}</span>
                  <span
                    className={`font-serif text-4xl sm:text-6xl transition-colors duration-300 ${
                      activeSection === item.id ? 'text-brand-400' : 'text-white group-hover:text-brand-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            >
              <Button onClick={() => handleNavigate(primaryCta.id)}>{primaryCta.label}</Button>
              <div className="flex items-center gap-5">
                {Object.entries(siteConfig.social).slice(0, 3).map(([key, href]) => {
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-brand-400 transition-colors"
                      aria-label={key}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
