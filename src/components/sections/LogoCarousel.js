import React, { useEffect, useState } from 'react';

const LogoCarousel = () => {
  const [logos, setLogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Example logos - can be replaced with real ones later
  const exampleLogos = [
    {
      id: 1,
      name: 'Client 1',
      image: 'https://images.unsplash.com/photo-1522869635100-ce306e08b70d?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Client 2',
      image: 'https://images.unsplash.com/photo-1521737604893-6f3031224c94?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Client 3',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Client 4',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Client 5',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Client 6',
      image: 'https://images.unsplash.com/photo-1522071820081-8949e929e59c?w=500&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    loadLogos();
  }, []);

  const loadLogos = async () => {
    setIsLoading(true);
    try {
      // Try to fetch from API first
      const response = await fetch('http://localhost:5000/api/logos');
      const json = await response.json();
      if (json && json.data && json.data.length > 0) {
        setLogos(json.data);
      } else {
        setLogos(exampleLogos);
      }
    } catch (error) {
      // Fallback to example logos
      console.log('Using example logos');
      setLogos(exampleLogos);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-black flex justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-white">
          Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Trusted Partners</span>
        </h2>
        <p className="text-center text-white/50 text-sm mt-2">
          Working with industry leaders
        </p>
      </div>

      {/* Infinite Scrolling Carousel */}
      <div className="relative w-full">
        <style>{`
          @keyframes scrollInfinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-540px * ${logos.length}));
            }
          }
          
          .carousel-scroll-wrapper {
            animation: scrollInfinite 60s linear infinite;
          }
          
          .carousel-scroll-wrapper:hover {
            animation-play-state: paused;
          }
          
          .carousel-content {
            display: flex;
            gap: 2rem;
            padding: 0 1rem;
          }
          
          .carousel-item {
            flex-shrink-0;
            width: 420px;
            height: 260px;
            min-width: 420px;
          }
          
          .carousel-container {
            overflow: hidden;
            position: relative;
            width: 100%;
          }
          
          .carousel-mask {
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
          }
        `}</style>

        <div className="carousel-container carousel-mask">
          <div className="carousel-scroll-wrapper">
            <div className="carousel-content">
              {/* Original logos */}
              {logos.map((logo) => (
                <div
                  key={`original-${logo.id}`}
                  className="carousel-item bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 500 300%22%3E%3Crect fill=%22%23FF6B35%22 width=%22500%22 height=%22300%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ))}
              
              {/* Duplicate for seamless infinite loop */}
              {logos.map((logo) => (
                <div
                  key={`duplicate-${logo.id}`}
                  className="carousel-item bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 group cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 500 300%22%3E%3Crect fill=%22%23FF6B35%22 width=%22500%22 height=%22300%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient overlays on sides for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none z-20" />
      </div>

      {/* Info text */}
      <div className="text-center mt-8">
        <p className="text-white/60 text-sm">
        { /*over to pause • Scroll continuously*/}
        </p>
      </div>
    </div>
  );
};

export default LogoCarousel;
