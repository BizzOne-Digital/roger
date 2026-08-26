import { deleteFromCloudinary } from './cloudinaryService.js';
import {
  deleteStoredUploadByUrl,
  isStoredUploadUrl,
} from './storedUploadService.js';

export const deleteImageAsset = async (image) => {
  if (!image?.url) return;

  if (isStoredUploadUrl(image.url)) {
    await deleteStoredUploadByUrl(image.url);
  } else if (image.publicId) {
    await deleteFromCloudinary(image.publicId);
  }
};

export const deleteImageAssets = async (images = []) => {
  for (const img of images) {
    await deleteImageAsset(img);
  }
};

export const deleteImageUrl = async (url) => {
  if (!url) return;
  if (isStoredUploadUrl(url)) {
    await deleteStoredUploadByUrl(url);
  }
};
