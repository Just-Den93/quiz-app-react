export function loadJsonFileCount() {
  const context = require.context('../data', false, /\.json$/);
  return context.keys().length;
}

export function loadJsonDataFiles() {
  const context = require.context('../data', false, /\.json$/);
  return context.keys().map((key) => ({
    ...context(key),
    filename: key,
  }));
}

export async function loadJsonDataByMode(mode) {
  const dataFiles = loadJsonDataFiles();
  const selectedData = dataFiles.find((file) => file.mode === mode);
  if (!selectedData) {
    throw new Error(`No data found for mode ${mode}`);
  }
  return selectedData.categories;
}
