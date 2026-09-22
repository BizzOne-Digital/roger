import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Admin from '../api/models/Admin.js';
import Service from '../api/models/Service.js';
import Product from '../api/models/Product.js';
import Testimonial from '../api/models/Testimonial.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@redrosephotobooth.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeThisPassword123!';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: 'Roger Marionneaux',
        email: adminEmail,
        password: adminPassword,
      });
      console.log(`Admin created: ${adminEmail}`);
    } else {
      console.log('Admin already exists');
    }

    const sampleServices = [
      {
        title: 'Wedding Photo Booth',
        slug: 'wedding-photo-booth',
        shortDescription:
          'Elegant wedding-ready booth — DSLR photography, prints, templates, props, and professional attendant. Starting at $950.',
        fullDescription:
          'Elegant, wedding-ready photo booth experiences featuring professional DSLR photography, studio-quality lighting, unlimited photo sessions, professional onsite prints, personalized wedding templates, instant digital sharing, fun props, and a professional booth attendant.',
        features: [
          '½ Dozen, Dozen, and Baker\'s Dozen packages',
          'Professional DSLR photography & lighting',
          'Unlimited sessions and onsite prints',
          'Personalized wedding templates',
        ],
        pricingType: 'fixed',
        price: 950,
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'Parties & Special Occasions',
        slug: 'parties-special-occasions',
        shortDescription:
          'You bring the party — we capture the memories. $250/hour, 2-hour minimum. Birthdays, graduations, mitzvahs, and more.',
        fullDescription:
          'One price, your celebration, your way. Every hour includes DSLR photography, studio lighting, unlimited sessions, prints, props, personalized templates, digital sharing, and a friendly attendant.',
        features: [
          '$250 per hour — 2-hour minimum',
          'Birthdays, graduations, anniversaries, and more',
          'Professional prints and digital sharing',
        ],
        pricingType: 'fixed',
        price: 500,
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'Corporate Events',
        slug: 'corporate-events',
        shortDescription:
          'Professional branded photo booth for galas, conferences, and company celebrations. Starting at $950.',
        fullDescription:
          'Professional. Branded. Engaging. Memorable. Corporate Essential, Signature, and Premier packages with logo branding, galleries, and VIP options.',
        features: [
          'Corporate Essential — $950 (3 hours)',
          'Corporate Signature — $1,150 — Most Popular',
          'Corporate Premier — $1,400 (5 hours)',
        ],
        pricingType: 'fixed',
        price: 950,
        displayOrder: 3,
        isActive: true,
      },
      {
        title: 'GLAM Filter Add-On',
        slug: 'glam-filter-addon',
        shortDescription:
          'Studio-inspired GLAM finish for magazine-worthy photos. Add to any wedding, party, or corporate package.',
        fullDescription:
          'Add a sophisticated, studio-inspired GLAM finish to your photo booth experience for smooth, elegant, magazine-worthy photos.',
        features: [
          'Beauty-inspired retouching filter',
          'Prints and digital sharing',
          'Add to any package',
        ],
        pricingType: 'contact',
        displayOrder: 4,
        isActive: true,
      },
    ];

    await Service.updateMany(
      { slug: { $in: ['photo-booth-rental', 'private-celebrations'] } },
      { $set: { isActive: false } }
    );

    for (const s of sampleServices) {
      const updated = await Service.findOneAndUpdate(
        { slug: s.slug },
        { $set: s },
        { upsert: true, new: true }
      );
      console.log(`Service synced: ${updated.title}`);
    }

    const sampleProducts = [
      {
        name: 'Custom Photo Strip Template Design',
        slug: 'custom-photo-strip-template',
        category: 'Design Services',
        shortDescription: 'Personalized photo strip design matching your event theme.',
        fullDescription:
          'Work with our design team to create a custom photo strip template featuring your names, date, colors, and event branding. Perfect for weddings, corporate events, and celebrations.',
        price: 75,
        sku: 'RR-DESIGN-001',
        stockQuantity: 100,
        featured: true,
        isActive: true,
      },
      {
        name: 'Premium Prop Collection Add-On',
        slug: 'premium-prop-collection',
        category: 'Add-Ons',
        shortDescription: 'Extended premium prop box with vintage and luxury accessories.',
        fullDescription:
          'Elevate your photo booth experience with our premium prop collection featuring vintage hats, elegant frames, themed accessories, and luxury items curated for upscale events.',
        price: 45,
        sku: 'RR-PROP-001',
        stockQuantity: 50,
        featured: true,
        isActive: true,
      },
      {
        name: 'Digital Gallery Extension',
        slug: 'digital-gallery-extension',
        category: 'Add-Ons',
        shortDescription: 'Extended online gallery access for 90 days after your event.',
        fullDescription:
          'Keep the memories alive with extended digital gallery access. All event photos available for download and sharing for 90 days after your celebration.',
        price: 35,
        sku: 'RR-GALLERY-001',
        stockQuantity: 200,
        featured: false,
        isActive: true,
      },
    ];

    for (const p of sampleProducts) {
      const exists = await Product.findOne({ slug: p.slug });
      if (!exists) {
        await Product.create(p);
        console.log(`Product created: ${p.name}`);
      }
    }

    const erinDaleyPontariReview =
      'I highly recommend Roger to anyone looking for someone to help capture the special memories from their wedding day! He was professional, dependable, and arrived right on time. Throughout the day, he captured so many wonderful moments of us and our guests that we will be able to look back on for years to come. He stayed until the reception was completely over, making sure he didn\'t miss anything and that I was fully happy as the bride before leaving. His dedication and attention to detail meant so much to us. We truly enjoyed having him there and are so grateful for the memories he helped preserve from our special day! Thank you so much';

    const cousinsWeddingGuestReview =
      'I had the absolute best experience with Roger and his Red Rose Photo Booth LLC! They were such a wonderful addition to our cousin\'s wedding and made the celebration even more fun and memorable. I\'ve known Roger personally, so I already knew how amazing and caring he is, but seeing how professionally he handled everything made the experience even better. The photo booth setup was beautiful, the pictures came out AMAZING, and the props made it so much fun for everyone. Our entire family had such a great time taking pictures, laughing, and creating memories together. It honestly became one of the highlights of the wedding! I would 100% recommend Roger and his Red Rose Photo Booth LLC for any wedding, birthday, or special event. You can tell he genuinely cares about making people happy and making sure everyone has an unforgettable experience. Thank you for capturing such fun memories for us. We absolutely loved it!';

    const cousinsWeddingEventImage = {
      url: '/testimonials/cousins-wedding-guest.jpg',
      alt: 'Wedding guests enjoying the Red Rose Photo Booth with themed props',
    };

    const camilleSuttonReview =
      'Red Rose Photo Booth was such a fun birthday party addition. The kids loved posing with the props and having 2 photo strips made it easy for friends to share a memento. The digital backdrops made it so we could do several different looks all in one. Roger was so helpful and available the whole party to assist everyone in getting the perfect shot.';

    const camilleSuttonEventImages = [
      {
        url: '/testimonials/camille-sutton-birthday-1.jpg',
        alt: 'Children enjoying Red Rose Photo Booth props at a birthday party',
      },
      {
        url: '/testimonials/camille-sutton-birthday-2.jpg',
        alt: 'Kids posing with photo booth props and digital backdrops',
      },
    ];

    const existingCamilleSutton = await Testimonial.findOne({
      customerName: 'Mrs. Camille Sutton',
      eventType: 'Birthdays',
    });
    if (existingCamilleSutton) {
      existingCamilleSutton.review = camilleSuttonReview;
      existingCamilleSutton.rating = 5;
      existingCamilleSutton.eventImage = camilleSuttonEventImages[0];
      existingCamilleSutton.eventImages = camilleSuttonEventImages;
      existingCamilleSutton.featured = true;
      existingCamilleSutton.isActive = true;
      await existingCamilleSutton.save();
      console.log('Testimonial updated: Mrs. Camille Sutton');
    }

    const existingCousinsWeddingReview = await Testimonial.findOne({
      review: { $regex: /^I had the absolute best experience with Roger/i },
    });
    if (existingCousinsWeddingReview) {
      existingCousinsWeddingReview.customerName = 'Verified Wedding Guest';
      existingCousinsWeddingReview.eventType = 'Wedding';
      existingCousinsWeddingReview.rating = 5;
      existingCousinsWeddingReview.review = cousinsWeddingGuestReview;
      existingCousinsWeddingReview.eventImage = cousinsWeddingEventImage;
      existingCousinsWeddingReview.featured = true;
      existingCousinsWeddingReview.isActive = true;
      await existingCousinsWeddingReview.save();
      console.log('Testimonial updated: Verified Wedding Guest (cousin\'s wedding review)');
    }

    const legacyMariaTestimonial = await Testimonial.findOne({
      customerName: 'Maria & James',
      eventType: 'Wedding',
    });
    if (legacyMariaTestimonial) {
      legacyMariaTestimonial.customerName = 'Erin Daley Pontari';
      legacyMariaTestimonial.review = erinDaleyPontariReview;
      legacyMariaTestimonial.rating = 5;
      legacyMariaTestimonial.featured = true;
      legacyMariaTestimonial.isActive = true;
      await legacyMariaTestimonial.save();
      console.log('Testimonial updated: Erin Daley Pontari (replaced Maria & James)');
    }

    const sampleTestimonials = [
      {
        customerName: 'Sarah & Michael',
        eventType: 'Wedding',
        rating: 5,
        review:
          'Red Rose Photo Booth made our wedding absolutely magical. The custom photo strips were stunning and every guest loved the experience. Roger and his team were professional, friendly, and seamless.',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Jennifer Walsh',
        eventType: 'Corporate Event',
        rating: 5,
        review:
          'We hired Red Rose for our company gala and the photo booth was the highlight of the evening. The instant sharing feature was perfect for our social media team. Highly recommend for corporate events.',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'David Chen',
        eventType: 'Birthday Party',
        rating: 5,
        review:
          'My daughter\'s sweet sixteen was unforgettable thanks to Red Rose Photo Booth. The props were amazing and the attendant kept everyone engaged. Photos turned out beautifully!',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Erin Daley Pontari',
        eventType: 'Wedding',
        rating: 5,
        review: erinDaleyPontariReview,
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Verified Wedding Guest',
        eventType: 'Wedding',
        rating: 5,
        review: cousinsWeddingGuestReview,
        eventImage: cousinsWeddingEventImage,
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Mrs. Camille Sutton',
        eventType: 'Birthdays',
        rating: 5,
        review: camilleSuttonReview,
        eventImage: camilleSuttonEventImages[0],
        eventImages: camilleSuttonEventImages,
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Amanda Rodriguez',
        eventType: 'Bridal Shower',
        rating: 5,
        review:
          'Roger made our bridal shower so much fun! The props were hilarious and the instant text-to-share feature let everyone post photos right away. Absolutely worth it.',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Tyler Brooks',
        eventType: 'Graduation Party',
        rating: 5,
        review:
          'We booked Red Rose for my son\'s graduation and it was a huge hit. Professional service, beautiful prints, and Roger was incredibly helpful throughout the entire process.',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Lisa & Robert',
        eventType: 'Anniversary Celebration',
        rating: 5,
        review:
          'Our 25th anniversary party felt extra special with Red Rose Photo Booth. Elegant setup, friendly attendant, and photo strips our family will treasure forever.',
        featured: true,
        isActive: true,
      },
      {
        customerName: 'Marcus Thompson',
        eventType: 'Corporate Event',
        rating: 5,
        review:
          'Red Rose delivered a polished experience for our brand launch. Custom branding on every photo strip and seamless guest flow. Our team was impressed.',
        featured: true,
        isActive: true,
      },
    ];

    for (const t of sampleTestimonials) {
      const exists = await Testimonial.findOne({
        customerName: t.customerName,
        eventType: t.eventType,
      });
      if (!exists) {
        await Testimonial.create(t);
        console.log(`Testimonial created: ${t.customerName}`);
      }
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
