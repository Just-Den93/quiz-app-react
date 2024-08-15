import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './components/App';
import { QuizProvider } from './context/QuizContext';

ReactDOM.render(
  <QuizProvider>
    <AppWrapper />
  </QuizProvider>,
  document.getElementById('root')
);
