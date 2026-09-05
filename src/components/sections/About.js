import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import stats from '../../data/stats';

/**
 * AnimatedCounter
 * -----------------------------------------------------------------------
 * Counts from 0 to `value` once the element enters the viewport.
 * -----------------------------------------------------------------------
 */
const AnimatedCounter = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="numeral text-4xl sm:text-5xl text-white">
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-ink-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Image cluster */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="/images/about/about-story.jpg"
                  alt="Ceylonix.CMB behind the scenes"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-white/10" />
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.25} className="absolute -bottom-10 -right-6 sm:-right-10 w-40 sm:w-56">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border-4 border-ink-950 shadow-2xl shadow-black/60">
                <img
                  src="/images/about/about-detail.jpg"
                  alt="Ceylonix.CMB studio detail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal
              delay={0.4}
              className="absolute -top-6 -left-4 sm:-left-8 bg-ink-900/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3"
            >
              <span className="numeral text-3xl text-brand-400">{new Date().getFullYear() - 2019}+</span>
              <span className="text-white/70 text-xs uppercase tracking-widest leading-tight">
                Years of<br />Storytelling
              </span>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-brand-400/70" />
                <span className="text-xs uppercase tracking-[0.4em] text-brand-400 font-medium">
                  The Studio
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-serif font-medium leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-white mb-8">
                We don't just take photographs —
                <span className="text-gradient-gold italic"> we preserve feeling.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                {' '}
                Ceylonix.CMB is a boutique photography and cinematography studio based in
                Colombo, Sri Lanka. For over seven years we have crafted intimate,
                editorial-grade imagery for couples, individuals and brands who want
                their story told with restraint, elegance and honesty.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl">
                Every session begins with a conversation, not a checklist. We work in
                natural light wherever possible, favour candid moments over posed
                perfection, and finish every frame by hand — so what you receive feels
                like a piece of art, not a product.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
                {stats.map((stat) => {
                  const Icon = Icons[stat.icon] || Icons.Camera;
                  return (
                    <div key={stat.id}>
                      <Icon className="w-5 h-5 text-brand-400 mb-3" strokeWidth={1.5} />
                      <div>
                        <AnimatedCounter value={stat.numericValue} suffix={stat.suffix} />
                      </div>
                      <div className="text-white/45 text-xs uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <Button variant="outline" data-cursor="hover">
                Meet the Team
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Decorative faint watermark word */}
      <motion.div
        aria-hidden
        className="hidden lg:block absolute -bottom-16 left-0 right-0 text-center select-none pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <span className="font-serif text-[14rem] leading-none text-white">Craft</span>
      </motion.div>
    </section>
  );
};

export default About;
