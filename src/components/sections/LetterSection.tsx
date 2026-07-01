import React from 'react';
import { FadeIn } from '../animations/FadeIn';
import { messages } from '../../data/messages';

export function LetterSection() {
  return (
    <section className="py-24 px-4 bg-primary-50 relative overflow-hidden">
      {/* Background Glows for the Letter Section */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/40 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="relative bg-white/60 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-primary-500/10 rounded-4xl p-8 md:p-14 overflow-hidden before:absolute before:inset-0 before:bg-linear-to-br before:from-white/50 before:via-transparent before:to-white/20 before:pointer-events-none">
          
          {/* Decorative Giant Quote Mark */}
          <div className="absolute -top-6 -left-2 text-[12rem] text-primary-200/50 font-serif leading-none select-none pointer-events-none rotate-3">
            "
          </div>
          
          <FadeIn direction="up">
            <div className="relative z-10 max-h-[55vh] overflow-y-auto custom-scrollbar pr-4 md:pr-6 -mr-4 md:-mr-6 space-y-6 text-lg md:text-xl text-neutral-700 leading-relaxed font-serif pb-16">
              {messages.digitalLetter.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "font-bold text-2xl text-primary-700 mb-8" : "text-neutral-700"}>
                  {paragraph}
                </p>
              ))}
              
              <div className="mt-16 text-right pt-8 border-t border-primary-200/50">
                <p className="text-neutral-500 italic mb-2 text-base">Tertanda,</p>
                <p className="font-serif font-semibold text-2xl text-primary-700">Orang yang menyayangimu</p>
              </div>
            </div>
          </FadeIn>
          
          {/* Bottom fade mask & Scroll indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white/90 via-white/70 to-transparent pointer-events-none flex items-end justify-center pb-6 rounded-b-4xl">
             <span className="text-xs uppercase tracking-widest text-primary-600 font-bold animate-bounce bg-white/80 border border-primary-100 shadow-sm px-4 py-2 rounded-full backdrop-blur-md">Scroll ke bawah ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
