/**
 * Shared section header — eyebrow + title with consistent luxury typography
 */
export function SectionHeader({
  eyebrow,
  title,
  light = false,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div className={`${alignClass} mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <p className="section-eyebrow">{eyebrow}</p>
      )}
      <h2 className={light ? 'section-heading-light' : 'section-heading'}>{title}</h2>
    </div>
  );
}
