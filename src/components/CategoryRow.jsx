// src/components/CategoryRow.jsx
import React from 'react';
import Item from './Item';
import styles from '../styles/CategoryRow.module.css';

function CategoryRow({ category, usedBlocks, onItemClick }) {
  const categoryUsed = usedBlocks[category.id] && usedBlocks[category.id].length === category.blocks.length;

  return (
    <div className={styles.categoryRow} style={{ backgroundColor: categoryUsed ? 'lightgray' : '' }}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
<<<<<<< HEAD
            key={`${category.id}-${block.id}`} // Ensure unique key
=======
            key={`${category.id}-${block.id}`}  // Keep this key prop
>>>>>>> 65fc46519fb339387afc23b276b36f2af036c8e6
            block={block}
            onClick={() => onItemClick(block, category.id)}
            used={usedBlocks[category.id] && usedBlocks[category.id].includes(block.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryRow;
