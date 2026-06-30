import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export function OpeningScreen() {
  const [isVisible, setIsVisible] = useState(true);

  const handleOpen = () => {
    setIsVisible(false);
    
    // Play background music via MusicPlayer component
    window.dispatchEvent(new Event('playBackgroundMusic'));

    setTimeout(() => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.classList.remove('hidden');
        setTimeout(() => {
          mainContent.classList.remove('opacity-0');
          window.dispatchEvent(new Event('startBalloons'));
        }, 50);
      }
    }, 800);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFBFB] via-primary-50 to-primary-100/70 px-4"
        >
          {/* Aurora Glow Backgrounds (Made stronger) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-rose-400/30 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary-400/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[300px] bg-pink-400/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            
            {/* Drifting Giant Hearts (Elegant Watermark Style - Made More Visible) */}
            <motion.div
              className="absolute text-rose-300/20 blur-[4px]"
              initial={{ opacity: 0, x: '-20vw', y: '80vh' }}
              animate={{
                x: ['-20vw', '120vw'],
                y: ['80vh', '10vh'],
                rotate: [-20, 45],
                opacity: [0, 0.3, 0.3, 0]
              }}
              transition={{
                duration: 25,
                ease: 'linear',
                repeat: Infinity
              }}
              style={{ top: 0, left: 0 }}
            >
              <Heart className="w-96 h-96" fill="currentColor" />
            </motion.div>

            <motion.div
              className="absolute text-primary-300/20 blur-[4px]"
              initial={{ opacity: 0, x: '120vw', y: '20vh' }}
              animate={{
                x: ['120vw', '-20vw'],
                y: ['20vh', '70vh'],
                rotate: [45, -20],
                opacity: [0, 0.25, 0.25, 0]
              }}
              transition={{
                duration: 35,
                ease: 'linear',
                repeat: Infinity,
                delay: 5
              }}
              style={{ top: 0, left: 0 }}
            >
              <Heart className="w-[30rem] h-[30rem]" fill="currentColor" />
            </motion.div>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.3
                }
              }
            }}
            className="relative z-10 text-center w-full max-w-2xl"
          >
            <motion.div variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}>
              <Heart className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-heartbeat drop-shadow-md" fill="currentColor" />
            </motion.div>
            
            <motion.div variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}>
              <h1 className="text-4xl md:text-6xl font-serif text-primary-950 mb-6 leading-tight tracking-tight">
                Sebuah Cerita <br className="hidden md:block" />
                <span className="bg-linear-to-r from-primary-400 via-rose-400 to-primary-500 inline-block text-transparent bg-clip-text italic font-light drop-shadow-sm">Untukmu</span>
              </h1>
            </motion.div>
            
            <motion.div variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}>
              <p className="text-lg md:text-xl text-neutral-700 mb-12 max-w-md mx-auto text-balance font-serif italic tracking-wide leading-relaxed">
              Ada sesuatu yang sangat ingin aku sampaikan di hari spesialmu ini...
              </p>
            </motion.div>
            
            <motion.div variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
            }}>
              <button
                onClick={handleOpen}
                className="relative px-10 py-4 rounded-full bg-white border border-primary-200 text-primary-700 font-serif italic text-xl tracking-wide shadow-sm hover:shadow-md hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 active:scale-95 group overflow-hidden mt-4"
                aria-label="Mulai Perjalanan"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Mulai Perjalanan
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
                <div className="absolute inset-0 h-full w-0 bg-primary-100/50 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
