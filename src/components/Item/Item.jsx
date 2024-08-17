import React from 'react';
import styles from './Item.module.css';

function Item({ block, categoryId, onBlockSelect }) {
  const handleClick = () => {
<<<<<<< HEAD:src/components/Item.jsx
    // console.log(`Item clicked: Block ID ${block.id}, Category ID ${categoryId}`);
    onBlockSelect({ ...block, categoryId });
=======
    console.log(`Item clicked: Block ID ${block.id}, Category ID ${categoryId}`);
    onBlockSelect({ ...block, categoryId }); // Передаем categoryId при выборе блока
>>>>>>> 9aec408a2d9a3289a31372e0cac247037ab3fb50:src/components/Item/Item.jsx
  };

  return (
    <button
      className={styles.item}
      onClick={handleClick}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;
