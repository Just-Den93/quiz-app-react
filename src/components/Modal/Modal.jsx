import React, { useState, useEffect } from 'react';
import QAMode from '../QAMode/QAMode';
import SelectionMode from '../SelectionMode/SelectionMode';
import WarningMessage from '../WarningMessage/WarningMessage'; // Импортируем WarningMessage
import styles from './Modal.module.css';

const modeComponents = {
  1: QAMode,
  2: SelectionMode,
};

function Modal({
  block,
  categoryName,
  onClose,
  selectedMode,
  onSelectCategory,
  isBlockUsed, // Получаем флаг использования блока
  onTryAgain,
  onContinue,
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

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>

        {/* Показываем WarningMessage, если блок был использован */}
        {isBlockUsed ? (
          <WarningMessage onTryAgain={onTryAgain} onContinue={onContinue} />
        ) : (
          ModeComponent && (
            <ModeComponent
              block={block}
              categoryName={categoryName}
              showAnswer={showAnswer}
              setTimerStarted={setTimerStarted}
              timerStarted={timerStarted}
              timerEnded={timerEnded}
              handleTimerEnd={() => setTimerEnded(true)}
              handleShowAnswer={() => setShowAnswer(true)}
              handleSelectCategory={() => onSelectCategory(block.categoryId, block.id)}
              handleForceStop={() => setTimerEnded(true)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Modal;
