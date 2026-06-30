import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { FadeIn } from '../animations/FadeIn';
import { SectionHeading } from '../ui/SectionHeading';
import { galleryData } from '../../data/gallery';
import { playSlideSound } from '../../utils/audio';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function GallerySection() {
  return (
    <section className="py-32 px-4 bg-primary-50 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Memori Indah" 
          subtitle="Our Gallery"
        />
        
        <FadeIn delay={0.3} className="mt-16 max-w-sm md:max-w-md mx-auto">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full aspect-3/4"
            onSlideChange={playSlideSound}
          >
            {galleryData.map((item) => (
              <SwiperSlide key={item.id} className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md shadow-2xl shadow-primary-500/20 border border-white/50 flex flex-col group">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-4/5 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="h-1/5 p-4 flex items-center justify-center text-center">
                  <p className="text-sm md:text-base font-serif text-neutral-800 italic">
                    "{item.caption}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
