import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import styles from '../styles/ContentContainer.module.css';
import data from '../data/mode1';
import Modal from './Modal';
import { handleItemClick, closeModal } from '../utils/contentContainerUtils';

function ContentContainer({ usedBlocks, markBlockAsUsed }) {
  const [selectedBlock, setSelectedBlock] = useState(null);

  return (
    <div id="content-container" className={styles.contentContainer}>
      {data.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          usedBlocks={usedBlocks}
          onItemClick={(block) => handleItemClick(block, category.id, setSelectedBlock)}
        />
      ))}
      {selectedBlock && (
        <Modal
          block={selectedBlock}
          onClose={() => closeModal(setSelectedBlock)}
          markBlockAsUsed={markBlockAsUsed}
        />
      )}
    </div>
  );
}

export default ContentContainer;
