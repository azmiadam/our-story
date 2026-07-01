import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MusicPlayerProps {
  src: string;
}

export function MusicPlayer({ src }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element only on client side
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    const handlePlayMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
        setIsPlaying(true);
      }
    };

    const handlePauseMusic = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('playBackgroundMusic', handlePlayMusic);
    window.addEventListener('pauseBackgroundMusic', handlePauseMusic);

    return () => {
      window.removeEventListener('playBackgroundMusic', handlePlayMusic);
      window.removeEventListener('pauseBackgroundMusic', handlePauseMusic);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full",
        "bg-white/80 backdrop-blur-md shadow-lg border border-primary-100",
        "hover:bg-primary-50 transition-colors duration-300",
        "group"
      )}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <div className="absolute inset-0 rounded-full border-2 border-primary-300 opacity-0 group-hover:animate-ping" />
      {isPlaying ? (
        <Pause className="w-5 h-5 text-primary-600" />
      ) : (
        <div className="relative">
          <Music className="w-5 h-5 text-primary-600" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
        </div>
      )}
    </button>
  );
}
