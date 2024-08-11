// store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import quizReducer from './reducer';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
