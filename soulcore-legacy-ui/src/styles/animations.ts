// src/styles/animations.ts
// Advanced animation library for SoulCoreLegacy

import { keyframes } from 'styled-components';
import theme from './theme';

// Basic animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideLeft = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideRight = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Pulse animations
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const pulseFast = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

export const pulseLight = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

// Float animations
export const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const floatSlow = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const floatWithRotate = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(1deg);
  }
  50% {
    transform: translateY(-10px) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(-1deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

// Glow animations
export const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 191, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
  }
`;

export const glowPurple = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
  }
`;

export const glowGold = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 170, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
  }
`;

// Breathe animation
export const breathe = keyframes`
  0% {
    transform: scale(0.98);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.98);
    opacity: 0.8;
  }
`;

// Rotate animations
export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const rotateReverse = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

export const rotateSlow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Shimmer effect for text
export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Wave animation
export const wave = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-5px) translateY(-5px);
  }
  50% {
    transform: translateX(0) translateY(-10px);
  }
  75% {
    transform: translateX(5px) translateY(-5px);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
`;

// Typing animation
export const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const blink = keyframes`
  50% {
    border-color: transparent;
  }
`;

// Cosmic background animations
export const cosmicPulse = keyframes`
  0% {
    background-size: 100% 100%;
    opacity: 0.5;
  }
  50% {
    background-size: 120% 120%;
    opacity: 0.7;
  }
  100% {
    background-size: 100% 100%;
    opacity: 0.5;
  }
`;

export const cosmicShift = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// Particle animations
export const particleDrift = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  25% {
    opacity: 0.8;
  }
  50% {
    transform: translate(var(--x-drift), var(--y-drift));
    opacity: 0.5;
  }
  75% {
    opacity: 0.8;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
`;

export const particleBurst = keyframes`
  0% {
    transform: scale(0) translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(var(--x-drift), var(--y-drift));
    opacity: 0;
  }
`;

// Energy flow animation
export const energyFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Text reveal animation
export const textReveal = keyframes`
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
`;

// Border animation
export const borderPulse = keyframes`
  0% {
    border-color: ${theme.colors.primary.main};
  }
  50% {
    border-color: ${theme.colors.secondary.main};
  }
  100% {
    border-color: ${theme.colors.primary.main};
  }
`;

// Gradient shift animation
export const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Emotional state animations
export const emotionHappy = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const emotionCurious = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

export const emotionFocused = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px ${theme.colors.accent.aurora};
  }
  50% {
    transform: scale(0.95);
    box-shadow: 0 0 20px ${theme.colors.accent.aurora};
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px ${theme.colors.accent.aurora};
  }
`;

export const emotionEmpathetic = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px ${theme.colors.accent.nature};
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 15px ${theme.colors.accent.nature};
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px ${theme.colors.accent.nature};
  }
`;

// Animation utility functions
export const animationMixin = {
  fadeIn: `animation: ${fadeIn} 0.5s ease-out forwards;`,
  fadeOut: `animation: ${fadeOut} 0.5s ease-out forwards;`,
  slideUp: `animation: ${slideUp} 0.5s ease-out forwards;`,
  slideDown: `animation: ${slideDown} 0.5s ease-out forwards;`,
  slideLeft: `animation: ${slideLeft} 0.5s ease-out forwards;`,
  slideRight: `animation: ${slideRight} 0.5s ease-out forwards;`,
  pulse: `animation: ${pulse} 2s infinite ease-in-out;`,
  pulseFast: `animation: ${pulseFast} 1s infinite ease-in-out;`,
  pulseLight: `animation: ${pulseLight} 2s infinite ease-in-out;`,
  float: `animation: ${float} 6s infinite ease-in-out;`,
  floatSlow: `animation: ${floatSlow} 8s infinite ease-in-out;`,
  floatWithRotate: `animation: ${floatWithRotate} 8s infinite ease-in-out;`,
  glow: `animation: ${glow} 3s infinite alternate;`,
  glowPurple: `animation: ${glowPurple} 3s infinite alternate;`,
  glowGold: `animation: ${glowGold} 3s infinite alternate;`,
  breathe: `animation: ${breathe} 4s infinite ease-in-out;`,
  rotate: `animation: ${rotate} 10s linear infinite;`,
  rotateReverse: `animation: ${rotateReverse} 10s linear infinite;`,
  rotateSlow: `animation: ${rotateSlow} 20s linear infinite;`,
  shimmer: `
    background: linear-gradient(90deg, 
      ${theme.colors.text.primary}00, 
      ${theme.colors.text.primary}80, 
      ${theme.colors.text.primary}00
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
  `,
  wave: `animation: ${wave} 5s infinite ease-in-out;`,
  typing: `
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid ${theme.colors.primary.main};
    animation: 
      ${typing} 3.5s steps(40, end),
      ${blink} 1s step-end infinite;
  `,
  cosmicPulse: `animation: ${cosmicPulse} 15s infinite ease-in-out;`,
  cosmicShift: `animation: ${cosmicShift} 30s infinite ease-in-out;`,
  energyFlow: `
    background: linear-gradient(90deg, 
      ${theme.colors.primary.main}, 
      ${theme.colors.secondary.main}, 
      ${theme.colors.primary.main}
    );
    background-size: 200% 100%;
    animation: ${energyFlow} 5s infinite;
  `,
  textReveal: `animation: ${textReveal} 1s forwards;`,
  borderPulse: `animation: ${borderPulse} 3s infinite;`,
  gradientShift: `
    background: linear-gradient(90deg, 
      ${theme.colors.primary.main}, 
      ${theme.colors.secondary.main}, 
      ${theme.colors.primary.main}
    );
    background-size: 200% 100%;
    animation: ${gradientShift} 5s infinite;
  `,
  emotionHappy: `animation: ${emotionHappy} 2s ease-in-out;`,
  emotionCurious: `animation: ${emotionCurious} 3s ease-in-out;`,
  emotionFocused: `animation: ${emotionFocused} 2s infinite;`,
  emotionEmpathetic: `animation: ${emotionEmpathetic} 3s infinite;`,
};

export default animationMixin;
