import React from 'react';
import QAMode from './QAMode';
import SelectionMode from './SelectionMode';
import styles from '../styles/Modal.module.css';

const modeComponents = {
  1: QAMode,
  2: SelectionMode,
};

function Modal({
  block,
  onClose,
  selectedMode,
  timerStarted,
  timerEnded,
  showAnswer,
  setTimerStarted,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
  console.log('Modal opened with block:', block); 
  const ModeComponent = modeComponents[selectedMode]; 

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        {ModeComponent ? (
          <ModeComponent
            block={block}
            showAnswer={showAnswer}
            setTimerStarted={setTimerStarted}
            timerStarted={timerStarted}
            timerEnded={timerEnded}
            handleTimerEnd={handleTimerEnd}
            handleShowAnswer={handleShowAnswer}
            handleSelectCategory={() => handleSelectCategory(block.categoryId, block.id)} // Используем categoryId
            handleForceStop={handleForceStop}
          />
        ) : (
          <div>Unknown mode</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
