import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Alert from '../common/Alert';
import { contactAPI } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [alert, setAlert] = useState(null);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!formData.message || formData.message.trim().length === 0) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
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

      const data = await contactAPI.submit(formData);

      if (data.success) {
        setFormStatus('success');
        setAlert({
          type: 'success',
          title: 'Message Sent Successfully!',
          message: 'Thank you for reaching out. We\'ll review your message and get back to you as soon as possible.'
        });
        setFormData({ name: '', email: '', message: '' });
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
          message: error.message || 'Sorry, there was an error sending your message. Please try again.'
        });
      }
      console.error('Contact form error:', error);
    } finally {
      setTimeout(() => setFormStatus(''), 2000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@ceylonix.cmb',
      link: 'mailto:hello@ceylonix.cmb'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+94 11 234 5678',
      link: 'tel:+94112345678'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Colombo, Sri Lanka',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Get In </span>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Ready to capture your special moments? Let's discuss your photography
            or videography needs. We're here to bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="scroll-reveal p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message/feedback *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full"
              >
                {formStatus === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="scroll-reveal">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-white/80 mb-8">
                Ready to start your project? Get in touch with us using any of the methods below.
                We typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="scroll-reveal p-6 hover-lift">
                  <a
                    href={info.link}
                    className="flex items-center space-x-4 text-white hover:text-orange-400 transition-colors"
                  >
                    <div className="bg-orange-500/20 rounded-full p-3">
                      <info.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.title}</h4>
                      <p className="text-white/70">{info.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;