import React from 'react';
import { FadeIn } from '../animations/FadeIn';
import { FloatingBalloons } from '../animations/FloatingBalloons';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background with slight parallax effect placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      />
      
      {/* Soft Mesh Glow Backgrounds (Elegant Gradient Orbs) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '10s' }}></div>
      
      {/* Floating Love Balloons */}
      <FloatingBalloons />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-[#FFFBFB]/80 via-primary-50/40 to-neutral-50/90" />

      <div className="relative z-20 text-center max-w-4xl mx-auto mt-[-5vh]">
        <FadeIn delay={0.2} direction="down">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-sm border border-primary-100 text-primary-700 text-sm font-medium tracking-[0.2em] uppercase mb-8 shadow-sm">
            Happy Birthday, My Love
          </span>
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-800 mb-8 leading-[1.1]">
            Untuk Kamu,<br />
            <span className="bg-linear-to-r from-rose-400 via-primary-500 to-rose-400 inline-block text-transparent bg-clip-text italic drop-shadow-sm pb-2">Duniaku.</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.6} direction="up">
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto text-balance font-light tracking-wide">
            Walaupun jarak memisahkan raga kita, tidak sedetik pun rasaku pergi darimu.
          </p>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">Scroll</span>
        <div className="w-[1px] h-16 bg-neutral-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-primary-300 to-primary-500 animate-[bounce_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
