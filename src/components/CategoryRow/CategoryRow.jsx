import React from 'react';
import Item from '../Item/Item';
import styles from './CategoryRow.module.css';

function CategoryRow({ category, onBlockSelect }) {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={`${category.id}-${block.id}`}
            block={block}
            categoryId={category.id}
            onBlockSelect={(blockData) => onBlockSelect(blockData, category)} // Используем функцию для передачи обоих параметров
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryRow;
