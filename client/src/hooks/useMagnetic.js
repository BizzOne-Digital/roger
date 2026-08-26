import { useEffect, useState, useCallback } from 'react';

export const useMagnetic = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useCallback((node) => {
    if (!node) return;

    const handleMove = (e) => {
      if (window.innerWidth < 768) return;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * strength, y: y * strength });
    };

    const handleLeave = () => setPosition({ x: 0, y: 0 });

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', handleLeave);

    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return { ref, position };
};
