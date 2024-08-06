import React, { useState } from 'react';
import CategoryRow from './CategoryRow';
import Modal from './Modal';
import { handleItemClick, closeModal } from '../utils/contentContainerUtils';
import styles from '../styles/ContentContainer.module.css';

function ContentContainer({ usedBlocks, markBlockAsUsed, data, mode }) {
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Проверка на наличие данных
  if (!data) {
    console.log('Данные не загружены');
    return <div>Loading...</div>;
  }

  console.log('Данные для отображения:', data);

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
          mode={mode} // Передача режима в Modal
        />
      )}
    </div>
  );
}

export default ContentContainer;
