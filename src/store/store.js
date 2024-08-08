import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import quizReducer from './reducer'; // Ensure this path is correct

// Configure the Redux store
const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
