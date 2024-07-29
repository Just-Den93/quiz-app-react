import React, { useState } from 'react';
import Frame from 'react-frame-component';
import QuizPage from './QuizPage';
import styles from '../styles/QuizCard.module.css';

function QuizCard({ startQuiz, showMainMenu, handleNewGame }) {
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });

  const markBlockAsUsed = (categoryName, blockId) => {
    setUsedBlocks((prevUsedBlocks) => {
      const updatedUsedBlocks = { ...prevUsedBlocks };
      if (!updatedUsedBlocks[categoryName]) {
        updatedUsedBlocks[categoryName] = [];
      }
      updatedUsedBlocks[categoryName].push(blockId);

      localStorage.setItem('usedBlocks', JSON.stringify(updatedUsedBlocks));
      return updatedUsedBlocks;
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Frame
          initialContent={`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { margin: 0; }
                  .scalable { transform: scale(0.2); transform-origin: top left; width: 500%; height: 500%; }
                </style>
              </head>
              <body>
                <div id="thumbnail-root" class="scalable"></div>
              </body>
            </html>
          `}
        >
          <div id="thumbnail-root">
            <QuizPage usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} miniature />
          </div>
        </Frame>
      </div>
      <div className={styles.details}>
        <h2>Вікторина Південна</h2>
        <p>20 запитань</p>
        <p>Just_Dens</p>
        <div className={styles.bottomRow}>
          <p className={styles.games}>Ігри: 0</p>
          <button className={styles.startButton} onClick={startQuiz}>
            Провести наживо
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
