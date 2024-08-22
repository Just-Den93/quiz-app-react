import React from 'react';
import Item from '../Item/Item';
import styles from './CategoryRow.module.css';

function CategoryRow({ category, onBlockSelect }) {
  return (
<<<<<<< HEAD
    <>
      <div className={styles.category}>{category.name}</div>
      {category.blocks.map((block) => (
        <Item
          key={`${category.id}-${block.id}`}
          block={block}
          categoryId={category.id}
          onBlockSelect={() => onBlockSelect(block, category)}
        />
      ))}
    </>
=======
    <div className={styles.categoryRow}>
      <div className={styles.categoryName}>{category.name}</div>
      <div className={styles.items}>
        {category.blocks.map((block) => (
          <Item
            key={`${category.id}-${block.id}`}
            block={block}
            categoryId={category.id}
            onBlockSelect={onBlockSelect}
          />
        ))}
      </div>
    </div>
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
  );
}

export default CategoryRow;
