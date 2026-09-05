import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import navigation from '../../data/navigation';
import services from '../../data/services';
import siteConfig from '../../data/siteConfig';

/**
 * Footer
 * -----------------------------------------------------------------------
 * Editorial dark footer with a large logo wordmark call-to-action, sitemap
 * columns sourced from the shared navigation/services data tables, and a
 * slim credit bar.
 * -----------------------------------------------------------------------
 */
const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
];

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-ink-950 border-t border-white/5 pt-20 sm:pt-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Big CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-400 mb-4 block">
              Let's Work Together
            </span>
            <button
              onClick={() => scrollTo('contact')}
              data-cursor="hover"
              className="group flex items-center gap-4 sm:gap-6 text-left"
            >
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white leading-none">
                Start Your Story
              </h2>
              <span className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-ink-950 group-hover:rotate-45 transition-all duration-300" />
              </span>
            </button>
          </div>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            data-cursor="hover"
            className="text-white/60 hover:text-brand-400 transition-colors text-lg sm:text-xl border-b border-white/20 hover:border-brand-400 pb-1 whitespace-nowrap"
          >
            {siteConfig.contact.email}
          </a>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <img src={siteConfig.brand.logo} alt={siteConfig.brand.fullName} className="w-8 h-8 object-contain" />
              <span className="font-display text-lg tracking-widest text-white">
                {siteConfig.brand.name}
                <span className="text-brand-400">{siteConfig.brand.suffix}</span>
              </span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Fine-art photography and cinematic films, crafted in Colombo — for weddings,
              portraits and brands who value timeless imagery.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor="hover"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-brand-400 hover:border-brand-400 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-widest mb-5">Navigate</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-white/50 hover:text-brand-400 transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id} className="text-white/50 text-sm">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-white/50 hover:text-brand-400 transition-colors text-sm">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-white/50 hover:text-brand-400 transition-colors text-sm">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">{siteConfig.contact.city}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} {siteConfig.brand.fullName}. All rights reserved.
          </p>
          <p className="text-white/35 text-xs">Crafted with care in Colombo, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
