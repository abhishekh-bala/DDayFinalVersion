import { useState, useEffect, useRef } from 'react';

interface UseCountdownProps {
  isActive: boolean;
  startFrom: number;
  onComplete: () => void;
}

export const useCountdown = ({ isActive, startFrom, onComplete }: UseCountdownProps) => {
  const [count, setCount] = useState(startFrom);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive) {
      setCount(startFrom);
      
      timerRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            onComplete();
            return startFrom;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, onComplete, startFrom]);

  return count;
};