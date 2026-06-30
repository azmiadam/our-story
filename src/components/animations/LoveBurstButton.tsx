import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  size: number;
  rotation: number;
}

export function LoveBurstButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  // Pre-load audio to ensure zero latency on click
  useEffect(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        fetch('/audio/petasan.mp3')
          .then(res => res.arrayBuffer())
          .then(buf => ctx.decodeAudioData(buf))
          .then(decoded => {
            audioBufferRef.current = decoded;
          })
          .catch(err => console.log("Failed to load petasan audio:", err));
      }
    } catch (e) {
      console.log("Web audio init failed:", e);
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Play Real Firecracker Sound (Zero Latency via Web Audio API)
    const playPetasan = (delayMs: number = 0) => {
      const ctx = audioCtxRef.current;
      const buffer = audioBufferRef.current;
      
      if (ctx && buffer) {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.8;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(ctx.currentTime + (delayMs / 1000));
      } else {
        // Fallback to HTML Audio if buffer isn't loaded yet
        const fallback = new Audio('/audio/petasan.mp3');
        fallback.volume = 0.8;
        setTimeout(() => fallback.play().catch(err => err), delayMs);
      }
    };

    // Play for center burst (0 delay)
    playPetasan(0);
    
    // Play for left & right bursts (200ms delay)
    playPetasan(200);

    // Get the center of the button for the local hearts
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.width / 2;
    const y = rect.height / 2;

    // Calculate normalized coordinates for confetti
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    // 2. Local Heart Burst
    const newParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        angle: Math.random() * Math.PI * 2,
        velocity: 80 + Math.random() * 200, 
        size: 12 + Math.random() * 24,
        rotation: Math.random() * 360,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);

    // 3. Global Firework Confetti Effect
    // Center Burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: originX, y: originY },
      colors: ['#ffcddb', '#ffa8c0', '#f85181', '#e42c64', '#ffffff'],
      disableForReducedMotion: true,
      zIndex: 9999,
      gravity: 0.8,
      ticks: 300
    });

    // Left & Right Burst slightly delayed
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        angle: 60,
        origin: { x: 0.1, y: 0.9 },
        colors: ['#ffcddb', '#f85181', '#ffffff'],
        zIndex: 9999,
        gravity: 0.8
      });
      confetti({
        particleCount: 100,
        spread: 80,
        angle: 120,
        origin: { x: 0.9, y: 0.9 },
        colors: ['#ffcddb', '#f85181', '#ffffff'],
        zIndex: 9999,
        gravity: 0.8
      });
    }, 200);
  }, []);


  return (
    <button 
      onClick={handleClick}
      className={`relative cursor-pointer focus:outline-none transition-transform active:scale-90 ${className}`}
    >
      {/* Target Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
      
      {/* Particles Container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: 0, rotate: 0 }}
              animate={{ 
                x: p.x + Math.cos(p.angle) * p.velocity, 
                // Add gravity effect by pushing y further down (adding a constant vertical pull)
                y: p.y + Math.sin(p.angle) * p.velocity + 150, 
                opacity: [1, 1, 0], // Stay opaque then fade out
                scale: [0, 1.2, 0.8],
                rotate: p.rotation + 180
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 + Math.random() * 0.8, ease: "easeOut" }}
              className="absolute text-primary-400 drop-shadow-md origin-center"
              style={{ fontSize: p.size, top: -p.size/2, left: -p.size/2 }}
            >
              ♥
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </button>
  );
}
