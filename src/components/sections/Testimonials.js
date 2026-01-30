import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import Card from '../common/Card';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/testimonials');
        const json = await res.json();
        if (json && json.data) {
          // Only show approved testimonials on the public site
          const approved = json.data.filter(t => t.approved === true || t.approved === 'true');
          setTestimonials(approved);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Testimonials API fetch failed:', err.message);
      }

      // If API fails, show empty testimonials (no fallback)
      setTestimonials([]);
      setLoading(false);
    };

    loadTestimonials();
  }, []);

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
        />
      ))}
    </div>
  );

  const AvatarWithInitials = ({ name }) => {
    const getInitials = (name) => {
      return name
        .trim()
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const colors = [
      'from-orange-500 to-red-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-purple-500'
    ];

    // Generate consistent color based on name length
    const colorIndex = name.length % colors.length;

    return (
      <div 
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[colorIndex]} mr-4 flex items-center justify-center shadow-lg ring-2 ring-white/20`}
      >
        <span className="text-white font-bold text-base">
          {getInitials(name)}
        </span>
      </div>
    );
  };

  // Decode common HTML entities so stored content like &#039; renders as an apostrophe
  const decodeHtmlEntities = (html) => {
    if (!html) return '';
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const decoded = doc.documentElement.textContent || '';
      // Fallback: replace common apostrophe entities if still present
      return decoded.replace(/&amp;#0*39;|&#0*39;|&apos;/g, "'");
    } catch (e) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value.replace(/&amp;#0*39;|&#0*39;|&apos;/g, "'");
    }
  };

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Client </span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say
            about their experience working with Ceylonix.CMB.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <Card key={index} className="scroll-reveal p-6 relative hover:transform hover:scale-105 transition-all duration-300">
                <Quote className="w-8 h-8 text-orange-500/30 absolute top-4 right-4" />

                <div className="flex items-center mb-4">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-orange-500/50"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.avatar-fallback').style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback avatar with initials */}
                  <div 
                    className="avatar-fallback"
                    style={{ display: testimonial.image ? 'none' : 'flex' }}
                  >
                    <AvatarWithInitials name={testimonial.name} />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} />

                <p className="text-white/80 mt-4 leading-relaxed italic text-sm">
                  {decodeHtmlEntities(testimonial.text)}
                </p>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white/60 text-lg">
                {loading ? 'Loading testimonials...' : 'No testimonials yet. Check back soon!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;