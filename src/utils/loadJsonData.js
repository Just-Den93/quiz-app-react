// src/utils/loadJsonData.js
export function loadJsonDataFiles() {
  const context = require.context('../data', false, /\.json$/);
  return context.keys().map(key => ({
    ...context(key),
    filename: key,
  }));
}

export function loadUniqueUuids() {
  const dataFiles = loadJsonDataFiles();
  const uniqueUuids = Array.from(new Set(dataFiles.map(file => file.uuid)));
  return uniqueUuids.map(uuid => {
    return dataFiles.find(file => file.uuid === uuid);
  });
}

export function loadJsonDataByMode(mode) {
  const dataFiles = loadJsonDataFiles();
  return dataFiles.find(file => file.mode === mode);
}

export function loadJsonFileCount() {
  const context = require.context('../data', false, /\.json$/);
  return context.keys().length;
}
