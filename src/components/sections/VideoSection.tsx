import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { SectionHeading } from '../ui/SectionHeading';
import { videoMemories } from '../../data/memories';

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-32 px-4 bg-primary-50 text-neutral-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading 
          title="Momen Bergerak" 
          subtitle="Video Memories"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-8">
          {videoMemories.map((video, index) => (
            <FadeIn key={video.id} delay={0.2 * (index + 1)}>
              <div 
                className={`group relative bg-neutral-50 p-3 md:p-4 pb-14 md:pb-16 cursor-pointer shadow-xl shadow-neutral-300/50 hover:shadow-2xl hover:shadow-neutral-400/50 hover:-translate-y-2 transition-all duration-500 rounded-md border border-neutral-200/60 ${
                  index % 2 === 0 ? 'rotate-3 md:rotate-6 hover:rotate-1 md:hover:rotate-2 mt-4 md:mt-12' : '-rotate-3 md:-rotate-6 hover:-rotate-1 md:hover:-rotate-2'
                }`}
                onClick={() => {
                  setActiveVideo(video.src);
                  window.dispatchEvent(new CustomEvent('pauseBackgroundMusic'));
                }}
              >
                <div className="relative rounded-md overflow-hidden aspect-video bg-neutral-900">
                  {/* Thumbnail */}
                  {video.thumbnail?.match(/\.(mp4|webm)$/i) ? (
                    <video 
                      src={video.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <img 
                      src={video.thumbnail || "/images/jadian/foto4.jpeg"} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-xl shadow-black/20">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1 drop-shadow-lg" />
                    </div>
                  </div>
                </div>
                
                {/* Polaroid Caption */}
                <div className="absolute bottom-0 left-0 right-0 h-14 md:h-16 flex items-center justify-center px-4">
                  <h3 className="text-lg md:text-xl font-serif italic text-neutral-600 text-center truncate w-full px-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <button 
            onClick={() => {
              setActiveVideo(null);
              window.dispatchEvent(new CustomEvent('playBackgroundMusic'));
            }}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <video 
              src={activeVideo} 
              controls 
              autoPlay 
              onEnded={() => {
                setActiveVideo(null);
                window.dispatchEvent(new CustomEvent('playBackgroundMusic'));
              }}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
