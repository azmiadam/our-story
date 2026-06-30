import React, { useState, useEffect } from 'react';
import { FadeIn } from '../animations/FadeIn';

export function CountdownSection() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Menghitung waktu sejak pertama kali bersama (contoh: 08 Desember 2023)
    const startDate = new Date('2023-12-08T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTime({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-primary-50 min-w-[100px]">
      <span className="text-4xl md:text-5xl font-serif text-primary-600 mb-2">{value}</span>
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">{label}</span>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-neutral-50">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-800 mb-12">
            Waktu yang Telah Kita Lalui Bersama
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2} direction="up">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <TimeBlock value={time.days} label="Hari" />
            <TimeBlock value={time.hours} label="Jam" />
            <TimeBlock value={time.minutes} label="Menit" />
            <TimeBlock value={time.seconds} label="Detik" />
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="mt-12 text-neutral-500 italic font-medium tracking-wide">
            ...sejak 08 Desember 2023, sampai sekarang, dan seterusnya.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
