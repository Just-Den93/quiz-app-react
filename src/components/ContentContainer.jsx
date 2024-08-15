import React from 'react';
import CategoryRow from './CategoryRow';
import styles from '../styles/ContentContainer.module.css';

function ContentContainer({ data, onBlockSelect }) {
  return (
    <div id="content-container" className={styles.contentContainer}>
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
