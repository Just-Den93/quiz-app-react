// src/utils/loadJsonData.js
export function loadJsonFileCount() {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().length;
  }
  
  export function loadJsonDataFiles() {
    const context = require.context('../data', false, /\.json$/);
    return context.keys().map(key => ({
      ...context(key),
      filename: key,
    }));
  }
  
  export function loadJsonDataByMode(mode) {
    const dataFiles = loadJsonDataFiles();
    return dataFiles.find(file => file.mode === mode);
  }
  