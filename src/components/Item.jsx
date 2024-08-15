import React from 'react';
import styles from '../styles/Item.module.css';

function Item({ block, onClick, used }) {
  console.log(`Rendering Item with block ID: ${block.id}, used: ${used}`);

  return (
    <button
      className={`${styles.item} ${used ? styles.used : ''}`}
      onClick={() => {
        console.log(`Item clicked with block ID: ${block.id}`);
        onClick(block);
      }}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;
