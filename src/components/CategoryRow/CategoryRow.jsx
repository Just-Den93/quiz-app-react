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
            key={`${category.id}-${block.id}`}  // Уникальный ключ для каждого блока
            block={block}
<<<<<<< HEAD:src/components/CategoryRow.jsx
            categoryId={category.id}  // Передача categoryId в Item
=======
            categoryId={category.id} // Передаем categoryId
>>>>>>> 9aec408a2d9a3289a31372e0cac247037ab3fb50:src/components/CategoryRow/CategoryRow.jsx
            onBlockSelect={onBlockSelect}
          />
        ))}
      </div>
    </div>
  );
}


export default CategoryRow;
