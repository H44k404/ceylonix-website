/**
 * testimonials.js
 * -----------------------------------------------------------------------
 * Local fallback testimonial table. The Testimonials section fetches
 * approved reviews from the backend API first and only uses this table
 * if that request fails or returns no approved entries.
 * -----------------------------------------------------------------------
 */

const testimonials = [
  {
    id: 1,
    name: 'Amara & Dinuk',
    role: 'Wedding Client',
    rating: 5,
    text: 'Ceylonix did not just take photographs — they captured the feeling of our entire day. Every frame feels like a painting.',
  },
  {
    id: 2,
    name: 'Sanduni Perera',
    role: 'Portrait Client',
    rating: 5,
    text: 'The most effortless, elegant portrait session I have ever had. The final gallery left me speechless.',
  },
  {
    id: 3,
    name: 'Nexus Holdings',
    role: 'Corporate Client',
    rating: 5,
    text: 'Professional, fast and beautifully composed coverage of our annual gala. Our brand has never looked this refined.',
  },
  {
    id: 4,
    name: 'Ishara & Kevin',
    role: 'Wedding Film',
    rating: 5,
    text: "We've watched our wedding film more than a dozen times. It feels like a short film, not a home video — pure cinema.",
  },
];

export default testimonials;
