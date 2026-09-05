/**
 * siteConfig.js
 * -----------------------------------------------------------------------
 * Central brand & site configuration table.
 * Update studio name, tagline, contact details and social links here —
 * every component reads from this single source of truth.
 * -----------------------------------------------------------------------
 */

const siteConfig = {
  brand: {
    name: 'Ceylonix',
    suffix: '.CMB',
    fullName: 'Ceylonix.CMB',
    tagline: 'Fine Art Photography & Cinematic Films',
    logo: '/images/logo.png',
    established: '2019',
  },

  contact: {
    email: 'hello@ceylonix.cmb',
    phone: '+94 11 234 5678',
    phoneDisplay: '+94 11 234 5678',
    whatsapp: '94112345678',
    address: 'No. 24, Marine Drive, Colombo 03',
    city: 'Colombo, Sri Lanka',
    hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
  },

  social: {
    instagram: 'https://instagram.com/ceylonix.cmb',
    facebook: 'https://facebook.com/ceylonix.cmb',
    youtube: 'https://youtube.com/@ceylonix.cmb',
    tiktok: 'https://tiktok.com/@ceylonix.cmb',
  },

  seo: {
    title: 'Ceylonix.CMB — Luxury Photography & Cinematic Films in Colombo',
    description:
      'Ceylonix.CMB is a premier fine-art photography and videography studio based in Colombo, Sri Lanka — specializing in weddings, portraits and cinematic storytelling.',
  },

  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  },
};

export default siteConfig;
