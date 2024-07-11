// src/components/CategoryRow.jsx
import React from 'react';
import Item from './Item';
import styles from '../styles/CategoryRow.module.css';

function CategoryRow({ category, usedBlocks, onItemClick }) {
  const categoryUsed = usedBlocks[category.name] && usedBlocks[category.name].length === category.blocks.length;

  return (
    <div className={styles.categoryRow} style={{ backgroundColor: categoryUsed ? 'lightgray' : '' }}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={block.id}
            block={block}
            onClick={onItemClick}
            used={usedBlocks[category.name] && usedBlocks[category.name].includes(block.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryRow;
