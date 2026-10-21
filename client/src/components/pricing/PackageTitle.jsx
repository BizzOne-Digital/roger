import { getPackageTitleLine, getPackageBadgeLine } from '../../data/homeContent';

export default function PackageTitle({ pkg, badgeClassName = 'text-antiqueGold' }) {
  const badge = getPackageBadgeLine(pkg);

  return (
    <>
      {getPackageTitleLine(pkg)}
      {badge ? (
        <span className={`block text-xs md:text-sm font-bold tracking-wider mt-1 uppercase ${badgeClassName}`}>
          {badge}
        </span>
      ) : null}
    </>
  );
}
