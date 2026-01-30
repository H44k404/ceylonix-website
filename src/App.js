import React, { useEffect, useState } from 'react';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if we're on admin page
  const isAdminPage = window.location.pathname === '/admin';

  // Handle page navigation with smooth transition
  const handleNavigate = (page) => {
    if (page !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    }
  };

  useEffect(() => {
    // Initialize scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (isAdminPage) {
    return <AdminPage />;
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-reveal {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .vintage-grain::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .hover-lift {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }

        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 122, 0, 0.4);
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff7a00, #ff9933);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .image-hover-zoom {
          overflow: hidden;
        }

        .image-hover-zoom img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-hover-zoom:hover img {
          transform: scale(1.1);
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Page Transition Animations */
        @keyframes pageEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pageExit {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.98);
          }
        }

        .page-content {
          animation: pageEnter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .page-content.exiting {
          animation: pageExit 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Smooth button transitions */
        button, .button-like {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        button:hover, .button-like:hover {
          transform: translateY(-2px);
          backdrop-filter: blur(8px);
        }

        button:active, .button-like:active {
          transform: translateY(0);
        }
      `}</style>

      <Navigation
        activeSection={currentPage}
        onNavigate={handleNavigate}
      />

      <main className={`page-content ${isTransitioning ? 'exiting' : ''}`}>
        {/* Home page shows hero + all sections */}
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
        
        {/* About page */}
        {currentPage === 'about' && (
          <>
            <About />
            <LogoCarousel />
            <Footer />
          </>
        )}
        
        {/* Services page */}
        {currentPage === 'services' && (
          <>
            <Services />
            <LogoCarousel />
            <Footer />
          </>
        )}
        
        {/* Portfolio page */}
        {currentPage === 'portfolio' && (
          <>
            <Portfolio />
            <Footer />
          </>
        )}
        
        {/* Booking page */}
        {currentPage === 'booking' && (
          <>
            <Booking />
            <Footer />
          </>
        )}
        
        {/* Testimonials page */}
        {currentPage === 'testimonials' && (
          <>
            <Testimonials />
            <Footer />
          </>
        )}
        
        {/* Contact page */}
        {currentPage === 'contact' && (
          <>
            <Contact />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
