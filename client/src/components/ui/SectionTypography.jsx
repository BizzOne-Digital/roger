/**
 * Shared section header — eyebrow + title with consistent luxury typography
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
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
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg font-medium max-w-2xl mx-auto ${light ? 'text-warmIvory/85' : 'text-body-muted'} ${align === 'left' ? '!mx-0' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
