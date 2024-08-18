import React from 'react';
import QAMode from '../QAMode/QAMode';
import SelectionMode from '../SelectionMode/SelectionMode';
import styles from './Modal.module.css';
import { useQuizContext } from '../../context/QuizContext';

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
  handleForceStop,
}) {
  const ModeComponent = modeComponents[selectedMode];
  const { markBlockAsUsed, currentQuizId } = useQuizContext();

  if (!block) {
    return null;
  }

  const handleSelectCategory = () => {
    markBlockAsUsed(currentQuizId, block.categoryId, block.id);
    onClose();
  };

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
            handleSelectCategory={handleSelectCategory}
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
