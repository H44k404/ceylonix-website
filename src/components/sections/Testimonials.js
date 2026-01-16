import React from 'react';
import { Star, Quote } from 'lucide-react';
import Card from '../common/Card';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah & Michael',
      role: 'Wedding Clients',
      text: 'Ceylonix captured our wedding day beyond our wildest dreams. Every moment was perfect! The attention to detail and artistic vision made our photos absolutely stunning.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80'
    },
    {
      name: 'Tech Solutions Inc',
      role: 'Corporate Client',
      text: 'Outstanding professionalism and creativity. Our corporate video exceeded all expectations. The team was punctual, communicative, and delivered high-quality results.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80'
    },
    {
      name: 'Emma Williams',
      role: 'Portrait Client',
      text: 'The portrait session was comfortable and fun. The results were absolutely stunning! I couldn\'t be happier with how my personality shone through in the photos.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
    },
    {
      name: 'David Chen',
      role: 'Event Organizer',
      text: 'Professional, reliable, and incredibly talented. They captured the energy of our corporate event perfectly. Highly recommend for any event photography needs.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="scroll-reveal p-6 relative">
              <Quote className="w-8 h-8 text-orange-500/30 absolute top-4 right-4" />

              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <StarRating rating={testimonial.rating} />

              <p className="text-white/80 mt-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;