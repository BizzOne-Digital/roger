import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  sku: { type: String },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
});

const eventDetailsSchema = new mongoose.Schema({
  eventType: { type: String, trim: true },
  eventDate: { type: Date },
  startTime: { type: String },
  duration: { type: String },
  venueName: { type: String },
  venueAddress: { type: String },
  guestCount: { type: Number },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  serviceName: { type: String },
  requestedFeatures: [{ type: String }],
  additionalNotes: { type: String },
});

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    orderType: {
      type: String,
      enum: ['product', 'booking', 'contact'],
      required: true,
    },
    customer: { type: customerSchema, required: true },
    items: [orderItemSchema],
    eventDetails: eventDetailsSchema,
    subtotal: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: [
        'pending',
        'contacted',
        'confirmed',
        'processing',
        'completed',
        'cancelled',
      ],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['pay_later', 'stripe', 'other'],
      default: 'pay_later',
    },
    message: { type: String },
    internalNotes: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1, orderType: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'customer.email': 1 });

export default mongoose.model('Order', orderSchema);
