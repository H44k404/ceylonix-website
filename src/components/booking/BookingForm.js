import React, { useState } from 'react';
import { Calendar, Clock, Users, Camera, Film, MapPin } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Alert from '../common/Alert';
import { bookingAPI } from '../../services/api';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    eventDate: '',
    eventTime: '',
    duration: '',
    location: '',
    guestCount: '',
    budget: '',
    specialRequests: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [alert, setAlert] = useState(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone validation - at least 7 digits
    const phoneRegex = /\d{7,}/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name || formData.name.trim().length === 0) {
      errors.push('Full Name is required');
    } else if (formData.name.trim().length < 2) {
      errors.push('Full Name must be at least 2 characters');
    }

    if (!formData.email || formData.email.trim().length === 0) {
      errors.push('Email Address is required');
    } else if (!validateEmail(formData.email)) {
      errors.push('Please enter a valid Email Address');
    }

    if (!formData.phone || formData.phone.trim().length === 0) {
      errors.push('Phone Number is required');
    } else if (!validatePhone(formData.phone)) {
      errors.push('Please enter a valid Phone Number');
    }

    if (!formData.serviceType) {
      errors.push('Please select a Service Type');
    }

    if (!formData.eventDate) {
      errors.push('Event Date is required');
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.push('Event Date must be in the future');
      }
    }

    return errors;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setAlert({
        type: 'error',
        title: 'Form Validation Error',
        message: (
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )
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
          title: 'Booking Submitted Successfully!',
          message: 'Thank you for your booking request. We\'ll review your details and contact you within 24 hours with availability and pricing.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: '',
          eventDate: '',
          eventTime: '',
          duration: '',
          location: '',
          guestCount: '',
          budget: '',
          specialRequests: ''
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setFormStatus('error');
      
      // Check if error has specific field errors from backend
      if (error.errors && Array.isArray(error.errors)) {
        setAlert({
          type: 'error',
          title: 'Submission Error',
          message: (
            <ul className="list-disc list-inside space-y-1">
              {error.errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          )
        });
      } else {
        setAlert({
          type: 'error',
          title: 'Submission Failed',
          message: error.message || 'Sorry, there was an error submitting your booking. Please try again.'
        });
      }
      console.error('Booking form error:', error);
    } finally {
      setTimeout(() => setFormStatus(''), 2000);
    }
  };

  const serviceTypes = [
    { value: 'wedding', label: 'Wedding Photography/Videography' },
    { value: 'portrait', label: 'Portrait Session' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'event', label: 'Social Event' },
    { value: 'commercial', label: 'Commercial/Product Photography' }
  ];

  const durations = [
    '2 hours',
    '4 hours',
    '6 hours',
    '8 hours',
    'Full day',
    'Multiple days'
  ];

  const budgets = [
    'Under $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000+',
    'Custom quote needed'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="text-center mb-12 scroll-reveal">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          <span className="text-white">Book Your </span>
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Session
          </span>
        </h2>
        <p className="text-white/80 text-xl">
          Ready to capture your special moments? Fill out the form below and we'll get back to you with availability and pricing.
        </p>
      </div>

      <Card className="scroll-reveal p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-white font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="+94 XX XXX XXXX"
              required
            />
          </div>

          {/* Service Details */}
          <div>
            <label htmlFor="serviceType" className="block text-white font-medium mb-2">
              Service Type *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Select a service</option>
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value} className="bg-gray-800">
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventDate" className="block text-white font-medium mb-2">
                Event Date *
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="eventTime" className="block text-white font-medium mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="block text-white font-medium mb-2">
                Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select duration</option>
                {durations.map(duration => (
                  <option key={duration} value={duration} className="bg-gray-800">
                    {duration}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-white font-medium mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Approximate number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-white font-medium mb-2">
              Event Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Venue name and address"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-white font-medium mb-2">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select budget range</option>
              {budgets.map(budget => (
                <option key={budget} value={budget} className="bg-gray-800">
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="specialRequests" className="block text-white font-medium mb-2">
              Special Requests or Details
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Any special requirements, themes, or additional details..."
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              disabled={formStatus === 'sending'}
              size="large"
            >
              {formStatus === 'sending' ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
            <p className="text-white/60 text-sm mt-4">
              We'll review your request and get back to you within 24 hours with availability and pricing details.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookingForm;