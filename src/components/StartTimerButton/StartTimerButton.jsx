import React from 'react';
import styles from './StartTimerButton.module.css';

function StartTimerButton({ onClick }) {
  return (
    <button className={styles.startTimerButton} onClick={onClick}>
      <img src="./images/refresh-ccw-clock-svgrepo-com.svg" alt="Start Timer" className={styles.startButtonIcon} />
    </button>
  );
}

export default StartTimerButton;
