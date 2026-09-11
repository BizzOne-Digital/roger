import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import { generateOrderNumber } from '../utils/helpers.js';
import AppError from '../utils/AppError.js';
import {
  sendOrderCustomerEmail,
  sendOrderAdminEmail,
  sendStatusUpdateEmail,
} from '../services/emailService.js';

export const getOrders = async (req, res, next) => {
  try {
    const {
      status,
      orderType,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (orderType) filter.orderType = orderType;
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.fullName': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      orders,
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

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError('Order not found', 404));

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const getOrderStats = async (req, res, next) => {
  try {
    const [totalOrders, pendingOrders, totalProducts, totalServices, totalTestimonials] =
      await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ status: 'pending' }),
        Product.countDocuments(),
        Service.countDocuments(),
        (await import('../models/Testimonial.js')).default.countDocuments(),
      ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber orderType status customer.fullName createdAt total');

    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        totalProducts,
        totalServices,
        totalTestimonials,
      },
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductOrder = async (req, res, next) => {
  try {
    const { customer, items, notes } = req.body;

    if (!customer?.fullName || !customer?.email || !items?.length) {
      return next(new AppError('Customer info and items are required', 400));
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return next(new AppError(`Product ${item.productId} not available`, 400));
      }
      if (product.stockQuantity < item.quantity) {
        return next(new AppError(`${product.name} has insufficient stock`, 400));
      }

      const price = product.salePrice ?? product.price;
      orderItems.push({
        productId: product._id,
        name: product.name,
        sku: product.sku,
        price,
        quantity: item.quantity,
        image: product.images[0]?.url,
      });
      subtotal += price * item.quantity;
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber('RR-ORD'),
      orderType: 'product',
      customer,
      items: orderItems,
      subtotal,
      total: subtotal,
      message: notes,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'pay_later',
    });

    try {
      await sendOrderCustomerEmail(order);
      await sendOrderAdminEmail(order);
    } catch (emailError) {
      console.error('Email send error:', emailError.message);
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const {
      customer,
      eventType,
      eventDate,
      startTime,
      duration,
      venueName,
      venueAddress,
      guestCount,
      serviceId,
      requestedFeatures,
      additionalNotes,
    } = req.body;

    if (!customer?.fullName || !customer?.email) {
      return next(new AppError('Customer name and email are required', 400));
    }

    let serviceName = '';
    if (serviceId) {
      const service = await Service.findById(serviceId);
      if (service) serviceName = service.title;
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber('RR-BKG'),
      orderType: 'booking',
      customer,
      eventDetails: {
        eventType,
        eventDate,
        startTime,
        duration,
        venueName,
        venueAddress,
        guestCount,
        serviceId,
        serviceName,
        requestedFeatures,
        additionalNotes,
      },
      status: 'pending',
    });

    try {
      await sendOrderCustomerEmail(order);
      await sendOrderAdminEmail(order);
    } catch (emailError) {
      console.error('Email send error:', emailError.message);
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, internalNotes, sendEmail } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return next(new AppError('Order not found', 404));

    if (status) order.status = status;
    if (internalNotes !== undefined) order.internalNotes = internalNotes;

    await order.save();

    if (sendEmail && status) {
      try {
        await sendStatusUpdateEmail(order);
      } catch (emailError) {
        console.error('Status email error:', emailError.message);
      }
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
