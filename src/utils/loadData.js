export function loadFileCount() {
<<<<<<< HEAD
	const context = require.context('../data', false, /\.js$/);
	return context.keys().length;
 }
 
=======
  const context = require.context('../data', false, /\.json$/);
  return context.keys().length;
}
>>>>>>> 03b1859d05dbccf6df34d2614aa7cf4a5ac3baf5
