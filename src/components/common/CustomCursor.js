import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * -----------------------------------------------------------------------
 * Elegant magnetic-ring cursor for desktop pointer devices. Hidden
 * automatically on touch devices via CSS (see effects.css). The ring
 * expands and highlights when hovering any element with the
 * `data-cursor="hover"` attribute (links, image cards, buttons).
 * -----------------------------------------------------------------------
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  useEffect(() => {
    if (!enabled) return undefined;

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let rafId;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const handleOver = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) {
        ringRef.current && ringRef.current.classList.add('is-active');
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('[data-cursor="hover"]')) {
        ringRef.current && ringRef.current.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
