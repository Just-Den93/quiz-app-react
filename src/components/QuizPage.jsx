import React, { useState, useEffect } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { loadJsonDataByMode } from '../utils/loadJsonData'; // Измененный импорт

function QuizPage({ showMainMenu, handleNewGame, mode }) {
  const [usedBlocks, setUsedBlocks] = useState(() => {
    const saved = localStorage.getItem('usedBlocks');
    return saved ? JSON.parse(saved) : {};
  });
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [data, setData] = useState(null);

  // Используем useEffect для загрузки данных по режиму
  useEffect(() => {
    if (mode) {
      console.log('Загрузка данных для режима:', mode); // Лог для проверки режима
      const selectedData = loadJsonDataByMode(mode); // Загрузка данных по режиму
      if (selectedData) {
        console.log('Данные загружены:', selectedData); // Лог для проверки загруженных данных
        setData(selectedData.categories);
      } else {
        console.log('Данные не найдены для режима:', mode); // Лог для случая, если данные не найдены
      }
    }
  }, [mode]);

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
        data={data}
        mode={mode} // Передача режима в ContentContainer
      />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={showMainMenu} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
}

export default QuizPage;
