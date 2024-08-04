export function loadData() {
  const context = require.context('../data', false, /\.js$/);
  const data = context.keys().map(key => context(key).default);
  return data;
}
