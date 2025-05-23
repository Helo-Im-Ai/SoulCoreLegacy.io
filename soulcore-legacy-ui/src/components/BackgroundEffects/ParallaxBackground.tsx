import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface StarProps {
  size: number;
  color: string;
  x: number;
  y: number;
}

interface NebulaProps {
  size: number;
  color: string;
  x: number;
  y: number;
}

interface ParallaxBackgroundProps {
  intensity?: number;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ intensity = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Array<StarProps & { layer: number }>>([]);
  const [nebulae, setNebulae] = useState<Array<NebulaProps & { layer: number }>>([]);

  // Generate stars and nebulae on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starColors = [
        '#FFFFFF', // White
        '#E0E0FF', // Blue-white
        '#FFFAE0', // Yellow-white
        '#FFE0E0', // Red-white
        '#6E44FF', // cosmicViolet
        '#4A90E2', // auroraBlue
        '#50E3C2'  // divineGreen
      ];

      // Generate 200 stars across 3 layers
      for (let i = 0; i < 200; i++) {
        const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
        newStars.push({
          size: Math.random() * 2 + 1,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          layer
        });
      }
      
      setStars(newStars);
    };

    const generateNebulae = () => {
      const newNebulae = [];
      const nebulaColors = [
        '#6E44FF', // cosmicViolet
        '#4A90E2', // auroraBlue
        '#50E3C2', // divineGreen
        '#FF5A5F'  // soulRed
      ];

      // Generate 5 nebulae across 3 layers
      for (let i = 0; i < 5; i++) {
        const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
        newNebulae.push({
          size: Math.random() * 300 + 200,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          layer
        });
      }
      
      setNebulae(newNebulae);
    };

    generateStars();
    generateNebulae();
  }, []);

  // Handle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage of screen
      const mouseX = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const mouseY = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      
      // Apply parallax effect to each layer
      const layers = containerRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const depth = index + 1;
        const moveX = mouseX * depth * intensity * 10;
        const moveY = mouseY * depth * intensity * 10;
        
        gsap.to(layer, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: 'power2.out'
        });
      });
    };

    // Add twinkling animation to stars
    const animateStars = () => {
      const starElements = document.querySelectorAll('.star');
      starElements.forEach(star => {
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 2;
        
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.5,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    };

    // Add subtle movement to nebulae
    const animateNebulae = () => {
      const nebulaElements = document.querySelectorAll('.nebula');
      nebulaElements.forEach(nebula => {
        const xMovement = (Math.random() - 0.5) * 10;
        const yMovement = (Math.random() - 0.5) * 10;
        const duration = 20 + Math.random() * 30;
        
        gsap.to(nebula, {
          x: `+=${xMovement}`,
          y: `+=${yMovement}`,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animations after a short delay to ensure elements are rendered
    setTimeout(() => {
      animateStars();
      animateNebulae();
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf('.star');
      gsap.killTweensOf('.nebula');
    };
  }, [intensity]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      {/* Layer 1 - Far background */}
      <div 
        className="parallax-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translateZ(-30px) scale(1.3)',
          opacity: 1
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {stars
            .filter(star => star.layer === 0)
            .map((star, index) => (
              <div 
                key={`star-bg-${index}`}
                className="star"
                style={{
                  position: 'absolute',
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  borderRadius: '50%',
                  backgroundColor: star.color,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}`
                }}
              />
            ))}
          {nebulae
            .filter(nebula => nebula.layer === 0)
            .map((nebula, index) => (
              <div
                key={`nebula-bg-${index}`}
                className="nebula"
                style={{
                  position: 'absolute',
                  width: `${nebula.size}px`,
                  height: `${nebula.size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at center, ${nebula.color} 0%, transparent 70%)`,
                  left: `${nebula.x}%`,
                  top: `${nebula.y}%`,
                  opacity: 0.3,
                  filter: 'blur(30px)'
                }}
              />
            ))}
        </div>
      </div>
      
      {/* Layer 2 - Middle background */}
      <div 
        className="parallax-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translateZ(-20px) scale(1.2)',
          opacity: 1
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {stars
            .filter(star => star.layer === 1)
            .map((star, index) => (
              <div 
                key={`star-mid-${index}`}
                className="star"
                style={{
                  position: 'absolute',
                  width: `${star.size * 1.2}px`,
                  height: `${star.size * 1.2}px`,
                  borderRadius: '50%',
                  backgroundColor: star.color,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}`
                }}
              />
            ))}
          {nebulae
            .filter(nebula => nebula.layer === 1)
            .map((nebula, index) => (
              <div
                key={`nebula-mid-${index}`}
                className="nebula"
                style={{
                  position: 'absolute',
                  width: `${nebula.size}px`,
                  height: `${nebula.size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at center, ${nebula.color} 0%, transparent 70%)`,
                  left: `${nebula.x}%`,
                  top: `${nebula.y}%`,
                  opacity: 0.3,
                  filter: 'blur(30px)'
                }}
              />
            ))}
        </div>
      </div>
      
      {/* Layer 3 - Foreground */}
      <div 
        className="parallax-layer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translateZ(-10px) scale(1.1)',
          opacity: 0.8
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {stars
            .filter(star => star.layer === 2)
            .map((star, index) => (
              <div 
                key={`star-fg-${index}`}
                className="star"
                style={{
                  position: 'absolute',
                  width: `${star.size * 1.5}px`,
                  height: `${star.size * 1.5}px`,
                  borderRadius: '50%',
                  backgroundColor: star.color,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px ${star.color}`
                }}
              />
            ))}
          {nebulae
            .filter(nebula => nebula.layer === 2)
            .map((nebula, index) => (
              <div
                key={`nebula-fg-${index}`}
                className="nebula"
                style={{
                  position: 'absolute',
                  width: `${nebula.size}px`,
                  height: `${nebula.size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at center, ${nebula.color} 0%, transparent 70%)`,
                  left: `${nebula.x}%`,
                  top: `${nebula.y}%`,
                  opacity: 0.3,
                  filter: 'blur(30px)'
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
