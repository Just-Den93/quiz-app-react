import React from 'react';
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
  timerStarted,
  timerEnded,
  showAnswer,
  setTimerStarted,
  handleTimerEnd,
  handleShowAnswer,
  handleSelectCategory,
  handleForceStop,
}) {
<<<<<<< HEAD:src/components/Modal.jsx
  // Проверяем, что block содержит нужные данные
  // console.log('Modal opened with block:', block);
  
  const ModeComponent = modeComponents[selectedMode];
=======
  console.log('Modal opened with block:', block); 
  const ModeComponent = modeComponents[selectedMode]; 
>>>>>>> 9aec408a2d9a3289a31372e0cac247037ab3fb50:src/components/Modal/Modal.jsx

  if (!block) {
    return null;
  }

  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        {ModeComponent ? (
          <ModeComponent
<<<<<<< HEAD:src/components/Modal.jsx
    block={block}
    showAnswer={showAnswer}
    setTimerStarted={setTimerStarted}
    timerStarted={timerStarted}
    timerEnded={timerEnded}
    handleTimerEnd={handleTimerEnd}
    handleShowAnswer={handleShowAnswer}
    handleSelectCategory={() => handleSelectCategory(block.categoryId, block.id)}  // Убедимся, что block.categoryId и block.id правильно передаются
    handleForceStop={handleForceStop}
/>
=======
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
>>>>>>> 9aec408a2d9a3289a31372e0cac247037ab3fb50:src/components/Modal/Modal.jsx
        ) : (
          <div>Unknown mode</div>
        )}
      </div>
    </div>
  );
}

export default Modal;
