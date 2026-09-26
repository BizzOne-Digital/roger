import {
  storeUpload,
  getStoredUpload,
  deleteStoredUploadByUrl,
  isValidFolder,
  sanitizeFilename,
} from '../services/storedUploadService.js';
import AppError from '../utils/AppError.js';

export const uploadImage = async (req, res, next) => {
  try {
    const folder = req.body.folder;

    if (!folder || !isValidFolder(folder)) {
      return next(new AppError('Invalid upload folder', 400));
    }

    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    const result = await storeUpload({
      folder,
      buffer: req.file.buffer,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });

    res.status(201).json({
      success: true,
      url: result.url,
      filename: result.filename,
      size: result.size,
      folder: result.folder,
    });
  } catch (error) {
    next(error);
  }
};

export const serveUpload = async (req, res, next) => {
  try {
    const folder = req.params.folder;
    const filename = req.params.filename;

    if (!isValidFolder(folder) || !sanitizeFilename(filename)) {
      return next(new AppError('Invalid file path', 400));
    }

    const doc = await getStoredUpload(folder, filename);
    if (!doc) {
      return next(new AppError('File not found', 404));
    }

    res.set({
      'Content-Type': doc.mimeType,
      'Content-Length': doc.size,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });

    res.send(doc.data);
  } catch (error) {
    next(error);
  }
};

export const deleteUpload = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      return next(new AppError('URL is required', 400));
    }

    const deleted = await deleteStoredUploadByUrl(url);
    if (!deleted) {
      return next(new AppError('Upload not found or not a stored upload URL', 404));
    }

    res.json({ success: true, message: 'Upload deleted' });
  } catch (error) {
    next(error);
  }
};
