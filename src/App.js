import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/common/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import Booking from './components/sections/Booking';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import LogoCarousel from './components/sections/LogoCarousel';
import Footer from './components/common/Footer';
import AdminPage from './pages/AdminPage';
import PageLoader from './components/common/PageLoader';
import CustomCursor from './components/common/CustomCursor';
import useSmoothScroll from './hooks/useSmoothScroll';
import './styles/effects.css';

/**
 * App
 * -----------------------------------------------------------------------
 * Root shell for the Ceylonix.CMB luxury photography site. Renders the
 * cinematic intro loader once per session, wires up Lenis smooth
 * scrolling and the custom cursor, and drives lightweight page
 * transitions between the SPA's internal "pages" (home, about, etc.).
 * -----------------------------------------------------------------------
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const isAdminPage = window.location.pathname === '/admin';

  useSmoothScroll();

  const handleNavigate = (page) => {
    if (page === currentPage) {
      const el = document.getElementById(page);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setCurrentPage(page);
    requestAnimationFrame(() => {
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    });
  };

  if (isAdminPage) {
    return <AdminPage />;
  }

  return (
    <div className="bg-ink-950 text-white min-h-screen overflow-x-hidden">
      <PageLoader />
      <CustomCursor />

      <Navigation activeSection={currentPage} onNavigate={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={handleNavigate} />
              <About />
              <Services />
              <Portfolio />
              <Booking />
              <Testimonials />
              <Contact />
              <LogoCarousel />
              <Footer />
            </>
          )}

          {currentPage === 'about' && (
            <>
              <About />
              <LogoCarousel />
              <Footer />
            </>
          )}

          {currentPage === 'services' && (
            <>
              <Services />
              <LogoCarousel />
              <Footer />
            </>
          )}

          {currentPage === 'portfolio' && (
            <>
              <Portfolio />
              <Footer />
            </>
          )}

          {currentPage === 'booking' && (
            <>
              <Booking />
              <Footer />
            </>
          )}

          {currentPage === 'testimonials' && (
            <>
              <Testimonials />
              <Footer />
            </>
          )}

          {currentPage === 'contact' && (
            <>
              <Contact />
              <Footer />
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;
