import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.body.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.body.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="custom-cursor w-8 h-8 border border-antiqueGold/50 rounded-full pointer-events-none transition-transform duration-150 ease-out hidden lg:block"
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
        }}
      />
      <div
        className="custom-cursor w-1 h-1 bg-antiqueGold rounded-full pointer-events-none hidden lg:block"
        style={{
          left: pos.x - 2,
          top: pos.y - 2,
        }}
      />
    </>
  );
}
