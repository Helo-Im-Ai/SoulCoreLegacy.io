// src/styles/theme.ts
// This file defines our design system tokens with a focus on animation and movement

export const colors = {
  // Primary palette
  primary: {
    main: '#3A86FF', // Vibrant blue - primary action color
    light: '#61A0FF',
    dark: '#2563EB',
    contrast: '#FFFFFF',
  },
  
  // Secondary palette
  secondary: {
    main: '#8B5CF6', // Purple - secondary action color
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF',
  },
  
  // Accent colors for highlights and special elements
  accent: {
    aurora: '#00BFFF', // Aurora blue - for cognitive elements
    cosmic: '#FF3D71', // Cosmic red - for alerts and important actions
    energy: '#FFAA00', // Energy yellow - for notifications and highlights
    nature: '#10B981', // Nature green - for success and positive feedback
  },
  
  // Background colors
  background: {
    primary: '#0F172A', // Deep space blue - main background
    secondary: '#1E293B', // Slightly lighter blue - card backgrounds
    tertiary: '#334155', // Even lighter - interactive elements
    overlay: 'rgba(15, 23, 42, 0.8)', // For modal overlays
  },
  
  // Text colors
  text: {
    primary: '#F8FAFC', // Almost white - primary text
    secondary: '#CBD5E1', // Light gray - secondary text
    disabled: '#64748B', // Medium gray - disabled text
    hint: '#94A3B8', // Hint text
  },
  
  // Status colors
  status: {
    success: '#10B981', // Green
    warning: '#FBBF24', // Amber
    error: '#EF4444', // Red
    info: '#3B82F6', // Blue
  },
  
  // Gradient presets
  gradients: {
    cosmic: 'linear-gradient(135deg, #3A86FF 0%, #8B5CF6 100%)',
    aurora: 'linear-gradient(135deg, #00BFFF 0%, #10B981 100%)',
    energy: 'linear-gradient(135deg, #FFAA00 0%, #FF3D71 100%)',
    night: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
  },
};

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  xxl: '3rem',   // 48px
};

export const typography = {
  fontFamily: {
    primary: "'Inter', sans-serif",
    display: "'Space Grotesk', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    xxl: '1.5rem',   // 24px
    h1: '2.5rem',    // 40px
    h2: '2rem',      // 32px
    h3: '1.75rem',   // 28px
    h4: '1.5rem',    // 24px
  },
};

export const animation = {
  // Timing functions
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  // Duration presets
  duration: {
    instant: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    deliberate: '0.8s',
    entrance: '1.2s',
  },
  
  // Keyframe animations
  keyframes: {
    pulse: `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `,
    float: `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `,
    glow: `
      @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(0, 191, 255, 0.5); }
        50% { box-shadow: 0 0 20px rgba(0, 191, 255, 0.8); }
        100% { box-shadow: 0 0 5px rgba(0, 191, 255, 0.5); }
      }
    `,
    breathe: `
      @keyframes breathe {
        0% { opacity: 0.7; transform: scale(0.98); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0.7; transform: scale(0.98); }
      }
    `,
    fadeIn: `
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `,
    slideUp: `
      @keyframes slideUp {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    `,
  },
};

export const shadows = {
  sm: '0 1px 2px rgba(15, 23, 42, 0.1)',
  md: '0 4px 6px rgba(15, 23, 42, 0.1)',
  lg: '0 10px 15px rgba(15, 23, 42, 0.1)',
  xl: '0 20px 25px rgba(15, 23, 42, 0.1)',
  inner: 'inset 0 2px 4px rgba(15, 23, 42, 0.05)',
  glow: '0 0 15px rgba(0, 191, 255, 0.5)',
  cosmic: '0 0 20px rgba(139, 92, 246, 0.5)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.25rem',  // 4px
  lg: '0.5rem',   // 8px
  xl: '1rem',     // 16px
  full: '9999px', // Fully rounded (circles)
};

export const zIndex = {
  base: 0,
  above: 1,
  dropdown: 10,
  sticky: 100,
  fixed: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

// Theme object that combines all tokens
const theme = {
  colors,
  spacing,
  typography,
  animation,
  shadows,
  borderRadius,
  zIndex,
  breakpoints,
};

export default theme;
