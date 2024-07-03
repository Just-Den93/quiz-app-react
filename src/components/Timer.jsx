import React, { useState, useEffect } from 'react';
import styles from '../styles/Timer.module.css';

function Timer({ duration, onEnd }) {
  const [seconds, setSeconds] = useState(duration);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 3 && seconds > 0) {
      setBlink(true);
    } else {
      setBlink(false);
    }
    if (seconds <= 0) {
      onEnd();
    }
  }, [seconds, onEnd]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');

  return (
    <div className={`${styles.timer} ${blink ? styles.blink : ''}`}>
      <span className={styles.digit}>{minutes.charAt(0)}</span>
      <span className={styles.digit}>{minutes.charAt(1)}</span>
      <span className={styles.colon}>:</span>
      <span className={styles.digit}>{remainingSeconds.charAt(0)}</span>
      <span className={styles.digit}>{remainingSeconds.charAt(1)}</span>
    </div>
  );
}

export default Timer;
