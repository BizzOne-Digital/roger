import { useLocation } from 'react-router-dom';
import { useIntroSeen } from '../../hooks/useIntro';
import CinematicIntro from './CinematicIntro';

export default function IntroWrapper({ children }) {
  const location = useLocation();
  const { showIntro, ready, completeIntro } = useIntroSeen();
  const isHomepage = location.pathname === '/';

  if (!ready) return null;

  return (
    <>
      {showIntro && isHomepage && (
        <CinematicIntro onComplete={completeIntro} />
      )}
      {children}
    </>
  );
}
