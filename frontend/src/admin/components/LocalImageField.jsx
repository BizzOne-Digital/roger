import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadAPI } from '../../api/client';
import { resolveImageUrl } from '../../utils/imageUrl';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';

/**
 * Admin image field — uploads to MongoDB via POST /api/upload (serverless-safe).
 * onChange receives the saved public URL string, or null when removed.
 */
export default function LocalImageField({
  label,
  value,
  onChange,
  folder = 'misc',
  className = '',
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      toast.error('Only JPEG, PNG, WebP, and GIF images are allowed');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image must be 8MB or smaller');
      return;
    }

    setUploading(true);
    try {
      if (value) {
        await uploadAPI.deleteByUrl(value);
      }

      const { data } = await uploadAPI.upload(file, folder);
      onChange(data.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    setUploading(true);
    try {
      await uploadAPI.deleteByUrl(value);
      onChange(null);
      toast.success('Image removed');
    } catch (err) {
      toast.error(err.message || 'Failed to remove image');
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = () => {
    inputRef.current?.click();
  };

  const previewSrc = value ? resolveImageUrl(value) : null;

  return (
    <div className={className}>
      {label && <label className="label-luxury text-warmIvory/70">{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={uploading}
      />

      {previewSrc ? (
        <div className="flex items-start gap-4 mt-2">
          <img
            src={previewSrc}
            alt="Preview"
            className="w-24 h-24 object-cover rounded border border-antiqueGold/30"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleReplace}
              disabled={uploading}
              className="text-sm text-antiqueGold hover:underline disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Replace'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="text-sm text-velvetRed hover:underline disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-2 px-4 py-2 border border-dashed border-antiqueGold/40 rounded text-warmIvory/70 text-sm hover:border-antiqueGold disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Choose image'}
        </button>
      )}
    </div>
  );
}
