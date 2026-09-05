import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * useSmoothScroll
 * -----------------------------------------------------------------------
 * Initializes Lenis buttery-smooth scrolling for the whole app and drives
 * it from requestAnimationFrame. Automatically cleans up on unmount and
 * respects the user's reduced-motion preference.
 * -----------------------------------------------------------------------
 */
const useSmoothScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
};

export default useSmoothScroll;
