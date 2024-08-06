// src/store/reducers.js

const initialState = {};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ_STATE':
      return {
        ...state,
        [action.payload.mode]: {
          ...state[action.payload.mode],
          ...action.payload.state,
        },
      };
    case 'MARK_BLOCK_AS_USED':
      const { mode, categoryName, blockId } = action.payload;
      // Ensure the mode and usedBlocks exist in the state
      const modeState = state[mode] || {};
      const usedBlocks = modeState.usedBlocks || {};

      return {
        ...state,
        [mode]: {
          ...modeState,
          usedBlocks: {
            ...usedBlocks,
            [categoryName]: [
              ...(usedBlocks[categoryName] || []),
              blockId,
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default quizReducer;
