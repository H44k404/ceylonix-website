import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import localTestimonials from '../../data/testimonials';
import siteConfig from '../../data/siteConfig';

import 'swiper/css';
import 'swiper/css/effect-fade';

/**
 * Testimonials
 * -----------------------------------------------------------------------
 * Single large "journal entry" style testimonial slider (one quote at a
 * time, fade transition) — feels editorial rather than a generic card
 * grid. Falls back to the local testimonials table if the API has no
 * approved reviews.
 * -----------------------------------------------------------------------
 */
const getInitials = (name = '') =>
  name.trim().split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const avatarPalette = [
  'from-brand-500 to-gold-500',
  'from-gold-400 to-brand-600',
  'from-brand-400 to-brand-700',
  'from-gold-300 to-gold-700',
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(localTestimonials);
  const swiperRef = useRef(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch(`${siteConfig.api.baseUrl}/testimonials`);
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
          const approved = json.data.filter((t) => t.approved === true || t.approved === 'true');
          if (approved.length > 0) setTestimonials(approved);
        }
      } catch (err) {
        // Fall back silently to local testimonials table
      }
    };
    loadTestimonials();
  }, []);

  return (
    <section id="testimonials" className="relative py-28 sm:py-36 bg-ink-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Client Journal"
          title="Kind Words From"
          highlight="Our Clients"
        />

        <Reveal className="relative">
          <Quote className="w-14 h-14 sm:w-16 sm:h-16 text-brand-500/20 mx-auto mb-6" strokeWidth={1} />

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={testimonials.length > 1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id || t.name}>
                <div className="text-center px-2 sm:px-10">
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (t.rating || 5) ? 'text-gold-400 fill-current' : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-8 max-w-3xl mx-auto">
                    "{t.text}"
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/40"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                          avatarPalette[(t.name || '').length % avatarPalette.length]
                        } flex items-center justify-center text-ink-950 font-semibold text-sm`}
                      >
                        {getInitials(t.name)}
                      </div>
                    )}
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">{t.name}</div>
                      <div className="text-white/45 text-xs uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                data-cursor="hover"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-brand-400 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                data-cursor="hover"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-brand-400 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
