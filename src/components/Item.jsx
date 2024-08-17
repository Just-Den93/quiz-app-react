import React from 'react';
import styles from '../styles/Item.module.css';

function Item({ block, categoryId, onBlockSelect }) {
  const handleClick = () => {
    // console.log(`Item clicked: Block ID ${block.id}, Category ID ${categoryId}`);
    onBlockSelect({ ...block, categoryId });
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
