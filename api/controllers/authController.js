import Admin from '../models/Admin.js';
import { generateToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    if (!admin.isActive) {
      return next(new AppError('Account is deactivated', 401));
    }

    const token = generateToken(admin._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
    expires: new Date(0),
  });  res.json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
    },
  });
};
