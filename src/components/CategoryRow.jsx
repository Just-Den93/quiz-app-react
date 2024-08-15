import React from 'react';
import Item from './Item';
import styles from '../styles/CategoryRow.module.css';

function CategoryRow({ category, usedBlocks, onItemClick }) {
  const categoryUsed = usedBlocks[category.id] && usedBlocks[category.id].length === category.blocks.length;

  console.log('Rendering CategoryRow with category:', category);
  console.log('Used blocks for this category:', usedBlocks[category.id]);

  return (
    <div className={styles.categoryRow} style={{ backgroundColor: categoryUsed ? 'lightgray' : '' }}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={`${category.id}-${block.id}`}
            block={block}
            onClick={() => onItemClick(block, category.id)}
            used={usedBlocks[category.id]?.includes(block.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryRow;
