import { useState, useEffect } from 'react';

// Custom hook for the number climbing animation
export const useNumberClimb = (endValue, duration = 1500) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const range = endValue - startValue;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = currentTime - startTime;
      const increment = progress / duration;
      const new_val = startValue + range * Math.min(increment, 1);
      
      setCurrentValue(new_val);

      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [endValue, duration]);

  return currentValue;
};

// Custom hook for the randomized text reveal animation
export const useTextReveal = (text, duration = 2000) => {
  const [revealedText, setRevealedText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

  useEffect(() => {
    let animationFrameId;
    let startTime = null;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      
      let newText = '';
      for (let i = 0; i < text.length; i++) {
        const timeForChar = (duration / text.length) * (i + 1);
        if (elapsedTime >= timeForChar) {
          newText += text[i];
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setRevealedText(newText);

      if (newText !== text) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [text, duration]);

  return revealedText;
};
