import Testimonial from '../models/Testimonial.js';
import AppError from '../utils/AppError.js';
import { deleteImageAsset } from '../services/imageAssetService.js';
import { storeUpload } from '../services/storedUploadService.js';

const parseBody = (req) => {
  if (req.body?.data) {
    return JSON.parse(req.body.data);
  }
  return req.body;
};

const normalizeImage = (image, alt = '') => {
  if (!image?.url) return undefined;
  return {
    url: image.url,
    alt: image.alt || alt,
    publicId: image.publicId || '',
  };
};

export const getTestimonials = async (req, res, next) => {
  try {
    const { featured, admin, page = 1, limit = 20 } = req.query;
    const filter = admin ? {} : { isActive: true };
    if (featured) filter.featured = featured === 'true';

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
      Testimonial.countDocuments(filter),
    ]);

    res.json({
      success: true,
      testimonials,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const submitPublicReview = async (req, res, next) => {
  try {
    const customerName = String(req.body.customerName || '').trim();
    const eventType = String(req.body.eventType || '').trim();
    const review = String(req.body.review || '').trim();
    const rating = parseInt(req.body.rating, 10);

    if (!customerName || customerName.length < 2) {
      return next(new AppError('Please enter your name (at least 2 characters).', 400));
    }
    if (!eventType) {
      return next(new AppError('Please select an event type.', 400));
    }
    if (!review || review.length < 20) {
      return next(new AppError('Please write a review of at least 20 characters.', 400));
    }
    if (review.length > 2000) {
      return next(new AppError('Review is too long (max 2000 characters).', 400));
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return next(new AppError('Please select a star rating from 1 to 5.', 400));
    }

    let eventImage;
    if (req.file) {
      const stored = await storeUpload({
        folder: 'gallery',
        buffer: req.file.buffer,
        mimeType: req.file.mimetype,
        size: req.file.size,
      });
      eventImage = { url: stored.url, alt: eventType };
    } else {
      eventImage = normalizeImage(req.body.eventImage, eventType);
    }

    const testimonial = await Testimonial.create({
      customerName,
      eventType,
      review,
      rating,
      featured: false,
      isActive: false,
      eventImage,
    });

    res.status(201).json({
      success: true,
      message:
        'Thank you! Your review was submitted and is pending approval. Roger will publish it after a quick review.',
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const data = parseBody(req);

    if (data.customerImage) {
      data.customerImage = normalizeImage(data.customerImage, data.customerName);
    }
    if (data.eventImage) {
      data.eventImage = normalizeImage(data.eventImage, data.eventType);
    }

    const testimonial = await Testimonial.create(data);
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(new AppError('Testimonial not found', 404));

    const data = parseBody(req);

    if (data.removedCustomerImageUrl) {
      await deleteImageAsset({ url: data.removedCustomerImageUrl });
      delete data.removedCustomerImageUrl;
    }
    if (data.removedEventImageUrl) {
      await deleteImageAsset({ url: data.removedEventImageUrl });
      delete data.removedEventImageUrl;
    }

    if (data.customerImage) {
      data.customerImage = normalizeImage(
        data.customerImage,
        data.customerName || testimonial.customerName
      );
    }
    if (data.eventImage) {
      data.eventImage = normalizeImage(
        data.eventImage,
        data.eventType || testimonial.eventType
      );
    }

    Object.assign(testimonial, data);
    await testimonial.save();

    res.json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

export const approveTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(new AppError('Testimonial not found', 404));
    testimonial.isActive = true;
    await testimonial.save();
    res.json({ success: true, message: 'Testimonial approved and published.', testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return next(new AppError('Testimonial not found', 404));

    if (testimonial.customerImage) {
      await deleteImageAsset(testimonial.customerImage);
    }
    if (testimonial.eventImage) {
      await deleteImageAsset(testimonial.eventImage);
    }

    await testimonial.deleteOne();
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
