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
            key={`${category.name}-${block.id}`} // Ensure unique key
=======
            key={`${category.id}-${block.id}`} // Ensure unique key
>>>>>>> 57748d87285c891bcf419fef01e8bda92cb6c605
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
