import Service from '../models/Service.js';
import { slugify } from '../utils/helpers.js';
import AppError from '../utils/AppError.js';
import { deleteImageAsset } from '../services/imageAssetService.js';

const parseBody = (req) => {
  if (req.body?.data) {
    return JSON.parse(req.body.data);
  }
  return req.body;
};

const normalizeCoverImage = (coverImage, fallbackAlt = '') => {
  if (!coverImage?.url) return undefined;
  return {
    url: coverImage.url,
    alt: coverImage.alt || fallbackAlt,
    publicId: coverImage.publicId || '',
  };
};

export const getServices = async (req, res, next) => {
  try {
    const { admin } = req.query;
    const filter = admin ? {} : { isActive: true };

    const services = await Service.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, services });
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (!req.admin) filter.isActive = true;

    const service = await Service.findOne(filter);
    if (!service) return next(new AppError('Service not found', 404));

    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!service) return next(new AppError('Service not found', 404));

    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const data = parseBody(req);
    data.slug = data.slug || slugify(data.title);
    if (data.coverImage) {
      data.coverImage = normalizeCoverImage(data.coverImage, data.title);
    }

    const service = await Service.create(data);
    res.status(201).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new AppError('Service not found', 404));

    const data = parseBody(req);

    if (data.removedCoverImageUrl) {
      await deleteImageAsset({ url: data.removedCoverImageUrl });
      delete data.removedCoverImageUrl;
    }

    if (data.coverImage) {
      data.coverImage = normalizeCoverImage(
        data.coverImage,
        data.title || service.title
      );
    }

    Object.assign(service, data);
    await service.save();

    res.json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new AppError('Service not found', 404));

    if (service.coverImage) {
      await deleteImageAsset(service.coverImage);
    }

    await service.deleteOne();
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
