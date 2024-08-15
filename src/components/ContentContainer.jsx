import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import Modal from './Modal';
import { useQuizContext } from '../context/QuizContext';
import styles from '../styles/ContentContainer.module.css';

function ContentContainer({ data }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const { currentQuizId, markBlockAsUsed, quizStates } = useQuizContext();
  const usedBlocks = quizStates[currentQuizId]?.usedBlocks || {};

  const handleItemClick = (block, categoryId) => {
    console.log(`handleItemClick called for block ID: ${block.id}, category ID: ${categoryId}`);
    setSelectedBlock(block);
    markBlockAsUsed(currentQuizId, categoryId, block.id);
  };

  return (
    <div id="content-container" className={styles.contentContainer}>
      {data.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          usedBlocks={usedBlocks}
          onItemClick={handleItemClick}
        />
      ))}
      {selectedBlock && (
        <Modal
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      )}
    </div>
  );
}

export default ContentContainer;
