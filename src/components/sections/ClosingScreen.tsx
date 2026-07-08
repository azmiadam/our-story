import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ClosingScreen() {
  const [showSecret, setShowSecret] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLoveYouToo = () => {
    setShowSecret(false);
    setShowBigHeart(true);
    setTimeout(() => {
      setShowBigHeart(false);
    }, 2500);
  };

  useEffect(() => {
    if (showSecret) {
      // 1. Play Secret Voice Note
      if (!audioRef.current) {
        audioRef.current = new Audio('/audio/secret-voice.mp3');
      }
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));

      // 1.5. Play Grand Surprise Sound ("Ba-BAAAM!")
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioCtx = new AudioContext();
          
          const playSurprise = () => {
            const now = audioCtx.currentTime;
            
            const playChord = (time: number, freqs: number[], duration: number, type: OscillatorType = 'sawtooth') => {
              freqs.forEach(freq => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = type;
                osc.frequency.value = freq;
                
                gain.gain.setValueAtTime(0, time);
                gain.gain.linearRampToValueAtTime(0.15, time + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start(time);
                osc.stop(time + duration);
              });
            };

            // "Ba-" (Quick G notes for anticipation)
            playChord(now, [392.00, 783.99], 0.2, 'square');
            
            // "BAAAM!" (Grand C Major chord, very bright and thick)
            const bamTime = now + 0.2;
            playChord(bamTime, [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50], 2.5, 'sawtooth');
            playChord(bamTime, [130.81, 261.63, 523.25], 2.5, 'square'); // Extra bass
          };

          // Play the surprise sound exactly once when the modal opens
          playSurprise();
        }
      } catch (err) {
        console.log("Surprise audio failed:", err);
      }

      // 2. Fire Love Confetti Rain
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Fire confetti on left and right!
        confetti(Object.assign({}, defaults, { 
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff87a0', '#ffccd5', '#ff4d6d']
        }));
        confetti(Object.assign({}, defaults, { 
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff87a0', '#ffccd5', '#ff4d6d']
        }));

      }, 250);
      
      return () => clearInterval(interval);
    } else {
      // Pause audio when modal is closed
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [showSecret]);

  return (
    <section className="py-12 bg-primary-100 text-center relative z-20 border-t border-primary-200">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <button 
          onClick={() => setShowSecret(true)}
          className="group relative mb-12 px-8 py-3.5 rounded-full border border-primary-300/60 bg-white/50 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-primary-50 active:scale-95 transition-all duration-500 flex items-center gap-3 mx-auto overflow-hidden text-primary-700"
        >
          <Mail className="w-5 h-5 opacity-70 group-hover:scale-110 transition-transform duration-300" />
          <span className="tracking-[0.15em] uppercase text-xs font-semibold opacity-90 group-hover:opacity-100 transition-opacity">Klik Jika Kangen</span>
        </button>
        
        <p className="text-primary-600 font-medium text-sm tracking-widest uppercase mt-4">
          Dibuat dengan penuh cinta
        </p>
        <p className="text-primary-500 text-xs mt-2 opacity-70">
          © {new Date().getFullYear()} • Untukmu
        </p>
      </motion.div>

      <AnimatePresence>
        {showSecret && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-md w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative text-center border border-white/60 overflow-hidden"
            >
              {/* Decorative Quote Mark Background */}
              <div className="absolute -top-10 -left-6 text-[180px] font-serif text-primary-300 opacity-10 leading-none select-none pointer-events-none">
                "
              </div>

              <button 
                onClick={() => setShowSecret(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 text-neutral-400 hover:text-primary-600 hover:bg-white transition-all z-20 shadow-sm"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
              
              <div className="relative w-20 h-20 mx-auto mb-8 rounded-full bg-linear-to-tr from-primary-50 to-white flex items-center justify-center border border-white shadow-inner z-10">
                <div className="absolute inset-0 rounded-full border border-primary-200/50 pointer-events-none"></div>
                <Mail className="w-8 h-8 text-primary-400" strokeWidth={1.5} />
                <motion.div
                  animate={{ 
                    y: [0, -6, 0],
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-2 right-2 drop-shadow-sm"
                >
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                </motion.div>
              </div>

              <h3 className="relative z-10 text-3xl font-serif mb-6 pb-4 border-b border-primary-100/50 inline-block px-4">
                <span className="bg-linear-to-r from-rose-400 via-primary-500 to-rose-400 inline-block text-transparent bg-clip-text drop-shadow-sm">Pesan Rahasia</span>
              </h3>
              
              <div className="relative z-10 space-y-4 text-neutral-700 text-[15px] md:text-base font-medium leading-relaxed">
                <p className="italic">
                  "Sebenarnya nggak ada pesan rahasia sih... aku cuma kangen aja dan pengen bilang kalau kamu itu orang paling berharga di hidupku.
                </p>
                <p className="italic">
                  Aku sengaja menyembunyikan pesan ini di sini, sama seperti bagaimana aku selalu menyembunyikan namamu di dalam setiap doa-doaku.
                </p>
                <p className="text-rose-500 font-semibold pt-2">
                  Selamat bertambah usia, separuh jiwaku.<br/>Semangat terus ya sayangkuuu!"
                </p>
              </div>

              <motion.button
                onClick={handleLoveYouToo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 mt-8 bg-linear-to-r from-rose-400 to-primary-500 hover:from-rose-500 hover:to-primary-600 text-white px-8 py-2.5 rounded-full font-medium shadow-lg shadow-rose-400/30 flex items-center gap-2 mx-auto transition-colors"
              >
                <span>Love you too!</span>
                <Heart className="w-4 h-4 fill-white" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Big Heart Animation */}
      <AnimatePresence>
        {showBigHeart && (
          <div className="fixed inset-0 z-100 flex items-center justify-center pointer-events-none">
            {/* Soft pink blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 2.5, times: [0, 0.5, 1], ease: "easeInOut" }}
              className="absolute inset-0 bg-rose-100/30 backdrop-blur-sm"
            />

            {/* Main giant heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 1, 0], 
                scale: [0, 1.2, 1, 20, 30] 
              }}
              transition={{ 
                duration: 2.5, 
                times: [0, 0.15, 0.3, 0.7, 1], 
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              {/* Note: drop-shadow is removed here because scaling it 30x can cause severe performance drops/lag in some browsers */}
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500" />
            </motion.div>

            {/* Burst of smaller hearts */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 150 + Math.random() * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, Math.random() * 0.8 + 0.4, 0],
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius - 50
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.15 + Math.random() * 0.2,
                    ease: "easeOut" 
                  }}
                  className="absolute z-20"
                >
                  <Heart className="w-10 h-10 text-rose-400 fill-rose-400 opacity-80" />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
