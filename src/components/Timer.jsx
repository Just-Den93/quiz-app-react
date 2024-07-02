import React, { useState, useEffect } from 'react';
import styles from '../styles/Timer.module.css';

function Timer({ duration, onEnd }) {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      onEnd();
    }
  }, [seconds, onEnd]);

  return (
    <div className={styles.timer}>
      <span className={styles.digit}>{String(Math.floor(seconds / 60)).padStart(2, '0')}</span>
      <span className={styles.colon}>:</span>
      <span className={styles.digit}>{String(seconds % 60).padStart(2, '0')}</span>
    </div>
  );
}

export default Timer;
