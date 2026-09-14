/** Fallback testimonials for homepage carousel when DB has fewer entries */
export const HOME_TESTIMONIAL_FALLBACKS = [
  {
    _id: 'fallback-erin-daley-pontari',
    customerName: 'Erin Daley Pontari',
    eventType: 'Wedding',
    rating: 5,
    review:
      'I highly recommend Roger to anyone looking for someone to help capture the special memories from their wedding day! He was professional, dependable, and arrived right on time. Throughout the day, he captured so many wonderful moments of us and our guests that we will be able to look back on for years to come. He stayed until the reception was completely over, making sure he didn\'t miss anything and that I was fully happy as the bride before leaving. His dedication and attention to detail meant so much to us. We truly enjoyed having him there and are so grateful for the memories he helped preserve from our special day! Thank you so much',
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
