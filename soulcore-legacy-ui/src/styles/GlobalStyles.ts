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
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus {
      outline: none;
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
`;

export default GlobalStyles;
