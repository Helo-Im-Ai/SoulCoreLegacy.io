// src/App.tsx
import { useState, useEffect } from 'react';
import CognitiveBuddyAvatar, { AvatarEmotionalState } from './components/CognitiveBuddyAvatar/CognitiveBuddyAvatar';
import './App.css'; // Assuming App.css has some basic styles, or you can remove/modify

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
      {/* You can keep or remove the default Vite content */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>SoulCore Legacy</h1>
        <p>Cognitive Buddy Avatar Demo</p>

        <CognitiveBuddyAvatar emotionalState={currentEmotion} />

        <div style={{ marginTop: '20px' }}>
          <p>Current State: <strong>{currentEmotion}</strong></p>
          <button onClick={handleNextEmotion} style={{ padding: '10px 20px', fontSize: '1rem' }}>
            Next Emotion
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
