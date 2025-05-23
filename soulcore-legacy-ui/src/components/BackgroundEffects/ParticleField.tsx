// src/components/BackgroundEffects/ParticleField.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

// Types
interface ParticleFieldProps {
  count?: number;
  speed?: 'slow' | 'medium' | 'fast';
  size?: 'small' | 'medium' | 'large';
  colorScheme?: 'default' | 'aurora' | 'cosmic' | 'energy';
  interactive?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  element: HTMLDivElement;
}

// Styled Components
const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

// Main Component
const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  speed = 'medium',
  size = 'medium',
  colorScheme = 'default',
  interactive = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseMovingRef = useRef(false);
  
  // Generate color scheme based on prop
  const getColorScheme = () => {
    switch (colorScheme) {
      case 'aurora':
        return [
          theme.colors.accent.aurora,
          theme.colors.primary.light,
          theme.colors.accent.nature,
          'rgba(0, 191, 255, 0.5)'
        ];
      case 'cosmic':
        return [
          theme.colors.accent.cosmic,
          theme.colors.secondary.main,
          theme.colors.primary.dark,
          'rgba(255, 61, 113, 0.5)'
        ];
      case 'energy':
        return [
          theme.colors.accent.energy,
          theme.colors.accent.cosmic,
          theme.colors.secondary.light,
          'rgba(255, 170, 0, 0.5)'
        ];
      default:
        return [
          theme.colors.primary.main,
          theme.colors.secondary.main,
          theme.colors.accent.aurora,
          'rgba(58, 134, 255, 0.5)'
        ];
    }
  };
  
  // Get speed factor based on prop
  const getSpeedFactor = () => {
    switch (speed) {
      case 'slow': return 0.2;
      case 'fast': return 0.8;
      default: return 0.5;
    }
  };
  
  // Get size factor based on prop
  const getSizeFactor = () => {
    switch (size) {
      case 'small': return 0.5;
      case 'large': return 2;
      default: return 1;
    }
  };
  
  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const colors = getColorScheme();
    const speedFactor = getSpeedFactor();
    const sizeFactor = getSizeFactor();
    
    // Clear existing particles
    container.innerHTML = '';
    particlesRef.current = [];
    
    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      
      // Random properties
      const particleSize = (Math.random() * 2 + 1) * sizeFactor;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const speedX = (Math.random() - 0.5) * speedFactor;
      const speedY = (Math.random() - 0.5) * speedFactor;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Apply styles
      particle.style.width = `${particleSize}px`;
      particle.style.height = `${particleSize}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.backgroundColor = color;
      particle.style.opacity = '0.6';
      particle.style.boxShadow = `0 0 ${particleSize * 2}px ${color}`;
      particle.style.transition = 'transform 0.2s ease-out';
      
      // Add to container and store reference
      container.appendChild(particle);
      particlesRef.current.push({
        x,
        y,
        size: particleSize,
        speedX,
        speedY,
        color,
        element: particle
      });
    }
    
    // Add connection lines layer
    const connectionCanvas = document.createElement('canvas');
    connectionCanvas.style.position = 'absolute';
    connectionCanvas.style.top = '0';
    connectionCanvas.style.left = '0';
    connectionCanvas.style.width = '100%';
    connectionCanvas.style.height = '100%';
    connectionCanvas.style.pointerEvents = 'none';
    connectionCanvas.style.opacity = '0.2';
    container.appendChild(connectionCanvas);
    
    // Setup canvas
    const resizeCanvas = () => {
      connectionCanvas.width = container.clientWidth;
      connectionCanvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function
    const animate = () => {
      if (!containerRef.current) return;
      
      const ctx = connectionCanvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, connectionCanvas.width, connectionCanvas.height);
      
      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > 100) {
          particle.speedX *= -1;
          particle.x = Math.max(0, Math.min(100, particle.x));
        }
        
        if (particle.y < 0 || particle.y > 100) {
          particle.speedY *= -1;
          particle.y = Math.max(0, Math.min(100, particle.y));
        }
        
        // Apply position
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
        
        // Interactive behavior - attract to mouse
        if (interactive && isMouseMovingRef.current) {
          const containerRect = container.getBoundingClientRect();
          const mouseX = mousePositionRef.current.x - containerRect.left;
          const mouseY = mousePositionRef.current.y - containerRect.top;
          
          const particleX = (particle.x / 100) * containerRect.width;
          const particleY = (particle.y / 100) * containerRect.height;
          
          const dx = mouseX - particleX;
          const dy = mouseY - particleY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Attract particles within a certain radius
          if (distance < 150) {
            const attractFactor = 0.03 * (1 - distance / 150);
            particle.speedX += dx * attractFactor / containerRect.width * 100;
            particle.speedY += dy * attractFactor / containerRect.height * 100;
            
            // Limit speed
            const maxSpeed = 0.5;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
            }
            
            // Glow effect
            particle.element.style.transform = 'scale(1.2)';
            particle.element.style.opacity = '0.8';
          } else {
            particle.element.style.transform = 'scale(1)';
            particle.element.style.opacity = '0.6';
          }
        }
        
        // Draw connections between nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          
          const particleX = (particle.x / 100) * connectionCanvas.width;
          const particleY = (particle.y / 100) * connectionCanvas.height;
          const otherX = (otherParticle.x / 100) * connectionCanvas.width;
          const otherY = (otherParticle.y / 100) * connectionCanvas.height;
          
          const dx = particleX - otherX;
          const dy = particleY - otherY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line if particles are close enough
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particleX, particleY);
            ctx.lineTo(otherX, otherY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      isMouseMovingRef.current = true;
      
      // Reset after a delay
      clearTimeout(mouseTimeout);
      const mouseTimeout = setTimeout(() => {
        isMouseMovingRef.current = false;
      }, 100);
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [count, speed, size, colorScheme, interactive]);
  
  return (
    <ParticleContainer 
      ref={containerRef} 
      className={className}
    />
  );
};

export default ParticleField;
