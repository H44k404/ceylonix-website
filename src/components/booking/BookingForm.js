import React, { useState } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Reveal from '../common/Reveal';
import SectionHeading from '../common/SectionHeading';
import { bookingAPI } from '../../services/api';

/**
 * BookingForm
 * -----------------------------------------------------------------------
 * Multi-field session enquiry form, restyled with underline inputs to
 * match the luxury editorial theme. Validation and API wiring preserved
 * from the original implementation.
 * -----------------------------------------------------------------------
 */
const serviceTypes = [
  { value: 'wedding', label: 'Wedding Photography / Film' },
  { value: 'portrait', label: 'Portrait Session' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'event', label: 'Social Event' },
  { value: 'commercial', label: 'Commercial / Product' },
];

const durations = ['2 hours', '4 hours', '6 hours', '8 hours', 'Full day', 'Multiple days'];
const budgets = ['Under $500', '$500 – $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000+', 'Custom quote'];

const Field = ({ label, children }) => (
  <div>
    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{label}</label>
    {children}
  </div>
);

const inputClass =
  'w-full bg-transparent border-b border-white/20 pb-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-400 transition-colors duration-300';

const selectClass = `${inputClass} [&>option]:bg-ink-900 [&>option]:text-white`;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceType: '', eventDate: '', eventTime: '',
    duration: '', location: '', guestCount: '', budget: '', specialRequests: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [alert, setAlert] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /\d{7,}/.test(phone.replace(/\D/g, ''));

  const validateForm = () => {
    const errors = [];
    if (!formData.name.trim() || formData.name.trim().length < 2) errors.push('Full Name is required');
    if (!formData.email.trim() || !validateEmail(formData.email)) errors.push('A valid Email Address is required');
    if (!formData.phone.trim() || !validatePhone(formData.phone)) errors.push('A valid Phone Number is required');
    if (!formData.serviceType) errors.push('Please select a Service Type');
    if (!formData.eventDate) {
      errors.push('Event Date is required');
    } else {
      const selected = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errors.push('Event Date must be in the future');
    }
    return errors;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setAlert({
        type: 'error',
        title: 'Form Validation Error',
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
      const data = await bookingAPI.submit(formData);
      if (data.success) {
        setFormStatus('success');
        setAlert({
          type: 'success',
          title: 'Booking Submitted',
          message: "Thank you — we'll confirm availability and pricing within 24 hours.",
        });
        setFormData({
          name: '', email: '', phone: '', serviceType: '', eventDate: '', eventTime: '',
          duration: '', location: '', guestCount: '', budget: '', specialRequests: '',
        });
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
    <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
      {alert && (
        <Alert type={alert.type} title={alert.title} message={alert.message} onClose={() => setAlert(null)} />
      )}

      <SectionHeading
        eyebrow="Reserve Your Date"
        title="Book Your"
        highlight="Session"
        description="Share a few details about your day and we'll follow up with availability, pricing, and next steps."
      />

      <Reveal>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid sm:grid-cols-2 gap-10">
            <Field label="Full Name *">
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your full name" required />
            </Field>
            <Field label="Email Address *">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <Field label="Phone Number *">
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+94 XX XXX XXXX" required />
            </Field>
            <Field label="Service Type *">
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} className={selectClass} required>
                <option value="">Select a service</option>
                {serviceTypes.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <Field label="Event Date *">
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Preferred Time">
              <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} className={inputClass} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <Field label="Duration">
              <select name="duration" value={formData.duration} onChange={handleChange} className={selectClass}>
                <option value="">Select duration</option>
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="Number of Guests">
              <input type="number" name="guestCount" min="1" value={formData.guestCount} onChange={handleChange} className={inputClass} placeholder="Approximate number" />
            </Field>
          </div>

          <Field label="Event Location">
            <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Venue name and address" />
          </Field>

          <Field label="Budget Range">
            <select name="budget" value={formData.budget} onChange={handleChange} className={selectClass}>
              <option value="">Select budget range</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="Special Requests or Details">
            <textarea
              name="specialRequests"
              rows={4}
              value={formData.specialRequests}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="Any special requirements, themes, or additional details..."
            />
          </Field>

          <div className="text-center pt-4">
            <Button type="submit" disabled={formStatus === 'sending'} size="large" data-cursor="hover">
              {formStatus === 'sending' ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
            <p className="text-white/40 text-sm mt-5">
              We'll review your request and respond within 24 hours with availability and pricing.
            </p>
          </div>
        </form>
      </Reveal>
    </div>
  );
};

export default BookingForm;
