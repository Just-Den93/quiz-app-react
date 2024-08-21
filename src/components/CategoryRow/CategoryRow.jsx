import React from 'react';
import Item from '../Item/Item';
import styles from './CategoryRow.module.css';

function CategoryRow({ category, onBlockSelect }) {
  return (
    <>
      <div className={styles.category}>{category.name}</div>
      {category.blocks.map((block) => (
        <Item
          key={`${category.id}-${block.id}`}
          block={block}
          categoryId={category.id}
          onBlockSelect={onBlockSelect}
        />
      ))}
    </>
  );
}

export default CategoryRow;
