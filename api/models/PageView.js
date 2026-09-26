import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, trim: true, maxlength: 512 },
    referrer: { type: String, default: '', maxlength: 2048 },
    referrerHost: { type: String, default: '', trim: true, maxlength: 256 },
    sessionId: { type: String, default: '', trim: true, maxlength: 64 },
    userAgent: { type: String, default: '', maxlength: 512 },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: -1 });
pageViewSchema.index({ path: 1, createdAt: -1 });
pageViewSchema.index({ referrerHost: 1, createdAt: -1 });
pageViewSchema.index({ sessionId: 1, createdAt: -1 });

export default mongoose.model('PageView', pageViewSchema);
