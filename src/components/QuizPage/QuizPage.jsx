import React, { useMemo, useState, useEffect } from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';
import EndMessage from '../EndMessage/EndMessage';
import MenuModal from '../MenuModal/MenuModal';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import styles from './QuizPage.module.css';
import { useQuizContext } from '../../context/QuizContext';
import PCImage from '../../images/PC_horizontal_1line_black.svg'; // Убедитесь, что путь к изображению верен  

function QuizPage() {
  const { quizStates, setShowQuizPage, currentQuizId, selectedMode, data, markBlockAsUsed } = useQuizContext();

  const currentQuizState = useMemo(() => quizStates[currentQuizId] || {}, [quizStates, currentQuizId]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBlockSelect = (block, category) => {
    console.log('Selected Block:', block); // Логгируем выбранный блок
    console.log('Selected Category:', category); // Логгируем выбранную категорию
    setSelectedBlock(block);
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedBlock(null);
    setSelectedCategory(null);
  };

  const handleSelectCategory = (categoryId, blockId) => {
    markBlockAsUsed(currentQuizId, categoryId, blockId);  // Отмечаем блок как использованный
    handleCloseModal();  // Закрываем модальное окно после выбора категории
  };

  useEffect(() => {
    console.log('Data in QuizPage:', data); // Логгируем данные при каждом рендере
  }, [data]);

  return (
    <div className={styles.quiz_page}>
      {data ? (
        <>
        <img src={PCImage} alt="PC horizontal line" className={styles.image} /> {/* Добавляем изображение */}
          <ContentContainer 
            data={data} 
            onBlockSelect={handleBlockSelect} 
            usedBlocks={currentQuizState.usedBlocks || {}} 
          />
          {selectedBlock && (
            <Modal
              block={selectedBlock}
              categoryName={selectedCategory?.name || 'Без категории'} // Проверяем categoryName
              onClose={handleCloseModal}
              selectedMode={selectedMode}
              onSelectCategory={handleSelectCategory}  // Передаем функцию для обработки выбора категории
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
