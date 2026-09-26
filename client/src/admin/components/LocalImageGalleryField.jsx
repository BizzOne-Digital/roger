import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadAPI } from '../../api/client';
import { resolveImageUrl } from '../../utils/imageUrl';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';

/**
 * Multiple image gallery field for admin — each image is a URL string in the array.
 */
export default function LocalImageGalleryField({
  label,
  value = [],
  onChange,
  folder = 'products',
  max = 10,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const images = Array.isArray(value) ? value : [];

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    if (images.length + files.length > max) {
      toast.error(`Maximum ${max} images allowed`);
      return;
    }

    setUploading(true);
    const newUrls = [];

    try {
      for (const file of files) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowed.includes(file.type)) {
          toast.error(`${file.name}: invalid type`);
          continue;
        }
        if (file.size > 8 * 1024 * 1024) {
          toast.error(`${file.name}: exceeds 8MB`);
          continue;
        }

        const { data } = await uploadAPI.upload(file, folder);
        newUrls.push(data.url);
      }

      if (newUrls.length) {
        onChange([...images, ...newUrls]);
        toast.success(`${newUrls.length} image(s) uploaded`);
      }
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = async (url, index) => {
    setUploading(true);
    try {
      await uploadAPI.deleteByUrl(url);
      onChange(images.filter((_, i) => i !== index));
      toast.success('Image removed');
    } catch (err) {
      toast.error(err.message || 'Failed to remove image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="label-luxury text-warmIvory/70">{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((url, i) => (
          <div key={`${url}-${i}`} className="relative">
            <img
              src={resolveImageUrl(url)}
              alt=""
              className="w-16 h-16 object-cover rounded border border-antiqueGold/30"
            />
            <button
              type="button"
              onClick={() => handleRemove(url, i)}
              disabled={uploading}
              className="absolute -top-1 -right-1 w-5 h-5 bg-velvetRed text-white rounded-full text-xs disabled:opacity-50"
              aria-label="Remove image"
            >
              x
            </button>
          </div>
        ))}
      </div>

      {images.length < max && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-3 px-4 py-2 border border-dashed border-antiqueGold/40 rounded text-warmIvory/70 text-sm hover:border-antiqueGold disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Add images'}
        </button>
      )}
    </div>
  );
}
