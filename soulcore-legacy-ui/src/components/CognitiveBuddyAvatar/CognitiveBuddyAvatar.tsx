// src/components/CognitiveBuddyAvatar/CognitiveBuddyAvatar.tsx
import React, { useEffect, useState, useRef } from 'react';
import Lottie from 'react-lottie-player';
import { gsap } from 'gsap';
// Import the placeholder Lottie animation JSON file
import avatarAnimationData from '../../assets/animations/cognitiveBuddyAvatarComplex.json';
import './CognitiveBuddyAvatar.css';

// Expanded list of emotional states for the avatar
export type AvatarEmotionalState =
  | 'idle'              // Neutral, calm
  | 'listening'         // Actively paying attention
  | 'thinking'          // Processing information
  | 'speaking'          // Communicating
  | 'happy'             // General positive emotion
  | 'elated'            // Very happy, celebrating a win
  | 'sad'               // Reflecting a minor setback
  | 'disappointed'      // After a significant loss, but brief
  | 'acknowledgingProblem' // Calmly recognizing an issue (the 10% phase)
  | 'focusedProblemSolving' // Deep concentration on finding a solution (the 90% phase)
  | 'competitive'       // Eager and ready for a challenge
  | 'determined'        // Focused resolve, especially after a loss (positive framing for 'revengeful')
  | 'empathetic'        // Showing understanding towards the player
  | 'curious'           // Exploring, learning
  | 'playful'           // Lighthearted, inviting interaction
  | 'proud';            // Sense of accomplishment

// Props for the component
interface CognitiveBuddyAvatarProps {
  emotionalState?: AvatarEmotionalState;
}

const CognitiveBuddyAvatar: React.FC<CognitiveBuddyAvatarProps> = ({
  emotionalState = 'idle',
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  // currentAnimationSegment will store the name of the Lottie segment to play
  // For now, with a simple placeholder, we won't be switching segments,
  // but this logic is ready for your actual complex Lottie file.
  const [currentAnimationSegment, setCurrentAnimationSegment] = useState<string>('idle_loop');

  useEffect(() => {
    let segmentName = 'idle_loop'; // Default animation segment

    switch (emotionalState) {
      case 'idle': segmentName = 'idle_loop'; break;
      case 'listening': segmentName = 'listening_attentive_loop'; break;
      case 'thinking': segmentName = 'thinking_deep_loop'; break;
      // ... (add all other cases from your previous list here)
      case 'speaking': segmentName = 'speaking_calm_loop'; break;
      case 'happy': segmentName = 'happy_gentle_smile_loop'; break;
      case 'elated': segmentName = 'elated_celebrate_animation'; break;
      case 'sad': segmentName = 'sad_subtle_loop'; break;
      case 'disappointed': segmentName = 'disappointed_brief_animation'; break;
      case 'acknowledgingProblem': segmentName = 'acknowledging_problem_calm_loop'; break;
      case 'focusedProblemSolving': segmentName = 'focused_problem_solving_intense_loop'; break;
      case 'competitive': segmentName = 'competitive_eager_loop'; break;
      case 'determined': segmentName = 'determined_focused_loop'; break;
      case 'empathetic': segmentName = 'empathetic_nod_loop'; break;
      case 'curious': segmentName = 'curious_look_around_loop'; break;
      case 'playful': segmentName = 'playful_bounce_loop'; break;
      case 'proud': segmentName = 'proud_stance_animation'; break;
      default: segmentName = 'idle_loop';
    }
    setCurrentAnimationSegment(segmentName); // This state is ready for when Lottie segments are used

    if (avatarRef.current) {
      let glowColor = 'transparent';
      if (['competitive', 'determined', 'focusedProblemSolving'].includes(emotionalState)) {
        glowColor = 'rgba(0, 191, 255, 0.5)'; // Aurora Blue glow
      } else if (['happy', 'elated', 'playful'].includes(emotionalState)) {
        glowColor = 'rgba(220, 220, 100, 0.4)'; // Soft Gold glow
      }
      gsap.to(avatarRef.current, {
        boxShadow: `0 0 15px 5px ${glowColor}`,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  }, [emotionalState]);

  return (
    <div className="cognitive-buddy-avatar" ref={avatarRef}>
      <Lottie
        loop
        animationData={avatarAnimationData} // Using the imported placeholder
        play
        className="avatar-lottie-animation"
        // Note: Playing specific segments like currentAnimationSegment
        // often requires a more complex Lottie player setup or specific Lottie file structure.
        // For now, the entire placeholder animation will play.
        // Once you have your actual Lottie file with named segments,
        // you might need to use a Lottie instance to call methods like .playSegments().
      />
    </div>
  );
};

export default CognitiveBuddyAvatar;
