import React from 'react';
import Gallery from '../common/Gallery';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      type: 'photo',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      title: 'Elegant Wedding Ceremony'
    },
    {
      id: 2,
      type: 'video',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
      title: 'Corporate Brand Film'
    },
    {
      id: 3,
      type: 'photo',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
      title: 'Studio Portrait Session'
    },
    {
      id: 4,
      type: 'photo',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      title: 'Destination Wedding'
    },
    {
      id: 5,
      type: 'video',
      category: 'event',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      title: 'Live Event Coverage'
    },
    {
      id: 6,
      type: 'photo',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      title: 'Outdoor Portrait'
    },
    {
      id: 7,
      type: 'photo',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      title: 'Team Building Event'
    },
    {
      id: 8,
      type: 'video',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      title: 'Wedding Highlight Reel'
    },
    {
      id: 9,
      type: 'photo',
      category: 'event',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
      title: 'Birthday Celebration'
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
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

        <Gallery items={portfolioItems} columns={3} />
      </div>
    </section>
  );
};

export default Portfolio;