// ============================================
// VidyaFrame — GradientText Component
// Reusable brand gradient text styling
// ============================================

import { type ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function GradientText({
  children,
  className = '',
  as: Tag = 'span',
}: GradientTextProps) {
  return (
    <Tag
      className={`bg-gradient-to-r from-[#0cc87d] via-[#07a3d1] to-[#1d65ff] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </Tag>
  );
}
