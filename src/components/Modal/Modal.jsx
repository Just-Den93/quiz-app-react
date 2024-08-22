<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import QAMode from '../QAMode/QAMode';
import SelectionMode from '../SelectionMode/SelectionMode';
import styles from './Modal.module.css';
=======
import React from 'react';
import QAMode from '../QAMode/QAMode';
import SelectionMode from '../SelectionMode/SelectionMode';
import styles from './Modal.module.css';
import { useQuizContext } from '../../context/QuizContext';
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe

const modeComponents = {
  1: QAMode,
  2: SelectionMode,
};

function Modal({
  block,
<<<<<<< HEAD
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
}) {
  const ModeComponent = modeComponents[selectedMode];

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setTimerStarted(false);
    setShowAnswer(false);
    setTimerEnded(false);
  }, [block]);
=======
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
  const { currentQuizId, markBlockAsUsed } = useQuizContext();
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe

  if (!block) {
    return null;
  }

<<<<<<< HEAD
=======
  const handleSelectCategory = () => {
    markBlockAsUsed(currentQuizId, block.categoryId, block.id);
    onClose();
  };

>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        {ModeComponent ? (
          <ModeComponent
            block={block}
<<<<<<< HEAD
            categoryName={categoryName}
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
            showAnswer={showAnswer}
            setTimerStarted={setTimerStarted}
            timerStarted={timerStarted}
            timerEnded={timerEnded}
<<<<<<< HEAD
            handleTimerEnd={() => setTimerEnded(true)}
            handleShowAnswer={() => setShowAnswer(true)}
            handleSelectCategory={() => onSelectCategory(block.categoryId, block.id)}
            handleForceStop={() => setTimerEnded(true)}
=======
            handleTimerEnd={handleTimerEnd}
            handleShowAnswer={handleShowAnswer}
            handleSelectCategory={handleSelectCategory}
            handleForceStop={handleForceStop}
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
          />
        ) : (
          <div>Unknown mode</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
