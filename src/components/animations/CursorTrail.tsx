import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  randomX: number;
  rotation: number;
}

export function CursorTrail() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    // Spawn 2-3 hearts on click for a nice burst effect
    const numHearts = 2 + Math.floor(Math.random() * 2);
    
    const newHearts: HeartParticle[] = Array.from({ length: numHearts }).map(() => ({
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      randomX: (Math.random() - 0.5) * 80, // Drift left/right
      rotation: (Math.random() - 0.5) * 60, // Rotate slightly
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Remove after animation completes
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some(nh => nh.id === h.id)));
    }, 1500);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: heart.x - 12, y: heart.y - 12, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 0.8 + Math.random() * 0.5, 
              y: heart.y - 80 - (Math.random() * 60), // Float up
              x: heart.x - 12 + heart.randomX,
              rotate: heart.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 + Math.random() * 0.5, ease: "easeOut" }}
            className="absolute text-primary-400 drop-shadow-md"
            style={{ willChange: 'transform, opacity' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
