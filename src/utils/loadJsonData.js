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
    const quizData = dataFiles.find(file => file.uuid === uuid);
    return {
      uuid: quizData.uuid,
      mode: quizData.mode,
      name: quizData["quiz name"],  // Используем правильное поле "quiz name"
      categories: quizData.categories,
    };
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
