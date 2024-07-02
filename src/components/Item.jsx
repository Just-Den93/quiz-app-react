import React from 'react';
import styles from '../styles/Item.module.css';

function Item({ block, onClick }) {
  return (
    <button className={styles.item} data-item={block.id} onClick={() => onClick(block)}>
      {block.id + 1}
    </button>
  );
}

export default Item;
