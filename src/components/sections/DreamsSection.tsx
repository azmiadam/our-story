import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Users, Map, Home, Smile, HeartHandshake, Sun, Baby, ShieldCheck, Star } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { SectionHeading } from '../ui/SectionHeading';
import { messages } from '../../data/messages';

const dreamIcons = [
  Heart,
  Users,
  Map,
  Home,
  Smile,
  HeartHandshake,
  Sun,
  Baby,
  ShieldCheck,
  Star
];

export function DreamsSection() {
  return (
    <section className="py-32 px-4 bg-primary-50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading 
          title="Mimpi Kita di Masa Depan" 
          subtitle="Future Dreams"
        />
        
        <div className="mt-16 space-y-6">
          {messages.futureDreams.map((dream, index) => {
            const Icon = dreamIcons[index % dreamIcons.length] || Sparkles;
            return <DreamCard key={index} dream={dream} icon={Icon} index={index} />;
          })}
        </div>
        
        <FadeIn delay={0.6} className="mt-16 text-center">
          <p className="text-xl font-serif italic text-primary-600">
            "Semoga semua ini segera menjadi nyata."
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

const DreamCard = ({ dream, icon: Icon, index }: { dream: string, icon: any, index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <FadeIn delay={0.1 * index} direction="up">
      <motion.div
        className="relative bg-white p-6 rounded-2xl shadow-sm border border-primary-100/50 flex items-center gap-6 cursor-default"
        whileHover={{ scale: 1.02, y: -5, borderColor: '#fda4af', boxShadow: '0 10px 25px -5px rgba(251, 113, 133, 0.2)' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Soft background glow on hover */}
        <motion.div 
          className="absolute inset-0 bg-linear-to-r from-primary-50/50 to-transparent opacity-0 pointer-events-none rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, x: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -80,
                  x: (Math.random() - 0.5) * 60,
                  scale: [0.5, 1.2, 0.5],
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute text-primary-300 drop-shadow-sm text-sm"
                style={{ 
                  left: `${15 + Math.random() * 70}%`,
                  bottom: '-10px'
                }}
              >
                {['❤️', '✨', '💖', '🌸'][i % 4]}
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10"
          animate={isHovered ? { scale: 1.15, backgroundColor: '#ffe4e6' } : { scale: 1, backgroundColor: '#fff1f2' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            animate={isHovered ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          >
            <Icon className="w-6 h-6 text-primary-500" />
          </motion.div>
        </motion.div>
        
        <p className="relative z-10 text-lg text-neutral-800 font-medium transition-colors duration-300" style={{ color: isHovered ? '#be123c' : '#262626' }}>
          {dream}
        </p>
      </motion.div>
    </FadeIn>
  );
};
