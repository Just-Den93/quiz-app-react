import React from 'react';
import CategoryRow from '../CategoryRow/CategoryRow';
import Header from '../Header/Header';
import styles from './ContentContainer.module.css';

function ContentContainer({ data, onBlockSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${styles.easy}`}>Легкий уровень</div>
      <div className={`${styles.header} ${styles.medium}`}>Средний уровень</div>
      <div className={`${styles.header} ${styles.hard}`}>Сложный уровень</div>
      {data.map((category, categoryIndex) => (
        <CategoryRow
          key={category.id}
          category={category}
          onBlockSelect={onBlockSelect}
          categoryIndex={categoryIndex + 1} 
        />
      ))}
    </div>
  );
}

export default ContentContainer;
