// src/components/UI/GlowButton.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../styles/theme';

// Types
interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'aurora' | 'cosmic' | 'energy';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowIntensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

// Helper function to get color based on variant
const getColors = (variant: string) => {
  switch (variant) {
    case 'secondary':
      return {
        bg: theme.colors.secondary.main,
        hover: theme.colors.secondary.light,
        glow: theme.colors.secondary.main,
      };
    case 'aurora':
      return {
        bg: theme.colors.accent.aurora,
        hover: `${theme.colors.accent.aurora}CC`,
        glow: theme.colors.accent.aurora,
      };
    case 'cosmic':
      return {
        bg: theme.colors.accent.cosmic,
        hover: `${theme.colors.accent.cosmic}CC`,
        glow: theme.colors.accent.cosmic,
      };
    case 'energy':
      return {
        bg: theme.colors.accent.energy,
        hover: `${theme.colors.accent.energy}CC`,
        glow: theme.colors.accent.energy,
      };
    default:
      return {
        bg: theme.colors.primary.main,
        hover: theme.colors.primary.light,
        glow: theme.colors.primary.main,
      };
  }
};

// Helper function to get size styles
const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return {
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        fontSize: theme.typography.fontSize.sm,
      };
    case 'large':
      return {
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        fontSize: theme.typography.fontSize.lg,
      };
    default:
      return {
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        fontSize: theme.typography.fontSize.md,
      };
  }
};

// Helper function to get glow intensity
const getGlowIntensity = (intensity: string) => {
  switch (intensity) {
    case 'low':
      return '10px';
    case 'high':
      return '20px';
    default:
      return '15px';
  }
};

// Styled Components
const ButtonContainer = styled(motion.button)<{
  $variant: string;
  $size: string;
  $disabled: boolean;
  $fullWidth: boolean;
  $glowIntensity: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ${theme.animation.easing.standard};
  background: ${props => (props.$disabled ? theme.colors.background.tertiary : getColors(props.$variant).bg)};
  color: ${props => (props.$disabled ? theme.colors.text.disabled : theme.colors.text.primary)};
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  ${props => getSizeStyles(props.$size)};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${theme.borderRadius.md};
    background: ${props => getColors(props.$variant).bg};
    z-index: -1;
    opacity: ${props => (props.$disabled ? 0.3 : 0.8)};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: ${theme.borderRadius.md};
    background: ${props => getColors(props.$variant).bg};
    z-index: -2;
    filter: blur(${props => props.$glowIntensity});
    opacity: ${props => (props.$disabled ? 0 : 0.4)};
    transition: opacity 0.3s ${theme.animation.easing.standard};
  }
  
  &:hover {
    background: ${props => (props.$disabled ? theme.colors.background.tertiary : getColors(props.$variant).hover)};
    transform: ${props => (props.$disabled ? 'none' : 'translateY(-2px)')};
    
    &::after {
      opacity: ${props => (props.$disabled ? 0 : 0.6)};
    }
  }
  
  &:active {
    transform: ${props => (props.$disabled ? 'none' : 'translateY(1px)')};
  }
`;

const IconWrapper = styled.span<{ $position: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.$position === 'right' ? theme.spacing.sm : 0)};
  margin-right: ${props => (props.$position === 'left' ? theme.spacing.sm : 0)};
`;

// Main Component
const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  className,
  icon,
  iconPosition = 'left',
  glowIntensity = 'medium',
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const buttonVariants = {
    idle: {
      scale: 1,
    },
    hover: {
      scale: 1.03,
    },
    tap: {
      scale: 0.97,
    },
  };
  
  // Glow animation variants
  const glowVariants = {
    idle: {
      opacity: 0.4,
    },
    hover: {
      opacity: 0.6,
    },
  };
  
  return (
    <ButtonContainer
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $fullWidth={fullWidth}
      $glowIntensity={getGlowIntensity(glowIntensity)}
      onClick={disabled ? undefined : onClick}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={animated ? buttonVariants : undefined}
      initial="idle"
      animate={isHovered && !disabled ? 'hover' : 'idle'}
      whileTap={!disabled && animated ? 'tap' : undefined}
    >
      {icon && iconPosition === 'left' && (
        <IconWrapper $position={iconPosition}>{icon}</IconWrapper>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <IconWrapper $position={iconPosition}>{icon}</IconWrapper>
      )}
    </ButtonContainer>
  );
};

export default GlowButton;
