const SIZE_CLASSES = {
  header:
    'h-11 sm:h-14 md:h-[4.25rem] max-w-[min(200px,38vw)] sm:max-w-[240px]',
  footer: 'h-11 sm:h-14 md:h-[4.25rem] max-w-[240px]',
  intro: 'h-11 sm:h-14 md:h-[4.25rem] max-w-[240px]',
};

export default function BrandLogo({ size = 'header', className = '' }) {
  return (
    <img
      src="/header-logo.png"
      alt="Red Rose Photo Booth LLC"
      className={`w-auto object-contain object-left pointer-events-none select-none ${SIZE_CLASSES[size]} ${className}`}
      fetchPriority={size === 'header' ? 'high' : undefined}
    />
  );
}
