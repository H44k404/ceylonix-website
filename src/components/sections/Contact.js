import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import { contactAPI } from '../../services/api';
import siteConfig from '../../data/siteConfig';

/**
 * Contact
 * -----------------------------------------------------------------------
 * Editorial split layout: a minimal, underline-style enquiry form on one
 * side and studio contact details + hours on the other, set against a
 * full-bleed photographic background.
 * -----------------------------------------------------------------------
 */
const contactInfo = [
  { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: 'Phone', value: siteConfig.contact.phoneDisplay, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Studio', value: siteConfig.contact.city, href: '#' },
  { icon: Clock, label: 'Hours', value: siteConfig.contact.hours, href: '#' },
];

const FormField = ({ label, ...props }) => (
  <div className="relative group">
    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{label}</label>
    {props.as === 'textarea' ? (
      <textarea
        {...props}
        className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-400 transition-colors duration-300 resize-none"
      />
    ) : (
      <input
        {...props}
        className="w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-400 transition-colors duration-300"
      />
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [alert, setAlert] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim() || formData.name.trim().length < 2) errors.push('Full Name is required');
    if (!formData.email.trim() || !validateEmail(formData.email)) errors.push('A valid Email Address is required');
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errors.push('Message must be at least 10 characters long');
    return errors;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setAlert({
        type: 'error',
        title: 'Please check your details',
        message: (
          <ul className="list-disc list-inside space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        ),
      });
      return;
    }

    try {
      setFormStatus('sending');
      const data = await contactAPI.submit(formData);
      if (data.success) {
        setFormStatus('success');
        setAlert({
          type: 'success',
          title: 'Message Sent',
          message: "Thank you for reaching out — we'll be in touch within 24 hours.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setFormStatus('error');
      setAlert({
        type: 'error',
        title: 'Submission Failed',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setTimeout(() => setFormStatus(''), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-ink-950 overflow-hidden">
      {/* Background accent image, faded */}
      <div className="absolute inset-0 opacity-[0.08]">
        <img src="/images/contact/contact-bg.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/95 to-ink-950" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {alert && (
          <Alert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />
        )}

        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Create Something"
          highlight="Timeless"
          description="Tell us about your day, your vision, or your brand — we typically respond within 24 hours."
        />

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Form */}
          <Reveal direction="left" className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid sm:grid-cols-2 gap-10">
                <FormField
                  label="Full Name *"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <FormField
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <FormField
                as="textarea"
                label="Tell us about your project *"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Wedding date, venue, style you love..."
                required
              />
              <Button type="submit" disabled={formStatus === 'sending'} data-cursor="hover">
                {formStatus === 'sending' ? (
                  'Sending...'
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Enquiry
                  </span>
                )}
              </Button>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-5 lg:pl-6">
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  data-cursor="hover"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 group-hover:border-brand-400 group-hover:bg-brand-500/10 transition-all duration-300">
                    <info.icon className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-white group-hover:text-brand-300 transition-colors">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
