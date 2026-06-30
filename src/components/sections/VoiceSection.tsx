import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { messages } from '../../data/messages';

export function VoiceSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (messages.voiceMessageSrc) {
      audioRef.current = new Audio(messages.voiceMessageSrc);
      
      const updateProgress = () => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  if (!messages.voiceMessageSrc) return null;

  return (
    <section className="py-24 px-4 bg-white border-y border-primary-50">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <span className="text-sm font-semibold tracking-widest text-primary-500 uppercase mb-4 block">
            Voice Note
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-neutral-900 mb-12 leading-relaxed">
            "Dengarkan ini sebentar saja..."
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <div className="max-w-md mx-auto bg-primary-50 rounded-full p-2 pr-6 flex items-center gap-4 shadow-sm border border-primary-100">
            <button 
              onClick={togglePlay}
              className="w-14 h-14 shrink-0 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center text-white shadow-md shadow-primary-500/30"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1 fill-white" />}
            </button>
            
            <div className="flex-1 relative group py-2">
              <div className="relative h-2 w-full flex items-center">
                {/* Track background */}
                <div className="absolute inset-0 bg-primary-200 rounded-full pointer-events-none"></div>
                
                {/* Progress fill */}
                <div 
                  className="absolute left-0 h-full bg-primary-500 rounded-full pointer-events-none transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Custom Thumb indicator */}
                <div 
                  className="absolute top-1/2 -mt-2 h-4 w-4 bg-white border-2 border-primary-500 rounded-full shadow-md -translate-x-1/2 pointer-events-none transition-transform group-hover:scale-110 z-10"
                  style={{ left: `${progress}%` }}
                />

                {/* Invisible interactive slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={isNaN(progress) ? 0 : progress}
                  onChange={(e) => {
                    const newProgress = parseFloat(e.target.value);
                    setProgress(newProgress);
                    if (audioRef.current && !isNaN(audioRef.current.duration)) {
                      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0"
                />
              </div>
            </div>
            
            <div className="shrink-0 flex gap-1 items-center justify-center h-8">
              {/* Fake Audio Waveform */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full bg-primary-300 ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ 
                    height: isPlaying ? `${Math.random() * 20 + 8}px` : '4px',
                    animationDuration: `${Math.random() * 0.5 + 0.5}s` 
                  }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
