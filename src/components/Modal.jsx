// src/components/Modal.jsx
import React, { useState } from 'react';
import Timer from './Timer';
import QAMode from './QAMode';
import SelectionMode from './SelectionMode';
import ShowAnswerButton from './ShowAnswerButton';
import SelectCategoryButton from './SelectCategoryButton';
import styles from '../styles/Modal.module.css';

function Modal({ block, onClose, markBlockAsUsed, selectedMode }) {
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
  };

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <div className={styles.selectedInfo}>
          <span className={styles.infoCategoryName}>{block.categoryId}</span>
          <div className={styles.selectedNumber}>{block.id + 1}</div>
        </div>
        {selectedMode === 'QAMode' ? (
          <QAMode
            question={block.question}
            answer={block.answer}
            subAnswer={block.subAnswer}
            showAnswer={showAnswer}
          />
        ) : (
          <SelectionMode />
        )}
        <div className={styles.controlBlock}>
          <div className={styles.timerContainer}>
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
                <ShowAnswerButton onClick={handleShowAnswer} />
              )
            )}
          </div>
          {showAnswer && (
            <SelectCategoryButton onClick={handleSelectCategory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
