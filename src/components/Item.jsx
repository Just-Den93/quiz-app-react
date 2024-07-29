import React from 'react';
import styles from '../styles/Item.module.css';

function Item({ block, onClick, used }) {
  return (
    <button
      className={`${styles.item} ${used ? styles.used : ''}`}
      onClick={() => onClick(block)}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;
