// src/components/SoulGuide/SoulGuideAvatar.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import theme from '../../styles/theme';
import { AvatarEmotionalState } from '../CognitiveBuddyAvatar/CognitiveBuddyAvatar';

// Styled Components
const AvatarContainer = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.gradients.cosmic};
    opacity: 0.2;
    z-index: 1;
  }
`;

const CoreOrb = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.gradients.aurora};
  position: relative;
  z-index: 2;
`;

const EnergyRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: transparent;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(to right, ${theme.colors.accent.aurora}, transparent, ${theme.colors.accent.energy}) border-box;
    -webkit-mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  pointer-events: none;
`;

const Particle = styled.div<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0;
`;

// Props
interface SoulGuideAvatarProps {
  emotionalState?: AvatarEmotionalState;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Main Component
const SoulGuideAvatar: React.FC<SoulGuideAvatarProps> = ({ 
  emotionalState = 'idle',
  size = 'medium',
  className
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  
  // Create particles on mount
  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Clear existing particles
    particlesRef.current.innerHTML = '';
    
    // Create new particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      
      // Assign a color based on index
      let color;
      if (i < particleCount / 4) {
        color = theme.colors.accent.aurora;
      } else if (i < particleCount / 2) {
        color = theme.colors.accent.energy;
      } else if (i < (particleCount / 4) * 3) {
        color = theme.colors.primary.main;
      } else {
        color = theme.colors.secondary.main;
      }
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.position = 'absolute';
      particle.style.opacity = '0';
      
      particlesRef.current.appendChild(particle);
    }
  }, []);
  
  // Animate based on emotional state
  useEffect(() => {
    if (!avatarRef.current || !particlesRef.current || !orbRef.current) return;
    
    // Get all particles
    const particles = particlesRef.current.children;
    
    // Stop any running animations
    gsap.killTweensOf(particles);
    gsap.killTweensOf(orbRef.current);
    
    // Base animation for orb
    let orbAnimation;
    let particleAnimation;
    let orbColor;
    
    switch (emotionalState) {
      case 'idle':
        orbColor = theme.colors.gradients.aurora;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 0.95,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        particleAnimation = gsap.to(particles, {
          opacity: 0.7,
          duration: 0.5,
          stagger: 0.1,
          repeat: -1,
          yoyo: true
        });
        break;
        
      case 'happy':
      case 'elated':
        orbColor = `radial-gradient(circle, ${theme.colors.accent.energy}, ${theme.colors.primary.light})`;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 1.1,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'elastic.out(1, 0.3)'
        });
        
        // Animate particles in a celebratory pattern
        Array.from(particles).forEach((particle, i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const radius = 30;
          
          gsap.to(particle, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            opacity: 0.8,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.05
          });
        });
        break;
        
      case 'focusedProblemSolving':
      case 'thinking':
        orbColor = `radial-gradient(circle, ${theme.colors.accent.aurora}, ${theme.colors.primary.dark})`;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 1.05,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
        
        // Animate particles in a circular pattern
        Array.from(particles).forEach((particle, i) => {
          const delay = i * 0.1;
          const duration = 3;
          
          gsap.to(particle, {
            keyframes: [
              { opacity: 0.8, duration: duration * 0.2 },
              { 
                opacity: 0, 
                x: Math.cos(i * 0.5) * 25, 
                y: Math.sin(i * 0.5) * 25, 
                duration: duration * 0.8 
              }
            ],
            delay,
            repeat: -1,
            ease: 'power1.inOut'
          });
        });
        break;
        
      case 'curious':
        orbColor = `radial-gradient(circle, ${theme.colors.secondary.light}, ${theme.colors.primary.main})`;
        orbAnimation = gsap.to(orbRef.current, {
          keyframes: [
            { scale: 1, duration: 0.5 },
            { scale: 0.9, duration: 0.3 },
            { scale: 1.1, duration: 0.3 },
            { scale: 1, duration: 0.5 }
          ],
          repeat: -1,
          ease: 'power1.inOut'
        });
        
        // Animate particles in an exploratory pattern
        Array.from(particles).forEach((particle, i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const radius = 20 + Math.random() * 10;
          
          gsap.to(particle, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            opacity: 0.6,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.1
          });
        });
        break;
        
      case 'empathetic':
        orbColor = `radial-gradient(circle, ${theme.colors.accent.nature}, ${theme.colors.secondary.main})`;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Gentle pulsing particles
        Array.from(particles).forEach((particle, i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const radius = 25;
          
          gsap.to(particle, {
            x: Math.cos(angle) * radius * Math.sin(i),
            y: Math.sin(angle) * radius * Math.cos(i),
            opacity: 0.5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.1
          });
        });
        break;
        
      case 'competitive':
      case 'determined':
        orbColor = `radial-gradient(circle, ${theme.colors.accent.cosmic}, ${theme.colors.primary.dark})`;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 1.15,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
        
        // Energetic particle movement
        Array.from(particles).forEach((particle, i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const radius = 30;
          
          gsap.to(particle, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            opacity: 0.8,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.03
          });
        });
        break;
        
      case 'listening':
        orbColor = `radial-gradient(circle, ${theme.colors.accent.aurora}, ${theme.colors.secondary.light})`;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 0.9,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Subtle particle movement
        Array.from(particles).forEach((particle, i) => {
          const delay = i * 0.05;
          
          gsap.to(particle, {
            opacity: 0.4,
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay
          });
        });
        break;
        
      default:
        orbColor = theme.colors.gradients.aurora;
        orbAnimation = gsap.to(orbRef.current, {
          scale: 0.95,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        break;
    }
    
    // Apply color to orb
    orbRef.current.style.background = orbColor;
    
    // Return cleanup function
    return () => {
      orbAnimation?.kill();
      if (particleAnimation) particleAnimation.kill();
    };
  }, [emotionalState]);
  
  return (
    <AvatarContainer 
      ref={avatarRef}
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CoreOrb ref={orbRef} />
      <EnergyRing 
        animate={{ 
          rotate: 360 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      />
      <ParticleContainer ref={particlesRef} />
    </AvatarContainer>
  );
};

export default SoulGuideAvatar;
