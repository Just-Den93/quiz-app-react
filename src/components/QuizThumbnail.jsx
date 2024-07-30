import React from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import styles from '../styles/QuizThumbnail.module.css';

function QuizThumbnail({ usedBlocks, markBlockAsUsed }) {
  return (
    <div className={styles.quiz_thumbnail}>
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} />
    </div>
  );
}

export default QuizThumbnail;
