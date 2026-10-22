/** Renders story copy with optional **bold** segments. */
export function StoryRichText({ text, className = '' }) {
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-charcoal">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export default function OurStoryContent({ blocks, className = '', light = false }) {
  const textMuted = light ? 'text-warmIvory/85' : 'text-body-muted';
  const textLead = light ? 'text-warmIvory font-semibold' : 'text-charcoal font-semibold';

  return (
    <div className={`space-y-5 md:space-y-6 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === 'lead') {
          return (
            <p key={i} className={`text-base md:text-lg leading-relaxed ${textLead}`}>
              <StoryRichText text={block.text} />
            </p>
          );
        }
        if (block.type === 'emphasis') {
          return (
            <p key={i} className={`text-base md:text-lg leading-relaxed ${textMuted}`}>
              <StoryRichText text={block.text} />
            </p>
          );
        }
        if (block.type === 'signoff') {
          return (
            <p key={i} className="text-base md:text-lg leading-relaxed text-antiqueGold font-semibold">
              <StoryRichText text={block.text} />
            </p>
          );
        }
        return (
          <p key={i} className={`text-base md:text-lg leading-relaxed ${textMuted}`}>
            <StoryRichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
