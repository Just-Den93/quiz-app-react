// utils/loadJsonData.js
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
	console.log('Загрузка данных для режима:', mode); // Лог для проверки режима
	const dataFiles = loadJsonDataFiles();
	console.log('Все доступные данные:', dataFiles); // Лог для проверки всех загруженных данных
	return dataFiles.find(file => file.mode === mode);
 }
 