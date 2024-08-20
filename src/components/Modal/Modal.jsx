import React, { useState, useEffect } from 'react';
import QAMode from '../QAMode/QAMode';
import SelectionMode from '../SelectionMode/SelectionMode';
import styles from './Modal.module.css';

const modeComponents = {
  1: QAMode,
  2: SelectionMode,
};

function Modal({
  block,
  onClose,
  selectedMode,
  onSelectCategory,
}) {
  const ModeComponent = modeComponents[selectedMode];

  // Modal-specific states
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Reset states when block changes
    setTimerStarted(false);
    setShowAnswer(false);
    setTimerEnded(false);
  }, [block]);

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
            handleTimerEnd={() => setTimerEnded(true)}
            handleShowAnswer={() => setShowAnswer(true)}
            handleSelectCategory={() => onSelectCategory(block.categoryId, block.id)}
            handleForceStop={() => setTimerEnded(true)}
          />
        ) : (
          <div>Unknown mode</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
