import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadJsonDataByMode } from '../utils/loadJsonData';

export const SET_SELECTED_MODE = 'SET_SELECTED_MODE';
export const SET_QUIZ_STATE = 'SET_QUIZ_STATE';
export const MARK_BLOCK_AS_USED = 'MARK_BLOCK_AS_USED';
export const SET_SHOW_QUIZ_PAGE = 'SET_SHOW_QUIZ_PAGE';

export const setShowQuizPage = (show) => ({
  type: SET_SHOW_QUIZ_PAGE,
  payload: show,
});

export const setSelectedMode = (mode) => ({
  type: SET_SELECTED_MODE,
  payload: mode,
});

export const setQuizState = (mode, state) => ({
  type: SET_QUIZ_STATE,
  payload: { mode, state },
});

export const markBlockAsUsed = (mode, categoryName, blockId) => ({
  type: MARK_BLOCK_AS_USED,
  payload: { mode, categoryName, blockId },
});

// Thunk for fetching quiz data
export const fetchQuizData = createAsyncThunk(
  'quiz/fetchQuizData',
  async (mode, { rejectWithValue }) => {
    try {
      const data = await loadJsonDataByMode(mode);
      return { mode, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
