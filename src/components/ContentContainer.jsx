import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import styles from '../styles/ContentContainer.module.css';
import data from '../data/mode1';
import Modal from './Modal';

function ContentContainer({ usedBlocks, markBlockAsUsed }) {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleItemClick = (block, categoryId) => {
    setSelectedBlock({ ...block, categoryId });
  };

  const closeModal = () => {
    setSelectedBlock(null);
  };

  return (
    <div id="content-container" className={styles.contentContainer}>
      {data.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          usedBlocks={usedBlocks}
          onItemClick={(block) => handleItemClick(block, category.id)}
        />
      ))}
      {selectedBlock && (
        <Modal
          block={selectedBlock}
          onClose={closeModal}
          markBlockAsUsed={markBlockAsUsed}
        />
      )}
    </div>
  );
}

export default ContentContainer;
