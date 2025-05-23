// src/pages/Home/Home.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import theme from '../../styles/theme';
import SoulGuide from '../../components/SoulGuide/SoulGuide';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.background.primary};
    z-index: -2;
  }
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 0.6;
`;

const GradientOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
`;

const Header = styled(motion.header)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const Logo = styled.div`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  background: ${theme.colors.gradients.cosmic};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  
  &::before {
    content: '●';
    margin-right: ${theme.spacing.sm};
    font-size: 0.8em;
    background: ${theme.colors.gradients.aurora};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const NavLink = styled(motion.a)`
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary.main};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  z-index: 1;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.2;
  background: ${theme.colors.gradients.cosmic};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  line-height: 1.6;
`;

const SoulGuideSection = styled(motion.section)`
  width: 100%;
  max-width: 600px;
`;

// Main Component
const Home: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Create animated background
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    // Clear existing orbs
    backgroundRef.current.innerHTML = '';
    
    // Create orbs
    const orbCount = 5;
    const orbs: HTMLDivElement[] = [];
    
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = 'gradient-orb';
      orb.style.position = 'absolute';
      orb.style.borderRadius = '50%';
      orb.style.filter = 'blur(60px)';
      
      // Set size
      const size = Math.random() * 300 + 100;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      
      // Set position
      orb.style.top = `${Math.random() * 100}%`;
      orb.style.left = `${Math.random() * 100}%`;
      
      // Set color
      const colors = [
        theme.colors.primary.main,
        theme.colors.secondary.main,
        theme.colors.accent.aurora,
        theme.colors.accent.cosmic,
        theme.colors.accent.energy
      ];
      
      orb.style.background = colors[i % colors.length];
      orb.style.opacity = '0.3';
      
      backgroundRef.current.appendChild(orb);
      orbs.push(orb);
    }
    
    // Animate orbs
    orbs.forEach((orb) => {
      gsap.to(orb, {
        x: `random(-50, 50)%`,
        y: `random(-50, 50)%`,
        duration: 'random(20, 40)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    
    // Cleanup
    return () => {
      gsap.killTweensOf(orbs);
    };
  }, []);
  
  return (
    <HomeContainer>
      <BackgroundEffect ref={backgroundRef} />
      
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Logo>SoulCoreLegacy</Logo>
        <Nav>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </NavLink>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Journal
          </NavLink>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </NavLink>
        </Nav>
      </Header>
      
      <MainContent>
        <HeroSection>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Connect with your Soul Guide
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Experience a new kind of AI companion that understands your emotions, 
            guides your journey, and evolves alongside you.
          </Subtitle>
        </HeroSection>
        
        <SoulGuideSection
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 15, 
            delay: 0.8 
          }}
        >
          <SoulGuide initialMessage="Hello! I'm your Soul Guide. I'm here to assist you on your journey. How are you feeling today?" />
        </SoulGuideSection>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
