import React from 'react';
import QAMode from './QAMode';
import SelectionMode from './SelectionMode';
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
        {mode === 1 ? (
          <QAMode 
            block={block} 
            showAnswer={showAnswer} 
            setTimerStarted={setTimerStarted} 
            timerStarted={timerStarted} 
            timerEnded={timerEnded} 
            handleTimerEnd={handleTimerEnd} 
            handleShowAnswer={handleShowAnswer} 
            handleSelectCategory={handleSelectCategory} 
            handleForceStop={handleForceStop} 
          />
        ) : mode === 2 ? (
          <SelectionMode 
            block={block} 
            showAnswer={showAnswer} 
            setTimerStarted={setTimerStarted} 
            timerStarted={timerStarted} 
            timerEnded={timerEnded} 
            handleTimerEnd={handleTimerEnd} 
            handleShowAnswer={handleShowAnswer} 
            handleSelectCategory={handleSelectCategory} 
            handleForceStop={handleForceStop} 
          />
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
