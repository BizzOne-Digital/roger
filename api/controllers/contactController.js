import AppError from '../utils/AppError.js';
import { sendContactEmails } from '../services/emailService.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, eventType, eventDate, message } = req.body;

    if (!name || !email || !message) {
      return next(new AppError('Name, email, and message are required', 400));
    }

    try {
      await sendContactEmails({
        name,
        email,
        phone,
        eventType,
        eventDate,
        message,
      });
    } catch (emailError) {
      console.error('Contact email error:', emailError.message);
      return next(new AppError('Failed to send message. Please try again later.', 500));
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};
