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

    const serviceSlug = 'photo-booth-rental';
    let service = await Service.findOne({ slug: serviceSlug });
    if (!service) {
      service = await Service.create({
        title: 'Photo Booth Rental',
        slug: serviceSlug,
        shortDescription:
          'Luxury photo booth rental with touch-screen kiosk, custom templates, instant sharing, props, and professional attendant.',
        fullDescription:
          'Our signature Photo Booth Rental includes a touch-screen photo booth kiosk, custom photo-strip template designed for your event, instant digital sharing through SMS and email, a fun prop box, and a professional on-site attendant to ensure every guest has an unforgettable experience.',
        features: [
          'Touch-screen photo booth kiosk',
          'Custom photo-strip template',
          'Instant digital sharing via SMS and email',
          'Fun prop box',
          'Professional on-site attendant',
        ],
        pricingType: 'contact',
        displayOrder: 1,
        isActive: true,
      });
      console.log('Photo Booth Rental service created');
    } else {
      console.log('Service already exists');
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
        customerName: 'Maria & James',
        eventType: 'Wedding',
        rating: 5,
        review:
          'From setup to teardown, everything was flawless. Our guests are still talking about the photo booth weeks later. The custom template matched our wedding colors perfectly.',
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
