import React from 'react';
import Item from './Item';
import styles from '../styles/CategoryRow.module.css';

function CategoryRow({ category, onItemClick }) {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map(block => (
          <Item key={block.id} block={block} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}

export default CategoryRow;
