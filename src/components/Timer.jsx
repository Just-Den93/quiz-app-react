import React, { useState, useEffect } from 'react';
import styles from '../styles/Timer.module.css';

function Timer({ duration, onEnd, onForceStop }) {
  const [seconds, setSeconds] = useState(duration);
  const [hovered, setHovered] = useState(false);

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

  const handleForceStop = () => {
    onForceStop();
  };

  return (
    <div
      className={styles.timerContainer}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.timer}>
        <span className={styles.digit}>{String(Math.floor(seconds / 60)).padStart(2, '0').charAt(0)}</span>
        <span className={styles.digit}>{String(Math.floor(seconds / 60)).padStart(2, '0').charAt(1)}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.digit}>{String(seconds % 60).padStart(2, '0').charAt(0)}</span>
        <span className={styles.digit}>{String(seconds % 60).padStart(2, '0').charAt(1)}</span>
      </div>
      {hovered && (
        <button className={styles.forceStopButton} onClick={handleForceStop}>
          Спинити
        </button>
      )}
    </div>
  );
}

export default Timer;
