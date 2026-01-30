import React, { useEffect, useState, useRef } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [brokenImages, setBrokenImages] = useState(new Set());
  const portfolioRef = useRef(null);

  // Default fallback colors for broken images
  const getPlaceholderColor = (id, isEmbed = false) => {
    if (isEmbed) {
      // Use orange gradient for embed cards to match portfolio theme
      return 'from-orange-500 to-orange-700';
    }
    const colors = ['from-orange-400 to-orange-600', 'from-purple-400 to-purple-600', 'from-blue-400 to-blue-600', 'from-pink-400 to-pink-600', 'from-green-400 to-green-600'];
    return colors[id % colors.length];
  };

  // Load items from backend API only
  useEffect(() => {
    const loadFromApi = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/portfolio');
        const json = await res.json();
        if (json && json.data) {
          setPortfolioItems(json.data);
          return;
        }
      } catch (err) {
        console.warn('Portfolio API fetch failed:', err.message);
      }
      // If API fails, show empty portfolio (no fallback to defaults)
      setPortfolioItems([]);
    };

    loadFromApi();
  }, []);

  const loadDefaultItems = () => {
    // Function removed - only show items from admin panel
  };

  // Intersection Observer for scroll detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => {
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
    };
  }, []);

  // Load Instagram embed script when section is visible
  useEffect(() => {
    if (window.instgrm && isVisible) {
      window.instgrm.Embeds.process();
    }
  }, [isVisible]);

  const handleImageError = (itemId) => {
    setBrokenImages(prev => new Set([...prev, itemId]));
  };

  const handleEmbedClick = (embedData) => {
    if (!embedData) {
      console.warn('No URL provided for embed');
      return;
    }

    // Extract the actual URL from Instagram embed HTML
    let actualUrl = embedData;
    
    // If it's HTML (contains 'data-instgrm-permalink'), extract the URL from the attribute
    if (embedData.includes('data-instgrm-permalink')) {
      const match = embedData.match(/data-instgrm-permalink="([^"]+)"/);
      if (match && match[1]) {
        actualUrl = match[1];
        // Decode HTML entities like &amp; to &
        actualUrl = actualUrl.replace(/&amp;/g, '&');
      }
    }

    // Ensure it's a valid URL
    if (!actualUrl.startsWith('http')) {
      actualUrl = `https://${actualUrl}`;
    }

    window.open(actualUrl, '_blank', 'noopener,noreferrer');
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-orange-500" />;
      case 'tiktok':
        return <span className="text-orange-500 text-sm font-bold">TT</span>;
      case 'facebook':
        return <span className="text-orange-500 text-sm font-bold">FB</span>;
      default:
        return <Instagram className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <section id="portfolio" ref={portfolioRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal opacity-0 animate-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Explore our diverse collection of photography and videography work.
            Each project showcases our commitment to excellence and creative storytelling.
          </p>
        </div>

        {/* Portfolio Grid */}
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map(item => (
              <div key={item.id} className="scroll-reveal">
                {item.isEmbed && item.embedUrl ? (
                  // Platform Embed Card
                  <div
                    onClick={() => handleEmbedClick(item.embedUrl)}
                    role="button"
                    tabIndex="0"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleEmbedClick(item.embedUrl);
                      }
                    }}
                    className="relative group h-64 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/20 cursor-pointer transition-all duration-300 hover:shadow-xl"
                  >
                    {brokenImages.has(item.id) ? (
                      <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(item.id, true)} flex items-center justify-center`}>
                        <div className="text-center">
                          <Instagram className="w-16 h-16 text-white mx-auto mb-2 opacity-50" />
                          <p className="text-white text-sm">Media Preview</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.thumbnailImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                    
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      {/* External Link Button - appears on hover */}
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-orange-500/80 hover:bg-orange-500 rounded-full p-2 transition-colors transform scale-0 group-hover:scale-100 duration-300">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      
                      {/* Title and Platform badge */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getPlatformIcon(item.platform)}
                          <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                            {item.platform}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <p className="text-white/70 text-sm">Click to view</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Photo Gallery Item
                  <div className="relative group h-64 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-600/20 hover:shadow-xl transition-all duration-300">
                    {brokenImages.has(item.id) ? (
                      <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor(item.id)} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white/20 rounded-xl mx-auto mb-2" />
                          <p className="text-white text-sm">{item.category}</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-white/70 text-sm capitalize">{item.category}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No portfolio items yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;