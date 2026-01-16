import React from 'react';
import { ChevronDown, Play } from 'lucide-react';
import Button from '../common/Button';

const Hero = ({ onNavigate }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-10" />
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="vintage-grain absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="scroll-reveal">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white">Capturing</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Life's Moments
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional photography and videography services that tell your unique story
            with creativity, passion, and artistic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={() => onNavigate('portfolio')}
              size="large"
            >
              View Our Work
            </Button>
            <Button
              variant="secondary"
              onClick={() => onNavigate('booking')}
              size="large"
            >
              <Play className="w-5 h-5 mr-2" />
              Book a Session
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="text-white/60 hover:text-white transition-colors animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;