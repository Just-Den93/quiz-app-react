import React, { useState, useMemo } from 'react';
import Header from '../Header/Header';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';

function QuizPage() {
  const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed } = useQuizContext();

  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBlockSelect = (block, category) => {
    setSelectedBlock(block);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedBlock(null);
    setSelectedCategory(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
    markBlockAsUsed(currentQuizId, categoryId, blockId);
    setSelectedBlock(null);
    setSelectedCategory(null);
  };

  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <>
          <ContentContainer
            data={data}
            onBlockSelect={handleBlockSelect}
            usedBlocks={currentQuizState.usedBlocks || {}}
          />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name}
              onClose={handleCloseModal}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}
            />
          )}
        </>
      ) : (
        <div>No data available.</div>
      )}
      <EndMessage />
      <MenuModal
        showSettings={() => setIsSettingsVisible(true)}
        showMainMenu={() => setShowQuizPage(false)}
      />
      {isSettingsVisible && <Settings onClose={() => setIsSettingsVisible(false)} />}
    </div>
  );
}

export default QuizPage;
