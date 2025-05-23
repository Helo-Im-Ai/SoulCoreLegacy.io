// src/App.tsx
import { useState, useEffect } from 'react';
import CognitiveBuddyAvatar from './components/CognitiveBuddyAvatar/CognitiveBuddyAvatar';
import type { AvatarEmotionalState } from './components/CognitiveBuddyAvatar/CognitiveBuddyAvatar';
import ParallaxBackground from './components/effects/ParallaxBackground';
import './App.css';

function App() {
  const [currentEmotion, setCurrentEmotion] = useState<AvatarEmotionalState>('idle');
  const [emotionIndex, setEmotionIndex] = useState(0);

  // Define a few emotions to cycle through for testing
  const testEmotions: AvatarEmotionalState[] = [
    'idle',
    'happy',
    'curious',
    'competitive',
    'focusedProblemSolving',
    'elated'
  ];

  useEffect(() => {
    // Cycle through emotions every 3 seconds for demonstration
    const timer = setInterval(() => {
      setEmotionIndex(prevIndex => (prevIndex + 1) % testEmotions.length);
    }, 3000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [testEmotions.length]);

  useEffect(() => {
    setCurrentEmotion(testEmotions[emotionIndex]);
  }, [emotionIndex, testEmotions]);

  // A simple button to manually change state for quicker testing
  const handleNextEmotion = () => {
    setEmotionIndex(prevIndex => (prevIndex + 1) % testEmotions.length);
  };

  return (
    <>
      {/* Enhanced Background Effect */}
      <ParallaxBackground intensity={1} />
      
      {/* Main Content */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          background: 'linear-gradient(90deg, #6E44FF, #4A90E2, #50E3C2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          SoulCore Legacy
        </h1>
        
        <p style={{
          color: '#FFFFFF',
          fontSize: '1.2rem',
          textShadow: '0 0 10px rgba(110, 68, 255, 0.5)'
        }}>
          Cognitive Buddy Avatar Demo
        </p>

        <div style={{
          background: 'rgba(26, 28, 36, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(110, 68, 255, 0.2)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <CognitiveBuddyAvatar emotionalState={currentEmotion} />

          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#B8B8B8' }}>
              Current State: <strong style={{ color: '#FFFFFF' }}>{currentEmotion}</strong>
            </p>
            <button 
              onClick={handleNextEmotion} 
              style={{ 
                padding: '10px 20px', 
                fontSize: '1rem',
                background: 'linear-gradient(90deg, #6E44FF, #4A90E2)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(110, 68, 255, 0.5)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(110, 68, 255, 0.7)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(110, 68, 255, 0.5)';
              }}
            >
              Next Emotion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
