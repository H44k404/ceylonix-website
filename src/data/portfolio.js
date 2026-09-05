/**
 * portfolio.js
 * -----------------------------------------------------------------------
 * Local fallback portfolio table used when the backend API has no items
 * yet (fresh installs, offline demos). The Portfolio section still tries
 * the live API first — see services/api.js — and only falls back to this
 * table if the request fails or returns empty.
 * -----------------------------------------------------------------------
 */

const portfolioCategories = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'portrait', label: 'Portraits' },
  { id: 'events', label: 'Events' },
];

const portfolioItems = [
  { id: 1, category: 'wedding', title: 'Golden Hour Vows', image: '/images/portfolio/wedding/wedding-1.jpg' },
  { id: 2, category: 'wedding', title: 'The Long Aisle', image: '/images/portfolio/wedding/wedding-2.jpg' },
  { id: 3, category: 'wedding', title: 'Ring Detail', image: '/images/portfolio/wedding/wedding-3.jpg' },
  { id: 4, category: 'portrait', title: 'Studio Portrait I', image: '/images/portfolio/portrait/portrait-1.jpg' },
  { id: 5, category: 'portrait', title: 'Editorial Light', image: '/images/portfolio/portrait/portrait-2.jpg' },
  { id: 6, category: 'portrait', title: 'Monochrome Study', image: '/images/portfolio/portrait/portrait-3.png' },
  { id: 7, category: 'events', title: 'Stage Presence', image: '/images/portfolio/events/event-1.jpg' },
  { id: 8, category: 'events', title: 'After Dark', image: '/images/portfolio/events/event-2.jpg' },
  { id: 9, category: 'events', title: 'Corporate Gala', image: '/images/portfolio/events/event-3.jpg' },
];

export { portfolioCategories };
export default portfolioItems;
