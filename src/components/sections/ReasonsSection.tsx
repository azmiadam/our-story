import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { SectionHeading } from '../ui/SectionHeading';
import { messages } from '../../data/messages';

export function ReasonsSection() {
  return (
    <section className="py-32 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Alasan Aku Mencintaimu" 
          subtitle="Why I Love You"
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {messages.reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ReasonCard = ({ reason, index }: { reason: string, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn delay={0.1 * index}>
      <motion.div 
        className="relative flex items-start gap-4 p-6 rounded-2xl cursor-default overflow-hidden border border-transparent"
        whileHover={{ scale: 1.02, backgroundColor: '#fff1f2', borderColor: '#fbcfe8', boxShadow: '0 10px 25px -5px rgba(251, 113, 133, 0.1)' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Floating Hearts Animation */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -60,
                  x: (Math.random() - 0.5) * 40,
                  scale: [0.5, 1, 0.5],
                  rotate: Math.random() * 45 - 20
                }}
                transition={{ 
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute text-primary-300 drop-shadow-sm text-sm"
                style={{ 
                  left: `${5 + Math.random() * 15}%`,
                  bottom: '0px'
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="shrink-0 mt-1 w-10 h-10 rounded-full flex items-center justify-center z-10"
          animate={isHovered ? { backgroundColor: '#ffe4e6' } : { backgroundColor: '#fce7f3' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isHovered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <Heart className="w-5 h-5 text-primary-500" fill={isHovered ? "#f43f5e" : "#fce7f3"} />
          </motion.div>
        </motion.div>
        <div className="relative z-10">
          <p className="text-lg text-neutral-800 leading-relaxed transition-colors duration-300" style={{ color: isHovered ? '#be123c' : '#262626' }}>
            {reason}
          </p>
        </div>
      </motion.div>
    </FadeIn>
  );
};
