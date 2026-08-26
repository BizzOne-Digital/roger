import { useIntroSeen } from '../../hooks/useIntro';
import CinematicIntro from './CinematicIntro';

export default function IntroWrapper({ children }) {
  const { showIntro, ready, completeIntro, skipIntro } = useIntroSeen();

  if (!ready) return null;

  return (
    <>
      {showIntro && (
        <CinematicIntro onComplete={completeIntro} onSkip={skipIntro} />
      )}
      {children}
    </>
  );
}
