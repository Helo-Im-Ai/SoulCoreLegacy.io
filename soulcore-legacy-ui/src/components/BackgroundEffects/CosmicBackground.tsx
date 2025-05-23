// src/components/BackgroundEffects/CosmicBackground.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import theme from '../../styles/theme';

// Types
interface CosmicBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  colorScheme?: 'default' | 'aurora' | 'cosmic' | 'energy';
  animated?: boolean;
  className?: string;
}

// Styled Components
const BackgroundContainer = styled.div<{ intensity: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  opacity: ${props => props.intensity === 'high' ? 0.8 : props.intensity === 'medium' ? 0.6 : 0.4};
  pointer-events: none;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(2px 2px at calc(var(--x) * 1vw) calc(var(--y) * 1vh), 
                     rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  background-size: 200px 200px;
`;

const GradientOrb = styled.div<{ size: number; color: string; blur: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.color};
  filter: blur(${props => props.blur}px);
  opacity: 0.6;
  will-change: transform;
`;

const NebulaLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.15;
  mix-blend-mode: screen;
`;

// Main Component
const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  intensity = 'medium',
  colorScheme = 'default',
  animated = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  
  // Generate color scheme based on prop
  const getColorScheme = () => {
    switch (colorScheme) {
      case 'aurora':
        return [
          theme.colors.accent.aurora,
          theme.colors.primary.light,
          theme.colors.accent.nature,
          theme.colors.accent.aurora
        ];
      case 'cosmic':
        return [
          theme.colors.accent.cosmic,
          theme.colors.secondary.main,
          theme.colors.primary.dark,
          theme.colors.accent.cosmic
        ];
      case 'energy':
        return [
          theme.colors.accent.energy,
          theme.colors.accent.cosmic,
          theme.colors.secondary.light,
          theme.colors.accent.energy
        ];
      default:
        return [
          theme.colors.primary.main,
          theme.colors.secondary.main,
          theme.colors.accent.aurora,
          theme.colors.accent.energy
        ];
    }
  };
  
  // Create animated background
  useEffect(() => {
    if (!containerRef.current || !animated) return;
    
    // Clear existing orbs
    containerRef.current.innerHTML = '';
    orbsRef.current = [];
    
    // Create star field
    if (!starsRef.current) {
      const starField = document.createElement('div');
      starField.className = 'star-field';
      starField.style.position = 'absolute';
      starField.style.top = '0';
      starField.style.left = '0';
      starField.style.right = '0';
      starField.style.bottom = '0';
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'rgba(255, 255, 255, ' + opacity + ')';
        
        starField.appendChild(star);
      }
      
      containerRef.current.appendChild(starField);
      starsRef.current = starField;
    }
    
    // Create orbs
    const colors = getColorScheme();
    const orbCount = intensity === 'high' ? 6 : intensity === 'medium' ? 4 : 2;
    
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = 'gradient-orb';
      orb.style.position = 'absolute';
      orb.style.borderRadius = '50%';
      
      // Set size
      const size = Math.random() * 300 + (intensity === 'high' ? 200 : intensity === 'medium' ? 150 : 100);
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      
      // Set position
      orb.style.top = `${Math.random() * 100}%`;
      orb.style.left = `${Math.random() * 100}%`;
      
      // Set color
      orb.style.background = colors[i % colors.length];
      
      // Set blur
      const blur = intensity === 'high' ? 80 : intensity === 'medium' ? 60 : 40;
      orb.style.filter = `blur(${blur}px)`;
      
      // Set opacity
      orb.style.opacity = '0.4';
      
      containerRef.current.appendChild(orb);
      orbsRef.current.push(orb);
    }
    
    // Create nebula effect
    const nebula = document.createElement('div');
    nebula.className = 'nebula-layer';
    nebula.style.position = 'absolute';
    nebula.style.top = '0';
    nebula.style.left = '0';
    nebula.style.right = '0';
    nebula.style.bottom = '0';
    nebula.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";
    nebula.style.opacity = '0.15';
    nebula.style.mixBlendMode = 'screen';
    
    containerRef.current.appendChild(nebula);
    
    // Animate orbs
    if (animated) {
      orbsRef.current.forEach((orb) => {
        gsap.to(orb, {
          x: `random(-30, 30)%`,
          y: `random(-30, 30)%`,
          duration: 'random(30, 60)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }
    
    // Cleanup
    return () => {
      gsap.killTweensOf(orbsRef.current);
    };
  }, [intensity, colorScheme, animated]);
  
  return (
    <BackgroundContainer 
      ref={containerRef} 
      className={className}
      intensity={intensity}
    />
  );
};

export default CosmicBackground;
