/**
 * services.js
 * -----------------------------------------------------------------------
 * Data table describing each service offering. Consumed by the Services
 * section. `icon` references a lucide-react icon component name that is
 * resolved in the component (kept as a string here so this file stays a
 * pure, framework-agnostic data table).
 * -----------------------------------------------------------------------
 */

const services = [
  {
    id: 'wedding',
    icon: 'Heart',
    number: '01',
    title: 'Wedding Photography',
    description:
      'Timeless, editorial coverage of your wedding day — from quiet morning preparations to the last dance, told with cinematic light and honest emotion.',
    features: ['Full-day coverage', 'Two lead photographers', 'Heirloom albums', 'Private online gallery'],
    image: '/images/portfolio/wedding/wedding-1.jpg',
  },
  {
    id: 'film',
    icon: 'Film',
    number: '02',
    title: 'Cinematic Films',
    description:
      'Documentary-style wedding and brand films shot on cinema glass, cut with a score that lets the story breathe — built to be watched again and again.',
    features: ['4K / 6K capture', 'Licensed sound design', 'Highlight + feature film', 'Drone coverage'],
    image: '/images/portfolio/craft/craft-3.jpg',
  },
  {
    id: 'portrait',
    icon: 'Users',
    number: '03',
    title: 'Portrait & Editorial',
    description:
      'Studio and location portrait sessions for individuals, couples and families — directed with a light touch so every portrait feels effortless.',
    features: ['Studio & on-location', 'Wardrobe guidance', 'Fine-art retouching', 'Same-week previews'],
    image: '/images/portfolio/portrait/portrait-1.jpg',
  },
  {
    id: 'corporate',
    icon: 'Building2',
    number: '04',
    title: 'Corporate & Events',
    description:
      'Premium visual coverage for brand launches, galas and corporate milestones — delivered fast, on-brand and ready for every platform.',
    features: ['Event documentation', 'Executive headshots', '24-hour turnaround', 'Multi-platform delivery'],
    image: '/images/portfolio/events/event-1.jpg',
  },
];

export default services;
