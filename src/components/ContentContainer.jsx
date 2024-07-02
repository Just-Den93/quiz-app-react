import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import styles from '../styles/ContentContainer.module.css';
import data from '../data';
import Modal from './Modal';

function ContentContainer() {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleItemClick = (block, categoryName) => {
    setSelectedBlock({ ...block, categoryName });
  };

  const closeModal = () => {
    setSelectedBlock(null);
  };

  return (
    <div id="content-container" className={styles.contentContainer}>
      {data.map(category => (
        <CategoryRow key={category.id} category={category} onItemClick={(block) => handleItemClick(block, category.name)} />
      ))}
      {selectedBlock && (
        <Modal block={selectedBlock} onClose={closeModal} />
      )}
    </div>
  );
}

export default ContentContainer;
