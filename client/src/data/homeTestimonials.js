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
    _id: 'fallback-darlene-d',
    customerName: 'Darlene D.',
    eventType: 'Wedding',
    rating: 5,
    review:
      'Shining Star Video was our choice for our wedding-day videography, and Roger did not disappoint! We were Roger\'s first digital video clients back in 2003. From our very first meeting, he never felt like just a vendor—he felt like family. Roger was not only on time—he was extremely early! His attire and demeanor were very professional, and the service he provided throughout our wedding was wonderful. He was friendly, thoughtful, and made everyone feel comfortable and at ease. We still watch our wedding DVD every anniversary and love all the special effects and personal touches he incorporated into our video. A couple who attended our wedding also used Roger for their wedding, and he even included clips of them from our wedding in their wedding DVD. It was such a beautiful and personal touch! Now that Roger has Red Rose Photo Booth, I\'m sure he will bring that same professionalism, work ethic, attention to detail, and friendly personality to every event. Roger has such a joyful and upbeat energy that makes people feel comfortable, excited, and ready to have lots of fun! He has a way of making people smile, laugh, relax, and simply enjoy themselves. If you\'re looking for a photo booth company for your wedding or special event, I\'m confident Red Rose Photo Booth is one you\'ll want to consider. Based on our experience with Roger, I\'m sure he\'ll bring that same energy and care to every event, making sure you and your guests have a great time while capturing memories you\'ll be able to look back on for years to come.',
  },
  {
    _id: 'fallback-ingrid-clark',
    customerName: 'Ingrid Clark',
    eventType: 'Wedding',
    rating: 5,
    review:
      'Roger photographed our wedding in 2007, and even after all these years, I still remember how wonderful he was to work with. From the beginning, Roger was professional, personable, patient, and made us feel completely comfortable in front of the camera. On a day that can easily become overwhelming, he helped everything feel natural and easy while making sure the important moments were captured. What means even more to me now is being able to look back at those photographs almost 20 years later. They aren\'t simply pictures from our wedding day — they\'re memories of the people, emotions, and moments that made that day special. Roger gave us something that has truly stood the test of time. Photography is about more than knowing how to take a beautiful picture. It\'s about connecting with people, making them comfortable, paying attention to the moments happening around you, and understanding that you\'re preserving something they may treasure for the rest of their lives. Roger has that ability. I wouldn\'t hesitate to recommend Roger to anyone looking for someone who genuinely cares about the people he\'s working with and the memories he\'s helping them create. Nearly two decades later, I\'m still grateful that he was the person behind the camera on our wedding day. Knowing how much we loved having Roger as our wedding photographer, I truly believe Red Rose Photo Booth is a perfect fit for him. He has a natural way of making people feel comfortable, bringing out their smiles, and making the experience fun while still capturing those special moments. I know he will bring that same care and personal touch to every couple, family, and guest he works with through Red Rose Photo Booth. I would absolutely recommend him for anyone\'s special day.',
  },
  {
    _id: 'fallback-cousins-wedding-guest',
    customerName: 'Verified Wedding Guest',
    eventType: 'Wedding',
    rating: 5,
    review:
      'I had the absolute best experience with Roger and his Red Rose Photo Booth LLC! They were such a wonderful addition to our cousin\'s wedding and made the celebration even more fun and memorable. I\'ve known Roger personally, so I already knew how amazing and caring he is, but seeing how professionally he handled everything made the experience even better. The photo booth setup was beautiful, the pictures came out AMAZING, and the props made it so much fun for everyone. Our entire family had such a great time taking pictures, laughing, and creating memories together. It honestly became one of the highlights of the wedding! I would 100% recommend Roger and his Red Rose Photo Booth LLC for any wedding, birthday, or special event. You can tell he genuinely cares about making people happy and making sure everyone has an unforgettable experience. Thank you for capturing such fun memories for us. We absolutely loved it!',
    eventImage: {
      url: '/testimonials/cousins-wedding-guest.jpg',
      alt: 'Wedding guests enjoying the Red Rose Photo Booth with themed props',
    },
  },
  {
    _id: 'fallback-camille-sutton',
    customerName: 'Mrs. Camille Sutton',
    eventType: 'Birthdays',
    rating: 5,
    review:
      'Red Rose Photo Booth was such a fun birthday party addition. The kids loved posing with the props and having 2 photo strips made it easy for friends to share a memento. The digital backdrops made it so we could do several different looks all in one. Roger was so helpful and available the whole party to assist everyone in getting the perfect shot.',
    eventImages: [
      {
        url: '/testimonials/camille-sutton-birthday-1.jpg',
        alt: 'Children enjoying Red Rose Photo Booth props at a birthday party',
      },
      {
        url: '/testimonials/camille-sutton-birthday-2.jpg',
        alt: 'Kids posing with photo booth props and digital backdrops',
      },
    ],
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
