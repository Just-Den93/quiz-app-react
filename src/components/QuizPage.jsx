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
  const { quizStates, updateQuizState, markBlockAsUsed, setShowQuizPage, selectedMode, currentQuizId } = useQuizContext();
  const currentQuizState = quizStates[currentQuizId] || {};
  const [data, setData] = useState(currentQuizState.data || null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    console.log('Current Quiz ID:', currentQuizId);
    console.log('Current Quiz State:', currentQuizState);

    if (!data && currentQuizId && selectedMode) {
      console.log('Loading data for mode:', selectedMode);
      const selectedData = loadJsonDataByMode(selectedMode);
      if (selectedData) {
        console.log('Data loaded:', selectedData);
        setData(selectedData.categories);
        updateQuizState(currentQuizId, { data: selectedData.categories });
      } else {
        console.log('No data found for mode:', selectedMode);
      }
    }
  }, [data, currentQuizId, selectedMode, currentQuizState, updateQuizState]);

  return (
    <div className={styles.quiz_page}>
      <Header />
      {data ? (
        <ContentContainer data={data} />
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
