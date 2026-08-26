import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  alt: { type: String, default: '' },
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    fullDescription: { type: String, required: true },
    coverImage: imageSchema,
    features: [{ type: String, trim: true }],
    pricingType: {
      type: String,
      enum: ['fixed', 'contact'],
      default: 'contact',
    },
    price: { type: Number, min: 0, default: null },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.index({ isActive: 1, displayOrder: 1 });

export default mongoose.model('Service', serviceSchema);
