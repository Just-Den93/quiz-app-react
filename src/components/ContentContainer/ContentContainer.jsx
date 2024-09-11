import React from 'react';
import CategoryRow from '../CategoryRow/CategoryRow';
import styles from './ContentContainer.module.css';
import { renderCategoryRows } from './contentContainerUtils'; // Импортируем вынесенную функцию

function ContentContainer({ data, onBlockSelect }) {
  return (
    <div className={styles.contentContainer}>
      {renderCategoryRows(data, onBlockSelect)} {/* Используем вынесенную функцию */}
    </div>
  );
}

export default ContentContainer;
