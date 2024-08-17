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
    // console.log("Block selected:", block);
    setSelectedBlock(block);
  };

  const handleCloseModal = () => {
    // console.log("Modal closed");
    setSelectedBlock(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
<<<<<<< HEAD:src/components/QuizPage.jsx
    console.log("Category selected:", categoryId, "Block ID:", blockId);
    markBlockAsUsed(currentQuizId, categoryId, blockId);  // Правильный порядок параметров
    setSelectedBlock(null);
};

  // console.log("Before calling useModalLogic, selectedBlock:", selectedBlock); // Логирование перед вызовом useModalLogic
=======
	console.log("Category selected:", categoryId, "Block ID:", blockId);
	markBlockAsUsed(currentQuizId, categoryId, blockId);
	setSelectedBlock(null); // Закрытие модального окна
 }
>>>>>>> 9aec408a2d9a3289a31372e0cac247037ab3fb50:src/components/QuizPage/QuizPage.jsx

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
