import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import ContentContainer from './ContentContainer';
import EndMessage from './EndMessage';
import MenuModal from './MenuModal';
import Settings from './Settings';
import styles from '../styles/QuizPage.module.css';
import { fetchQuizData, markBlockAsUsed } from '../store/actions';

const QuizPage = ({ showMainMenu, handleNewGame }) => {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz[mode]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    if (mode) {
      dispatch(fetchQuizData(mode));
    }
  }, [mode, dispatch]);

  const showSettings = () => {
    setIsSettingsVisible(true);
  };

  const hideSettings = () => {
    setIsSettingsVisible(false);
  };

  const markBlock = (categoryName, blockId) => {
    dispatch(markBlockAsUsed({ mode, categoryName, blockId }));
  };

  return (
    <div className={styles.quiz_page}>
      <Header />
      <ContentContainer
        usedBlocks={quizState?.usedBlocks || {}}
        markBlockAsUsed={markBlock}
        data={quizState?.categories}
        mode={mode}
      />
      <EndMessage />
      <MenuModal showSettings={showSettings} showMainMenu={showMainMenu} />
      {isSettingsVisible && <Settings onClose={hideSettings} />}
    </div>
  );
};

export default QuizPage;
