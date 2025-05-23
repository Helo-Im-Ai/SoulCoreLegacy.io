// src/components/UI/GlassPanel.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../styles/theme';

// Types
interface GlassPanelProps {
  children: React.ReactNode;
  opacity?: number;
  blur?: number;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  glow?: boolean;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  onClick?: () => void;
  className?: string;
}

// Helper function to get glow intensity
const getGlowIntensity = (intensity: string) => {
  switch (intensity) {
    case 'low':
      return '5px';
    case 'high':
      return '15px';
    default:
      return '10px';
  }
};

// Styled Components
const Panel = styled(motion.div)<{
  $opacity: number;
  $blur: number;
  $border: boolean;
  $borderColor: string;
  $borderWidth: number;
  $borderRadius: string;
  $padding: string;
  $margin: string;
  $width: string;
  $height: string;
  $glow: boolean;
  $glowColor: string;
  $glowIntensity: string;
}>`
  position: relative;
  background: rgba(15, 23, 42, ${props => props.$opacity});
  backdrop-filter: blur(${props => props.$blur}px);
  -webkit-backdrop-filter: blur(${props => props.$blur}px);
  border: ${props => (props.$border ? `${props.$borderWidth}px solid ${props.$borderColor}` : 'none')};
  border-radius: ${props => props.$borderRadius};
  padding: ${props => props.$padding};
  margin: ${props => props.$margin};
  width: ${props => props.$width};
  height: ${props => props.$height};
  box-shadow: ${props => (props.$glow ? `0 0 ${props.$glowIntensity} ${props.$glowColor}` : 'none')};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    opacity: ${props => (props.$border ? 0 : 0.5)};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    opacity: ${props => (props.$border ? 0 : 0.3)};
  }
`;

// Main Component
const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  opacity = 0.2,
  blur = 10,
  border = false,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  borderWidth = 1,
  borderRadius = theme.borderRadius.lg,
  padding = theme.spacing.lg,
  margin = '0',
  width = 'auto',
  height = 'auto',
  glow = false,
  glowColor = 'rgba(58, 134, 255, 0.3)',
  glowIntensity = 'medium',
  animated = true,
  onClick,
  className,
}) => {
  // Animation variants
  const panelVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: onClick ? 1.02 : 1,
      boxShadow: glow ? `0 0 ${getGlowIntensity(glowIntensity)} ${glowColor}` : 'none',
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: onClick ? 0.98 : 1,
    },
  };

  return (
    <Panel
      $opacity={opacity}
      $blur={blur}
      $border={border}
      $borderColor={borderColor}
      $borderWidth={borderWidth}
      $borderRadius={borderRadius}
      $padding={padding}
      $margin={margin}
      $width={width}
      $height={height}
      $glow={glow}
      $glowColor={glowColor}
      $glowIntensity={getGlowIntensity(glowIntensity)}
      className={className}
      onClick={onClick}
      variants={animated ? panelVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={animated ? 'hover' : undefined}
      whileTap={animated && onClick ? 'tap' : undefined}
    >
      {children}
    </Panel>
  );
};

export default GlassPanel;
