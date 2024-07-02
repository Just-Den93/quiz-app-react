import React, { useEffect } from 'react';
import styles from '../styles/ConfettiAnimation.module.css';

function ConfettiAnimation() {
  useEffect(() => {
    startConfetti();
    return () => stopConfetti();
  }, []);

  return null;
}

function startConfetti() {
  // Your confetti logic here
}

function stopConfetti() {
  // Your confetti stop logic here
}

export default ConfettiAnimation;
