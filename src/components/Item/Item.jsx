import React from 'react';
import styles from './Item.module.css';
import { useQuizContext } from '../../context/QuizContext';

function Item({ block, categoryId, onBlockSelect }) {
  const { quizStates, currentQuizId } = useQuizContext();
  const isUsed = quizStates[currentQuizId]?.usedBlocks?.[categoryId]?.includes(block.id);

  const handleClick = () => {
    onBlockSelect({ ...block, categoryId });
  };

  return (
    <button
<<<<<<< HEAD
      className={`${styles.box} ${isUsed ? styles.used : ''}`}
=======
      className={`${styles.item} ${isUsed ? styles.used : ''}`}
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
      onClick={handleClick}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;
