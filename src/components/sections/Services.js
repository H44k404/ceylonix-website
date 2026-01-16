import React from 'react';
import { Camera, Film, Users, Award } from 'lucide-react';
import Card from '../common/Card';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography',
      description: 'Capturing your special day with timeless elegance and artistic vision. From intimate ceremonies to grand celebrations.',
      features: ['Full Day Coverage', 'High-Resolution Images', 'Online Gallery', 'Print Releases']
    },
    {
      icon: Film,
      title: 'Cinematic Videography',
      description: 'Creating stunning films that tell your unique story with emotion and style. Professional editing and color grading.',
      features: ['4K Video Recording', 'Professional Editing', 'Sound Design', 'Multiple Angles']
    },
    {
      icon: Users,
      title: 'Portrait Sessions',
      description: 'Professional portraits that showcase personality and character beautifully. Studio and location shoots available.',
      features: ['Studio Sessions', 'Location Shoots', 'Wardrobe Consultation', 'Retouching']
    },
    {
      icon: Award,
      title: 'Corporate Events',
      description: 'Premium coverage for your business events and corporate functions. Brand-consistent visual storytelling.',
      features: ['Event Documentation', 'Brand Integration', 'Quick Turnaround', 'Multi-Platform Delivery']
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Comprehensive photography and videography solutions tailored to your unique needs
            and vision. We bring creativity and professionalism to every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="scroll-reveal p-6 text-center">
              <div className="bg-orange-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <service.icon className="w-8 h-8 text-orange-500" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/70 mb-4 leading-relaxed">{service.description}</p>

              <ul className="text-left space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-white/60 text-sm flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;