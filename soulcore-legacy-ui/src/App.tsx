// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './routes/AppRoutes';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize any global effects or listeners
  useEffect(() => {
    // Add cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'transparent';
    cursor.style.border = `2px solid ${theme.colors.primary.main}`;
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s, transform 0.1s';
    document.body.appendChild(cursor);
    
    // Add cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '5px';
    cursorDot.style.height = '5px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.backgroundColor = theme.colors.primary.main;
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorDot);
    
    // Update cursor position
    const updateCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };
    
    // Handle cursor over interactive elements
    const handleMouseEnter = () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.backgroundColor = `${theme.colors.primary.main}20`;
      cursor.style.mixBlendMode = 'difference';
    };
    
    const handleMouseLeave = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.mixBlendMode = 'normal';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.body.removeChild(cursor);
      document.body.removeChild(cursorDot);
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
