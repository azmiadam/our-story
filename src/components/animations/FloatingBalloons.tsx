import React, { useEffect, useState } from 'react';

interface BalloonProps {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: number;
  color: string;
}

export function FloatingBalloons() {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsActive(true);
    window.addEventListener('startBalloons', handleStart);
    
    // Also check if it's already active just in case
    const mainContent = document.getElementById('main-content');
    if (mainContent && !mainContent.classList.contains('hidden') && mainContent.classList.contains('opacity-100')) {
      setIsActive(true);
    }

    return () => window.removeEventListener('startBalloons', handleStart);
  }, []);

  useEffect(() => {
    const generateBalloons = () => {
      // Colors from the pink/rose palette
      const colors = [
        'text-primary-200', 
        'text-primary-300', 
        'text-primary-400', 
        'text-primary-500', 
        'text-rose-300'
      ];
      
      const newBalloons: BalloonProps[] = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 90 + 5}%`, // 5% to 95%
        animationDuration: `${12 + Math.random() * 15}s`, // 12s to 27s
        // Positive delay so they start emerging from the bottom ONE BY ONE when activated
        animationDelay: `${Math.random() * 6}s`, 
        size: 24 + Math.random() * 32, // 24px to 56px
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setBalloons(newBalloons);
    };

    generateBalloons();
  }, []);

  // Only render on client to avoid hydration mismatch
  if (balloons.length === 0 || !isActive) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute bottom-[-100px] animate-float-up ${balloon.color}`}
          style={{
            left: balloon.left,
            animationDuration: balloon.animationDuration,
            animationDelay: balloon.animationDelay,
          }}
        >
          <div className="relative">
            {/* Heart Shape */}
            <svg 
              width={balloon.size} 
              height={balloon.size} 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0px 8px 12px rgba(248, 81, 129, 0.2))' }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {/* Balloon string */}
            <svg 
              width={balloon.size / 2} 
              height={balloon.size * 1.5} 
              viewBox="0 0 10 30" 
              className="absolute left-1/2 -translate-x-1/2 top-[90%] text-neutral-300 opacity-60"
            >
              <path d="M5,0 Q0,7 5,15 T5,30" stroke="currentColor" fill="none" strokeWidth="1" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
