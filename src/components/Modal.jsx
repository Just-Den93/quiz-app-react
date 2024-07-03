import React, { useState } from 'react';
import styles from '../styles/Modal.module.css';
import ControlBlock from './ControlBlock';

function Modal({ block, onClose }) {
  const [showAnswer, setShowAnswer] = useState(false);

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
          <h2>{!showAnswer ? block.question : block.answer}</h2>
          {showAnswer && (
            <>
              <p className={styles.answer}>{block.answer}</p>
              <p className={styles.subAnswer}>{block.subAnswer}</p>
            </>
          )}
        </div>
        <ControlBlock
          onClose={onClose}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
        />
      </div>
    </div>
  );
}

export default Modal;
