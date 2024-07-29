import React, { useState } from 'react';
import QAMode from './QAMode';
import Timer from './Timer';
import styles from '../styles/Modal.module.css';

function Modal({ block, onClose, markBlockAsUsed }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!block) {
    return null;
  }

  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleSelectCategory = () => {
    markBlockAsUsed(block.categoryId, block.id);
    onClose();
  };

  const handleForceStop = () => {
    setTimerEnded(true);
    setShowAnswer(true);
  };

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <div className={styles.selectedInfo}>
          <span className={styles.infoCategoryName}>{block.categoryName}</span>
          <div className={styles.selectedNumber}>{block.id + 1}</div>
        </div>
        <div className={styles.content}>
          <QAMode question={block.question} answer={block.answer} subAnswer={block.subAnswer} showAnswer={showAnswer} />
        </div>
        <div className={styles.controlBlock}>
          {!timerStarted ? (
            <button className={styles.startTimerButton} onClick={() => setTimerStarted(true)}>
              <img src="./images/refresh-ccw-clock-svgrepo-com.svg" alt="Start Timer" className={styles.startButtonIcon} />
            </button>
          ) : !timerEnded ? (
            <Timer duration={30} onEnd={handleTimerEnd} onForceStop={handleForceStop} />
          ) : (
            !showAnswer && (
              <button className={styles.showAnswerButton} onClick={handleShowAnswer}>
                Показати відповідь
              </button>
            )
          )}
          {showAnswer && (
            <button className={styles.selectCategoryButton} onClick={handleSelectCategory}>
              Обрати категорію
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
