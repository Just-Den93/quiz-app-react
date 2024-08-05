import React from 'react';
import QAMode from './QAMode';
import SelectionMode from './SelectionMode';
import Timer from './Timer';
import styles from '../styles/Modal.module.css';
import { useModalLogic } from '../utils/modalUtils';

function Modal({ block, onClose, markBlockAsUsed, mode }) {
  const {
    timerStarted,
    timerEnded,
    showAnswer,
    setTimerStarted,
    handleTimerEnd,
    handleShowAnswer,
    handleSelectCategory,
    handleForceStop,
  } = useModalLogic(block, markBlockAsUsed, onClose);

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <div className={styles.selectedInfo}>
          <span className={styles.infoCategoryName}>{block.categoryName}</span>
          <div className={styles.selectedNumber}>{block.id + 1}</div>
        </div>
        <div className={styles.content}>
          {mode === 1 ? (
            <QAMode question={block.question} answer={block.answer} subAnswer={block.subAnswer} showAnswer={showAnswer} />
          ) : (
            <SelectionMode question={block.question} options={block.options} />
          )}
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
