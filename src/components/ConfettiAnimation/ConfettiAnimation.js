import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const ConfettiAnimation = ({ isRunning }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    const defaults = {
      spread: 400,
      ticks: 100,
      gravity: 0.2,
      decay: 0.95,
      startVelocity: 15,
      shapes: ['star', 'circle'],
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    };

    const shoot = () => {
      const randomX = Math.random();
      const randomY = Math.random();

      // Основной запуск конфетти с увеличенным количеством частиц и размерами
      confetti({
        ...defaults,
        particleCount: 120, // Увеличено количество частиц
        scalar: 2.0, // Увеличен размер частиц
        origin: { x: randomX, y: randomY },
      });

      // Второй запуск конфетти для разнообразия с меньшим количеством частиц
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.5,
        origin: { x: randomX, y: randomY },
      });
    };

    if (isRunning) {
      intervalRef.current = setInterval(shoot, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return <div />;
};

export default ConfettiAnimation;
