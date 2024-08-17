import React, { useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
import { loadJsonDataByMode } from '../../utils/loadJsonData';
import { useModalLogic } from '../Modal/modalUtils';

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
    setSelectedBlock(block);
  };

  const handleCloseModal = () => {
    setSelectedBlock(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
    console.log("Category selected:", categoryId, "Block ID:", blockId);
    markBlockAsUsed(currentQuizId, categoryId, blockId); // Убедитесь, что функция markBlockAsUsed вызывается правильно
    setSelectedBlock(null); // Закрытие модального окна
  }

  const modalLogic = useModalLogic(selectedBlock, markBlockAsUsed, handleCloseModal);

  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <>
          <ContentContainer data={data} onBlockSelect={handleBlockSelect} />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              onClose={handleCloseModal}
              {...modalLogic}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}  // Убедитесь, что функция правильно передается
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
