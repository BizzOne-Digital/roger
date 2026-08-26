import cloudinary from '../config/cloudinary.js';
import AppError from '../utils/AppError.js';

export const uploadToCloudinary = async (fileBuffer, folder = 'red-rose') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) reject(new AppError('Image upload failed', 500));
        else resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
  }
};

export const uploadMultipleImages = async (files, folder = 'red-rose') => {
  const results = [];
  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer, folder);
    results.push({ url: result.url, publicId: result.publicId, alt: '' });
  }
  return results;
};
