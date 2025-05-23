// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  /* Define animations */
  ${theme.animation.keyframes.pulse}
  ${theme.animation.keyframes.float}
  ${theme.animation.keyframes.glow}
  ${theme.animation.keyframes.breathe}
  ${theme.animation.keyframes.fadeIn}
  ${theme.animation.keyframes.slideUp}

  /* Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.md};
    line-height: 1.5;
    color: ${theme.colors.text.primary};
    background: ${theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${theme.animation.duration.normal} ${theme.animation.easing.standard};
    cursor: none; /* Hide default cursor when using custom cursor */
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.display};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${theme.typography.fontSize.h1};
    background: ${theme.colors.gradients.cosmic};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: breathe 4s infinite ease-in-out;
  }

  h2 {
    font-size: ${theme.typography.fontSize.h2};
  }

  h3 {
    font-size: ${theme.typography.fontSize.h3};
  }

  h4 {
    font-size: ${theme.typography.fontSize.h4};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: color ${theme.animation.duration.fast} ${theme.animation.easing.standard};
    position: relative;
    cursor: none; /* Use custom cursor */
    
    &:hover {
      color: ${theme.colors.primary.light};
      
      &::after {
        width: 100%;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: ${theme.colors.primary.light};
      transition: width ${theme.animation.duration.normal} ${theme.animation.easing.standard};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily.primary};
    cursor: none; /* Use custom cursor */
    border: none;
    background: none;
    
    &:focus {
      outline: none;
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.md};
    background: rgba(51, 65, 85, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.md};
    color: ${theme.colors.text.primary};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    transition: all 0.3s ease;
    cursor: none; /* Use custom cursor */
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 2px ${theme.colors.primary.main}40;
    }
    
    &::placeholder {
      color: ${theme.colors.text.hint};
    }
  }

  /* Utility classes */
  .text-gradient {
    background: ${theme.colors.gradients.cosmic};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .animate-pulse {
    animation: pulse 2s infinite ease-in-out;
  }

  .animate-float {
    animation: float 6s infinite ease-in-out;
  }

  .animate-glow {
    animation: glow 3s infinite alternate;
  }

  .animate-breathe {
    animation: breathe 4s infinite ease-in-out;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.background.tertiary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.dark};
  }
  
  /* Selection styling */
  ::selection {
    background-color: ${theme.colors.primary.main}40;
    color: ${theme.colors.text.primary};
  }
  
  /* Custom cursor styles */
  .custom-cursor {
    pointer-events: none;
    mix-blend-mode: difference;
    z-index: 9999;
  }
  
  .custom-cursor-dot {
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: difference;
  }
  
  /* Hide cursor on touch devices */
  @media (hover: none) and (pointer: coarse) {
    .custom-cursor, .custom-cursor-dot {
      display: none;
    }
    
    body, a, button, input, textarea, select {
      cursor: auto;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: ${theme.breakpoints.md}) {
    h1 {
      font-size: ${theme.typography.fontSize.h2};
    }
    
    h2 {
      font-size: ${theme.typography.fontSize.h3};
    }
    
    h3 {
      font-size: ${theme.typography.fontSize.h4};
    }
  }
`;

export default GlobalStyles;
