import React from 'react';
import styles from './Item.module.css';

function Item({ block, categoryId, onBlockSelect }) {
  const handleClick = () => {
    console.log(`Item clicked: Block ID ${block.id}, Category ID ${categoryId}`);
    onBlockSelect({ ...block, categoryId }); // Передаем categoryId при выборе блока
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
