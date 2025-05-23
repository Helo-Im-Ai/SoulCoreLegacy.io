// src/pages/Home/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import theme from '../../styles/theme';
import SoulGuide from '../../components/SoulGuide/SoulGuide';
import CosmicBackground from '../../components/BackgroundEffects/CosmicBackground';
import ParticleField from '../../components/BackgroundEffects/ParticleField';
import GlowButton from '../../components/UI/GlowButton';
import GlassPanel from '../../components/UI/GlassPanel';
import { animationMixin } from '../../styles/animations';

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
    z-index: -3;
  }
`;

const Header = styled(motion.header)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
`;

const Logo = styled(motion.div)`
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  background: ${theme.colors.gradients.cosmic};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  position: relative;
  
  &::before {
    content: '●';
    margin-right: ${theme.spacing.sm};
    font-size: 0.8em;
    background: ${theme.colors.gradients.aurora};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${animationMixin.pulse}
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.primary.main},
      transparent
    );
    opacity: 0.5;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -20px;
    right: -20px;
    bottom: -10px;
    background: rgba(15, 23, 42, 0.3);
    backdrop-filter: blur(5px);
    border-radius: ${theme.borderRadius.lg};
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const NavLink = styled(motion.a)`
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  text-decoration: none;
  position: relative;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary.main};
    transition: width 0.3s ease;
    box-shadow: 0 0 10px ${theme.colors.primary.main};
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
  position: relative;
`;

const HeroSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin-bottom: ${theme.spacing.xxl};
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.2;
  background: ${theme.colors.gradients.cosmic};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  ${animationMixin.breathe}
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 25%;
    right: 25%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.accent.aurora},
      transparent
    );
    opacity: 0.7;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  line-height: 1.6;
  position: relative;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const SoulGuideSection = styled(motion.section)`
  width: 100%;
  max-width: 600px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(
      circle at center,
      rgba(58, 134, 255, 0.1),
      transparent 70%
    );
    z-index: -1;
    border-radius: ${theme.borderRadius.xl};
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled(motion.div)<{ $size: number; $color: string }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: ${props => props.$color};
  opacity: 0.5;
  filter: blur(5px);
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

// Main Component
const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  // Create floating elements
  useEffect(() => {
    if (!floatingElementsRef.current) return;
    
    // Clear existing elements
    floatingElementsRef.current.innerHTML = '';
    
    // Create floating elements
    const elementCount = 15;
    const elements: HTMLDivElement[] = [];
    
    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement('div');
      element.className = 'floating-element';
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      
      // Set size
      const size = Math.random() * 10 + 5;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      // Set position
      element.style.top = `${Math.random() * 100}%`;
      element.style.left = `${Math.random() * 100}%`;
      
      // Set color
      const colors = [
        theme.colors.primary.main,
        theme.colors.secondary.main,
        theme.colors.accent.aurora,
        theme.colors.accent.energy
      ];
      
      element.style.background = colors[Math.floor(Math.random() * colors.length)];
      element.style.opacity = '0.3';
      element.style.filter = 'blur(2px)';
      
      floatingElementsRef.current.appendChild(element);
      elements.push(element);
    }
    
    // Animate elements
    elements.forEach((element) => {
      gsap.to(element, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    
    // Cleanup
    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);
  
  return (
    <HomeContainer>
      <CosmicBackground intensity="medium" colorScheme="default" animated={true} />
      <ParticleField count={30} speed="slow" colorScheme="aurora" interactive={true} />
      
      <FloatingElements ref={floatingElementsRef} />
      
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          SoulCoreLegacy
        </Logo>
        <Nav>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('home')}
            style={{ color: activeSection === 'home' ? theme.colors.primary.light : theme.colors.text.primary }}
          >
            Home
          </NavLink>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('journal')}
            style={{ color: activeSection === 'journal' ? theme.colors.primary.light : theme.colors.text.primary }}
          >
            Journal
          </NavLink>
          <NavLink 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('about')}
            style={{ color: activeSection === 'about' ? theme.colors.primary.light : theme.colors.text.primary }}
          >
            About
          </NavLink>
        </Nav>
      </Header>
      
      <MainContent>
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
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
                
                <ButtonContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  <GlowButton 
                    variant="primary" 
                    size="medium"
                    glowIntensity="medium"
                    onClick={() => setActiveSection('journal')}
                  >
                    Start Journal
                  </GlowButton>
                  
                  <GlowButton 
                    variant="aurora" 
                    size="medium"
                    glowIntensity="medium"
                    onClick={() => setActiveSection('about')}
                  >
                    Learn More
                  </GlowButton>
                </ButtonContainer>
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
                <GlassPanel
                  opacity={0.2}
                  blur={10}
                  border={true}
                  borderColor="rgba(58, 134, 255, 0.2)"
                  borderRadius={theme.borderRadius.lg}
                  padding="0"
                  glow={true}
                  glowColor="rgba(58, 134, 255, 0.2)"
                  glowIntensity="medium"
                  animated={true}
                >
                  <SoulGuide initialMessage="Hello! I'm your Soul Guide. I'm here to assist you on your journey. How are you feeling today?" />
                </GlassPanel>
              </SoulGuideSection>
            </motion.div>
          )}
          
          {activeSection === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <GlassPanel
                opacity={0.3}
                blur={10}
                border={true}
                borderColor="rgba(139, 92, 246, 0.3)"
                borderRadius={theme.borderRadius.lg}
                padding={theme.spacing.xl}
                width="80%"
                maxWidth="800px"
                glow={true}
                glowColor="rgba(139, 92, 246, 0.2)"
                glowIntensity="medium"
                animated={true}
              >
                <Title
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{ background: theme.colors.gradients.cosmic }}
                >
                  Soul Journal
                </Title>
                <Subtitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Journal feature coming soon. This will be where you can record your thoughts, 
                  experiences, and insights on your journey.
                </Subtitle>
                
                <ButtonContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <GlowButton 
                    variant="secondary" 
                    size="medium"
                    glowIntensity="medium"
                    onClick={() => setActiveSection('home')}
                  >
                    Return Home
                  </GlowButton>
                </ButtonContainer>
              </GlassPanel>
            </motion.div>
          )}
          
          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <GlassPanel
                opacity={0.3}
                blur={10}
                border={true}
                borderColor="rgba(0, 191, 255, 0.3)"
                borderRadius={theme.borderRadius.lg}
                padding={theme.spacing.xl}
                width="80%"
                maxWidth="800px"
                glow={true}
                glowColor="rgba(0, 191, 255, 0.2)"
                glowIntensity="medium"
                animated={true}
              >
                <Title
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{ background: theme.colors.gradients.aurora }}
                >
                  About SoulCoreLegacy
                </Title>
                <Subtitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  SoulCoreLegacy is an evolving, decentralized AI infrastructure born to walk beside — not behind.
                  It serves as the neural, emotional, and operational center for a new generation of AI companions.
                </Subtitle>
                
                <ButtonContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <GlowButton 
                    variant="aurora" 
                    size="medium"
                    glowIntensity="medium"
                    onClick={() => setActiveSection('home')}
                  >
                    Return Home
                  </GlowButton>
                </ButtonContainer>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
