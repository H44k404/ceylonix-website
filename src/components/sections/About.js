import React from 'react';
import { Award, Users, Camera } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, value: '500+', label: 'Projects Completed' },
    { icon: Users, value: '200+', label: 'Happy Clients' },
    { icon: Camera, value: '50K+', label: 'Photos Captured' }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Ceylonix.CMB
              </span>
            </h2>

            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              We are a premier photography and videography studio based in Colombo,
              specializing in capturing life's most precious moments. With over 5 years
              of experience, we combine artistic vision with technical excellence to
              create timeless memories.
            </p>

            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Our passion lies in storytelling through visual media. Whether it's the
              joy of a wedding day, the energy of a corporate event, or the intimacy
              of a portrait session, we approach each project with creativity,
              professionalism, and attention to detail.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="scroll-reveal">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden image-hover-zoom">
                <img
                  src="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=80"
                  alt="Ceylonix.CMB Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-2xl">
                <div className="text-3xl font-bold mb-1">5+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;