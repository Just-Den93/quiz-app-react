import React from 'react';
import { LuTimer } from 'react-icons/lu'; // Импортируем иконку
import styles from './StartTimerButton.module.css';

function StartTimerButton({ onClick }) {
  return (
    <button className={styles.startTimerButton} onClick={onClick}>
      <LuTimer className={styles.startButtonIcon} /> {/* Используем иконку вместо изображения */}
    </button>
  );
}

export default StartTimerButton;
