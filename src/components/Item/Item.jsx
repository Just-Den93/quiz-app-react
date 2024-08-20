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
      className={`${styles.item} ${isUsed ? styles.used : ''}`}
      onClick={handleClick}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;