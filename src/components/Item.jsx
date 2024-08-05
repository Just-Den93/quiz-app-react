import React from 'react';
import styles from '../styles/Item.module.css';
import { handleClick } from '../utils/itemUtils';

function Item({ block, onClick, used }) {
  return (
    <button
      className={`${styles.item} ${used ? styles.used : ''}`}
      onClick={() => handleClick(block, onClick)}
    >
      {block.id + 1}
    </button>
  );
}

export default Item;
