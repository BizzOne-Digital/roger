import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  alt: { type: String, default: '' },
});

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, maxlength: 1000 },
    customerImage: imageSchema,
    eventImage: imageSchema,
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

testimonialSchema.index({ isActive: 1, featured: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
