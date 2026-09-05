import React from 'react';
import BookingForm from '../booking/BookingForm';

/**
 * Booking
 * -----------------------------------------------------------------------
 * Thin section wrapper for the BookingForm component, styled to match
 * the surrounding luxury editorial theme (dark ink background).
 * -----------------------------------------------------------------------
 */
const Booking = () => (
  <section id="booking" className="relative py-28 sm:py-36 bg-ink-900">
    <BookingForm />
  </section>
);

export default Booking;
