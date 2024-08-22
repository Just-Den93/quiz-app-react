import React from 'react';
import CategoryRow from '../CategoryRow/CategoryRow';
<<<<<<< HEAD
import Header from '../Header/Header';
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
import styles from './ContentContainer.module.css';

function ContentContainer({ data, onBlockSelect }) {
  return (
<<<<<<< HEAD
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${styles.easy}`}>Легкий уровень</div>
      <div className={`${styles.header} ${styles.medium}`}>Средний уровень</div>
      <div className={`${styles.header} ${styles.hard}`}>Сложный уровень</div>
      {data.map((category, categoryIndex) => (
=======
    <div id="content-container" className={styles.contentContainer}>
      {data.map((category) => (
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        <CategoryRow
          key={category.id}
          category={category}
          onBlockSelect={onBlockSelect}
<<<<<<< HEAD
          categoryIndex={categoryIndex + 1} 
=======
>>>>>>> 8740623cfc973399b6f1c5cf32225d0f4f3458fe
        />
      ))}
    </div>
  );
}

export default ContentContainer;
