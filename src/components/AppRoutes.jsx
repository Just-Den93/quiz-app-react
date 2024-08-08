// src/components/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import QuizCard from './QuizCard';

const AppRoutes = ({ fileCount, showQuizPage, startQuiz, handleShowMainMenu, handleNewGame, selectedMode }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          !showQuizPage ? (
            Array.from({ length: fileCount }).map((_, index) => (
              <QuizCard
                key={index}
                mode={index + 1}
                startQuiz={() => startQuiz(index + 1)}
              />
            ))
          ) : (
            <QuizPage
              mode={selectedMode}
              showMainMenu={handleShowMainMenu}
              handleNewGame={handleNewGame}
            />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
