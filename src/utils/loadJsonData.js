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

export function loadJsonDataByMode(mode) {
  const context = require.context('../data', false, /\.json$/);
  const dataFiles = context.keys().map((key) => context(key));
  const selectedData = dataFiles.find((file) => file.mode === mode);
  if (!selectedData) {
    throw new Error(`No data found for mode ${mode}`);
  }
  return selectedData;
}
