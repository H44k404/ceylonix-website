import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import services from '../../data/services';

/**
 * Services
 * -----------------------------------------------------------------------
 * Editorial "accordion list" layout: each service is a horizontal row
 * that expands on hover (desktop) to reveal a preview photograph, in the
 * style of high-end studio websites. Falls back to a static stacked card
 * layout with always-visible imagery on touch devices.
 * -----------------------------------------------------------------------
 */
const Services = () => {
  const [activeId, setActiveId] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-ink-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Crafted for"
          highlight="Every Chapter"
          description="From the first look to the final frame, every service is delivered with the same editorial discipline and hands-on artistry."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* List */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {services.map((service, index) => {
              const Icon = Icons[service.icon] || Icons.Camera;
              const isActive = activeId === service.id;
              return (
                <Reveal key={service.id} delay={index * 0.08}>
                  <button
                    data-cursor="hover"
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    className={`group w-full text-left border-t border-white/10 py-7 sm:py-8 transition-colors duration-300 ${
                      index === services.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="flex items-center gap-5 sm:gap-8">
                      <span
                        className={`numeral text-2xl sm:text-3xl transition-colors duration-300 ${
                          isActive ? 'text-brand-400' : 'text-white/30'
                        }`}
                      >
                        {service.number}
                      </span>

                      <div className="flex-1">
                        <h3
                          className={`font-serif text-2xl sm:text-3xl lg:text-4xl transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/60'
                          }`}
                        >
                          {service.title}
                        </h3>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-white/55 text-sm sm:text-base leading-relaxed mt-3 max-w-lg lg:hidden">
                                {service.description}
                              </p>
                              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4 lg:hidden">
                                {service.features.map((feature) => (
                                  <li key={feature} className="text-white/40 text-xs uppercase tracking-widest">
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <Icon
                        className={`hidden sm:block w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                          isActive ? 'text-brand-400 scale-110' : 'text-white/30'
                        }`}
                        strokeWidth={1.5}
                      />
                      <ArrowUpRight
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                          isActive ? 'text-brand-400 rotate-0' : 'text-white/20 -rotate-45'
                        }`}
                      />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Sticky image preview (desktop only) */}
          <div className="hidden lg:block lg:col-span-5 order-1 lg:order-2">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeService.id}
                    src={activeService.image}
                    alt={activeService.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {activeService.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {activeService.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-white/60 text-[11px] uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
