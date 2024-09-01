import React from 'react';
import CategoryRow from '../CategoryRow/CategoryRow';
import styles from './ContentContainer.module.css';

function ContentContainer({ data, onBlockSelect }) {
  return (
    <div className={styles.contentContainer}>
      {data.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          onBlockSelect={onBlockSelect}
        />
      ))}
    </div>
  );
}

export default ContentContainer;
