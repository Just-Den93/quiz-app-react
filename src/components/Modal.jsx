import React from 'react';
import QAMode from './QAMode';
import SelectionMode from './SelectionMode';
import styles from '../styles/Modal.module.css';
import { useModalLogic } from '../utils/modalUtils';
import { useQuizContext } from '../context/QuizContext';

// Маппинг mode на соответствующие компоненты
const modeComponents = {
  1: QAMode,
  2: SelectionMode,
  // Другие режимы можно добавить здесь
};

function Modal({ block, onClose, markBlockAsUsed }) {
  const { selectedMode } = useQuizContext(); // Получаем режим напрямую из контекста

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

  // Получаем компонент, соответствующий текущему selectedMode
  const ModeComponent = modeComponents[selectedMode];

  // Если данных нет, просто не рендерим ничего
  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        {ModeComponent && (
          <ModeComponent
            block={block}
            showAnswer={showAnswer}
            setTimerStarted={setTimerStarted}
            timerStarted={timerStarted}
            timerEnded={timerEnded}
            handleTimerEnd={handleTimerEnd}
            handleShowAnswer={handleShowAnswer}
            handleSelectCategory={handleSelectCategory}
            handleForceStop={() => {
              handleTimerEnd(); // Завершаем таймер
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Modal;
