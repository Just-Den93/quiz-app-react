// src/components/ContentContainer.jsx
import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import styles from '../styles/ContentContainer.module.css';
import data from '../data';
import Modal from './Modal';

function ContentContainer({ usedBlocks, markBlockAsUsed, selectedMode }) {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleItemClick = (block, categoryName) => {
    console.log('Clicked block:', block);
    console.log('Category:', categoryName);
    setSelectedBlock({ ...block, categoryName });
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
          onItemClick={(block) => handleItemClick(block, category.name)}
        />
      ))}
      {selectedBlock && (
        <Modal
          block={selectedBlock}
          onClose={closeModal}
          markBlockAsUsed={markBlockAsUsed}
          selectedMode={selectedMode}
        />
      )}
    </div>
  );
}

export default ContentContainer;
