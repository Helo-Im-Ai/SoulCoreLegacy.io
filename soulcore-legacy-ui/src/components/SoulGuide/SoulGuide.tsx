// src/components/SoulGuide/SoulGuide.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../../styles/theme';
import SoulGuideAvatar from './SoulGuideAvatar';
import { AvatarEmotionalState } from '../CognitiveBuddyAvatar/CognitiveBuddyAvatar';

// Types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'guide';
  timestamp: Date;
  emotion?: AvatarEmotionalState;
}

interface SoulGuideProps {
  initialMessage?: string;
  className?: string;
}

// Styled Components
const SoulGuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: 500px;
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.gradients.night};
    opacity: 0.7;
    z-index: 0;
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.display};
  font-size: ${theme.typography.fontSize.lg};
  margin-left: ${theme.spacing.md};
`;

const StatusIndicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? theme.colors.status.success : theme.colors.status.error};
  margin-left: ${theme.spacing.md};
  box-shadow: 0 0 10px ${props => props.active ? theme.colors.status.success : theme.colors.status.error};
  animation: pulse 2s infinite ease-in-out;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  z-index: 1;
  
  /* Subtle scrolling animation for cosmic effect */
  background-attachment: fixed;
  background-image: 
    radial-gradient(circle at 20% 35%, rgba(58, 134, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 44%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
`;

const MessageBubble = styled(motion.div)<{ sender: 'user' | 'guide' }>`
  max-width: 80%;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  line-height: 1.5;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.sender === 'user' 
    ? theme.colors.primary.main 
    : 'rgba(51, 65, 85, 0.7)'};
  color: ${props => props.sender === 'user' 
    ? theme.colors.primary.contrast 
    : theme.colors.text.primary};
  box-shadow: ${theme.shadows.md};
  backdrop-filter: blur(5px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.sender === 'user' ? 'right: -8px;' : 'left: -8px;'}
    width: 16px;
    height: 16px;
    background: inherit;
    border-radius: 3px;
    transform: rotate(45deg) translateY(50%);
    z-index: -1;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: ${theme.spacing.md};
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1;
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  background: rgba(51, 65, 85, 0.5);
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.md};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme.colors.primary.main};
  }
  
  &::placeholder {
    color: ${theme.colors.text.hint};
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: ${theme.spacing.md};
  border-radius: 50%;
  background: ${theme.colors.primary.main};
  color: ${theme.colors.primary.contrast};
  transition: all ${theme.animation.duration.fast} ${theme.animation.easing.standard};
  
  &:hover {
    background: ${theme.colors.primary.light};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    background: ${theme.colors.background.tertiary};
    color: ${theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  bottom: 80px;
  left: 20px;
  z-index: 2;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Main Component
const SoulGuide: React.FC<SoulGuideProps> = ({ initialMessage = "Hello! I'm your Soul Guide. How can I assist you today?", className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<AvatarEmotionalState>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          text: initialMessage,
          sender: 'guide',
          timestamp: new Date(),
          emotion: 'happy'
        }
      ]);
      setCurrentEmotion('happy');
    }
  }, [initialMessage, messages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setCurrentEmotion('listening');
    
    // Simulate Soul Guide thinking and responding
    setIsTyping(true);
    
    setTimeout(() => {
      setCurrentEmotion('thinking');
      
      setTimeout(() => {
        // Generate a response based on user input
        let responseText = '';
        let emotion: AvatarEmotionalState = 'idle';
        
        // Very simple response logic - in a real app, this would be an API call
        const userText = input.toLowerCase();
        
        if (userText.includes('hello') || userText.includes('hi')) {
          responseText = "Hello there! It's wonderful to connect with you. How are you feeling today?";
          emotion = 'happy';
        } else if (userText.includes('help') || userText.includes('guide')) {
          responseText = "I'm here to guide you through your journey. What specific area would you like assistance with?";
          emotion = 'empathetic';
        } else if (userText.includes('sad') || userText.includes('depress') || userText.includes('unhappy')) {
          responseText = "I'm sorry to hear you're feeling down. Remember that emotions are temporary visitors. Would you like to explore some techniques to lift your spirits?";
          emotion = 'empathetic';
        } else if (userText.includes('game') || userText.includes('play')) {
          responseText = "Games are a wonderful way to engage the mind! Would you like to try a cognitive exercise together?";
          emotion = 'playful';
        } else if (userText.includes('challenge') || userText.includes('difficult')) {
          responseText = "Challenges help us grow. Let's break this down into manageable steps and tackle it together.";
          emotion = 'focusedProblemSolving';
        } else {
          responseText = "That's an interesting perspective. Would you like to explore this topic further together?";
          emotion = 'curious';
        }
        
        const guideMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'guide',
          timestamp: new Date(),
          emotion
        };
        
        setMessages(prev => [...prev, guideMessage]);
        setCurrentEmotion(emotion);
        setIsTyping(false);
      }, 1500);
    }, 1000);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <SoulGuideContainer className={className}>
      <Header>
        <StatusIndicator active={!isTyping} />
        <Title>Soul Guide</Title>
      </Header>
      
      <MessagesContainer>
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              sender={message.sender}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </MessageBubble>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <MessageBubble
            sender="guide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                transition: { repeat: Infinity, duration: 1.5 }
              }}
            >
              Thinking...
            </motion.div>
          </MessageBubble>
        )}
        
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <AvatarContainer>
        <SoulGuideAvatar emotionalState={currentEmotion} />
      </AvatarContainer>
      
      <InputContainer>
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <SendButton onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
          →
        </SendButton>
      </InputContainer>
    </SoulGuideContainer>
  );
};

export default SoulGuide;
