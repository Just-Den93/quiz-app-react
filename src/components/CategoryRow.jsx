import React from 'react';
import Item from './Item';
import styles from '../styles/CategoryRow.module.css';

function CategoryRow({ category, onBlockSelect }) {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={`${category.id}-${block.id}`}  // Уникальный ключ для каждого блока
            block={block}
            categoryId={category.id}  // Передача categoryId в Item
            onBlockSelect={onBlockSelect}
          />
        ))}
      </div>
    </div>
  );
}


export default CategoryRow;
