import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';
import Sidebar from './Sidebar';
import styles from '../styles/App.module.css';

function App() {
  const [showQuizPage, setShowQuizPage] = useState(false);

<<<<<<< HEAD
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState(() => {
    const savedMode = localStorage.getItem('selectedMode');
    return savedMode ? savedMode : 'QAMode';
  });

  const markBlockAsUsed = (categoryId, blockId) => {
    setUsedBlocks((prevUsedBlocks) => {
      const updatedUsedBlocks = { ...prevUsedBlocks };
      if (!updatedUsedBlocks[categoryId]) {
        updatedUsedBlocks[categoryId] = [];
      }
      updatedUsedBlocks[categoryId].push(blockId);

      localStorage.setItem('usedBlocks', JSON.stringify(updatedUsedBlocks));
      return updatedUsedBlocks;
    });
  };

  useEffect(() => {
    localStorage.setItem('usedBlocks', JSON.stringify(usedBlocks));
  }, [usedBlocks]);

  useEffect(() => {
    localStorage.setItem('selectedMode', selectedMode);
  }, [selectedMode]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  const handleNewGame = () => {
    localStorage.removeItem('usedBlocks');
    setUsedBlocks({});
    window.location.reload();
  };

  return (
    <div className={styles.app}>
      <Header />
      <ContentContainer usedBlocks={usedBlocks} markBlockAsUsed={markBlockAsUsed} selectedMode={selectedMode} />
      <EndMessage />
      <MenuModal showSettings={showSettings} handleNewGame={handleNewGame} />
      {isSettingsVisible && (
        <Settings
          onClose={hideSettings}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
      )}
    </div>
=======
  const handleShowQuizPage = () => {
    setShowQuizPage(true);
  };

  const handleShowMainMenu = () => {
    setShowQuizPage(false);
  };

  return (
    <Router>
      <div className={styles.container}>
        {!showQuizPage && <Sidebar />}
        <Routes>
          <Route
            path="/quiz"
            element={
              !showQuizPage ? (
                <QuizCard startQuiz={handleShowQuizPage} />
              ) : (
                <QuizPage showMainMenu={handleShowMainMenu} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
>>>>>>> 65fc46519fb339387afc23b276b36f2af036c8e6
  );
}

export default App;
