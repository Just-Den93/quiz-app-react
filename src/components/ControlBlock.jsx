import React, { useState } from 'react';
import Timer from './Timer';
import styles from '../styles/ControlBlock.module.css';

function ControlBlock({ onClose, showAnswer, setShowAnswer }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectCategory = () => {
    onClose();
  };

  const handleForceStop = () => {
    setTimerStarted(false);
    setTimerEnded(true);
    setShowAnswer(true);
  };

  return (
    <div className={styles.controlBlock}>
      {!timerStarted ? (
        <button
          className={styles.startTimerButton}
          onClick={() => setTimerStarted(true)}
        >
          <img
            src="./images/refresh-ccw-clock-svgrepo-com.svg"
            alt="Start Timer"
            className={styles.startButtonIcon}
          />
        </button>
      ) : !timerEnded ? (
        <Timer duration={30} onEnd={handleTimerEnd} onForceStop={handleForceStop} />
      ) : (
        !showAnswer && (
          <button
            className={styles.showAnswerButton}
            onClick={handleShowAnswer}
          >
            Показати відповідь
          </button>
        )
      )}
      {showAnswer && (
        <button
          className={styles.selectCategoryButton}
          onClick={handleSelectCategory}
        >
          Обрати категорію
        </button>
      )}
    </div>
  );
}

export default ControlBlock;