export function loadFileCount() {
	const context = require.context('../data', false, /\.js$/);
	return context.keys().length;
 }
 