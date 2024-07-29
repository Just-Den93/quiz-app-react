import React, { useState, useEffect } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';

function QuizPage({ showMainMenu, handleNewGame, miniature = false }) {
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
    <div className={`${styles.quiz_page} ${miniature ? styles.miniature : ''}`}>
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={showMainMenu} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
}

export default QuizPage;
