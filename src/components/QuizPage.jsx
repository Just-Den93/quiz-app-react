import React, { useState, useEffect } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { useQuizContext } from '../context/QuizContext';
import { loadJsonDataByMode } from '../utils/loadJsonData';

function QuizPage() {
  const { usedBlocks, setUsedBlocks, selectedMode, setShowQuizPage } = useQuizContext();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (selectedMode) {
      const selectedData = loadJsonDataByMode(selectedMode);
      if (selectedData) {
        setData(selectedData);
      }
    }
  }, [selectedMode]);

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

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  return (
    <div className={styles.quiz_page}>
      <Header />
      <ContentContainer
        usedBlocks={usedBlocks}
        markBlockAsUsed={markBlockAsUsed}
        data={data ? data.categories : []}
        mode={selectedMode}
      />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={() => setShowQuizPage(false)} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
}

export default QuizPage;
