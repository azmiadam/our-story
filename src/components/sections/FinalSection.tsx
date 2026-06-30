import React from 'react';
import { FadeIn } from '../animations/FadeIn';
import { LoveBurstButton } from '../animations/LoveBurstButton';
import { messages } from '../../data/messages';

export function FinalSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden bg-primary-50">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/hero/final-bg.jpg')" }}
      />
      
      <div className="absolute inset-0 z-10 bg-linear-to-t from-primary-100 via-primary-50/80 to-transparent" />
      
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-neutral-900 mb-8 leading-tight">
            {messages.finalMessage.split('. ').map((part, index, array) => (
              <React.Fragment key={index}>
                {index === array.length - 1 ? (
                  <span className="block mt-6 font-bold text-primary-600 text-3xl md:text-5xl tracking-wide">{part}</span>
                ) : (
                  part + '. '
                )}
              </React.Fragment>
            ))}
          </h2>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.5}>
          <div className="relative inline-block mt-12 mb-8 group">
            {/* Soft ambient glow */}
            <div className="absolute inset-0 bg-rose-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            <LoveBurstButton className="relative inline-flex items-center justify-center w-28 h-28 rounded-full border border-white/40 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(251,113,133,0.15)] hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(251,113,133,0.25)] hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden">
              {/* Glass reflection highlight */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-white/40 to-transparent opacity-50 rounded-full pointer-events-none"></div>
              {/* Gradient Heart */}
              <span className="bg-linear-to-tr from-rose-400 via-primary-500 to-rose-300 inline-block text-transparent bg-clip-text text-5xl font-serif drop-shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10">♥</span>
            </LoveBurstButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
