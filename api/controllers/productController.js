import Product from '../models/Product.js';
import { slugify } from '../utils/helpers.js';
import AppError from '../utils/AppError.js';
import { deleteImageAssets } from '../services/imageAssetService.js';

const parseBody = (req) => {
  if (req.body?.data) {
    return JSON.parse(req.body.data);
  }
  return req.body;
};

const normalizeImages = (images = []) =>
  images.map((img) => ({
    url: img.url,
    alt: img.alt || '',
    publicId: img.publicId || '',
  }));

export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      sort,
      availability,
      featured,
      page = 1,
      limit = 12,
      admin,
    } = req.query;

    const filter = admin ? {} : { isActive: true };

    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (availability === 'in_stock') filter.stockQuantity = { $gt: 0 };
    if (availability === 'out_of_stock') filter.stockQuantity = 0;
    if (search) filter.$text = { $search: search };

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(parseInt(limit, 10)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      products,
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

export const getProduct = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    if (!req.admin) filter.isActive = true;

    const product = await Product.findOne(filter);
    if (!product) return next(new AppError('Product not found', 404));

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    });
    if (!product) return next(new AppError('Product not found', 404));

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = parseBody(req);
    data.slug = data.slug || slugify(data.name);
    if (data.images) {
      data.images = normalizeImages(data.images);
    }

    const product = await Product.create(data);
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError('Product not found', 404));

    const data = parseBody(req);

    if (data.removedImageUrls?.length) {
      await deleteImageAssets(
        data.removedImageUrls.map((url) => ({ url }))
      );
      delete data.removedImageUrls;
    }

    if (data.images) {
      data.images = normalizeImages(data.images);
    }

    Object.assign(product, data);
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError('Product not found', 404));

    await deleteImageAssets(product.images);

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
