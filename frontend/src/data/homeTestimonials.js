/** Fallback testimonials for homepage carousel when DB has fewer entries */
export const HOME_TESTIMONIAL_FALLBACKS = [
  {
    _id: 'fallback-maria-james',
    customerName: 'Maria & James',
    eventType: 'Wedding',
    rating: 5,
    review:
      'From setup to teardown, everything was flawless. Our guests are still talking about the photo booth weeks later. The custom template matched our wedding colors perfectly.',
  },
  {
    _id: 'fallback-amanda',
    customerName: 'Amanda Rodriguez',
    eventType: 'Bridal Shower',
    rating: 5,
    review:
      'Roger made our bridal shower so much fun! The props were hilarious and the instant text-to-share feature let everyone post photos right away. Absolutely worth it.',
  },
  {
    _id: 'fallback-tyler',
    customerName: 'Tyler Brooks',
    eventType: 'Graduation Party',
    rating: 5,
    review:
      'We booked Red Rose for my son\'s graduation and it was a huge hit. Professional service, beautiful prints, and Roger was incredibly helpful throughout the entire process.',
  },
  {
    _id: 'fallback-lisa-robert',
    customerName: 'Lisa & Robert',
    eventType: 'Anniversary Celebration',
    rating: 5,
    review:
      'Our 25th anniversary party felt extra special with Red Rose Photo Booth. Elegant setup, friendly attendant, and photo strips our family will treasure forever.',
  },
  {
    _id: 'fallback-marcus',
    customerName: 'Marcus Thompson',
    eventType: 'Corporate Event',
    rating: 5,
    review:
      'Red Rose delivered a polished experience for our brand launch. Custom branding on every photo strip and seamless guest flow. Our team was impressed.',
  },
  {
    _id: 'fallback-david',
    customerName: 'David Chen',
    eventType: 'Birthday Party',
    rating: 5,
    review:
      'My daughter\'s sweet sixteen was unforgettable thanks to Red Rose Photo Booth. The props were amazing and the attendant kept everyone engaged. Photos turned out beautifully!',
  },
];

export function mergeHomeTestimonials(apiTestimonials, minCount = 6) {
  const merged = [...apiTestimonials];

  for (const fallback of HOME_TESTIMONIAL_FALLBACKS) {
    if (merged.length >= minCount) break;

    const exists = merged.some(
      (t) =>
        t.customerName === fallback.customerName &&
        t.eventType === fallback.eventType
    );

    if (!exists) merged.push(fallback);
  }

  return merged.slice(0, 8);
}
