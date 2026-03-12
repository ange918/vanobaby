import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#C0392B',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(192,57,43,0.7)',
          zIndex: 99998,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
