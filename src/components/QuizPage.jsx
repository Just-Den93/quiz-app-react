import React, { useState, useEffect } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';

<<<<<<< HEAD
function QuizPage({ showMainMenu, handleNewGame }) {
=======
function QuizPage({ showMainMenu, handleNewGame, miniature = false }) {
>>>>>>> 6ac6f2e5b8d44f22b622c255be38cea7678719ac
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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

  const resetUsedBlocks = () => {
    setUsedBlocks({});
    localStorage.removeItem('usedBlocks');
  };

  useEffect(() => {
    localStorage.setItem('usedBlocks', JSON.stringify(usedBlocks));
  }, [usedBlocks]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  return (
<<<<<<< HEAD
    <div className={styles.quiz_page}>
=======
    <div className={`${styles.quiz_page} ${miniature ? styles.miniature : ''}`}>
>>>>>>> 6ac6f2e5b8d44f22b622c255be38cea7678719ac
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} />
      <EndMessage />
      <MenuModal
        showSettings={showSettings}
        showMainMenu={showMainMenu}
        handleNewGame={() => {
          handleNewGame();
          resetUsedBlocks();
        }}
      />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
}

export default QuizPage;
