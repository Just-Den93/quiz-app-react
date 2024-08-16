import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Modal from './Modal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { useQuizContext } from '../context/QuizContext';
import { loadJsonDataByMode } from '../utils/loadJsonData';
import { useModalLogic } from '../utils/modalUtils';

function QuizPage() {
  const { quizStates, updateQuizState, setShowQuizPage, selectedMode, currentQuizId, markBlockAsUsed } = useQuizContext();

  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [data, setData] = useState(currentQuizState.data || null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    if (!data && currentQuizId && selectedMode) {
      const selectedData = loadJsonDataByMode(selectedMode);
      if (selectedData) {
        setData(selectedData.categories);
        updateQuizState(currentQuizId, { data: selectedData.categories });
      }
    }
  }, [data, currentQuizId, selectedMode, currentQuizState, updateQuizState]);

  const handleBlockSelect = (block) => {
    console.log("Block selected:", block);
    setSelectedBlock(block);
  };

  const handleCloseModal = () => {
    console.log("Modal closed");
    setSelectedBlock(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
	console.log("Category selected:", categoryId, "Block ID:", blockId);
	markBlockAsUsed(currentQuizId, categoryId, blockId);
	setSelectedBlock(null); // Закрытие модального окна
 }

  const modalLogic = useModalLogic(selectedBlock, markBlockAsUsed, handleCloseModal);

  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <>
          <ContentContainer data={data} onBlockSelect={handleBlockSelect} usedBlocks={currentQuizState.usedBlocks || {}} />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              onClose={handleCloseModal}
              {...modalLogic}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}
            />
          )}
        </>
      ) : (
        <div>No data available.</div>
      )}
      <EndMessage />
      <MenuModal showSettings={() => setIsSettingsVisible(true)} showMainMenu={() => setShowQuizPage(false)} />
      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}

export default QuizPage;
