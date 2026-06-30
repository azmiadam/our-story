import React from 'react';
import { FadeIn } from '../animations/FadeIn';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeading({ title, subtitle, className, align = 'center' }: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];

  return (
    <div className={cn("max-w-3xl mb-12", alignClass, className)}>
      {subtitle && (
        <FadeIn delay={0.1} direction="up" className="mb-3">
          <span className="text-sm font-semibold tracking-widest text-primary-500 uppercase">
            {subtitle}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.2} direction="up">
        <h2 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-tight">
          {title}
        </h2>
      </FadeIn>
    </div>
  );
}
