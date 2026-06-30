import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FadeIn } from '../animations/FadeIn';
import { SectionHeading } from '../ui/SectionHeading';
import { timelineEvents } from '../../data/timeline';
import { playSlideSound } from '../../utils/audio';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function TimelineSection() {
  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Perjalanan Kita" 
          subtitle="Our Story"
        />
        
        <div className="relative mt-20">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary-400 via-primary-200 to-transparent opacity-70 -translate-x-1/2 rounded-full" />
          
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <FadeIn 
                  key={event.id} 
                  direction={isEven ? 'right' : 'left'}
                  className={`relative flex items-center justify-between md:justify-normal ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow -translate-x-1/2 z-10 animate-[pulse_2s_ease-in-out_infinite]" />
                  
                  {/* Content Container */}
                  <div className={`w-[calc(100%-3rem)] md:w-5/12 ml-auto md:ml-0 pl-4 md:pl-0 ${
                    isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'
                  }`}>
                    <span className="text-sm font-semibold text-primary-500 mb-2 block">
                      {event.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-neutral-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {event.images && event.images.length > 0 ? (
                      <div className={`mt-6 ${isEven ? 'md:ml-auto' : ''} w-full max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-primary-500/10 bg-white/50 backdrop-blur-sm p-1 border border-white/60`}>
                        <Swiper
                          grabCursor={true}
                          modules={[Navigation, Pagination]}
                          navigation
                          pagination={{ clickable: true }}
                          className="w-full aspect-video"
                          onSlideChange={playSlideSound}
                        >
                          {event.images.map((img, i) => (
                            <SwiperSlide key={i} className="bg-white">
                              <img 
                                src={img} 
                                alt={`${event.title} ${i + 1}`} 
                                className="w-full h-full object-cover rounded-xl"
                                loading="lazy"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    ) : event.image && (
                      <div className={`mt-4 rounded-2xl overflow-hidden shadow-xl shadow-primary-500/10 bg-white/50 backdrop-blur-sm p-1 border border-white/60 ${
                        isEven ? 'md:ml-auto' : ''
                      } max-w-sm`}>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500 rounded-xl"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
