export function handleItemClick(block, categoryId, setSelectedBlock, markBlockAsUsed, currentQuizId) {
	console.log(`handleItemClick called for block ID: ${block.id}, category ID: ${categoryId}`); // Лог при вызове функции
	setSelectedBlock(block);
	markBlockAsUsed(currentQuizId, categoryId, block.id);
 }
 
 export function closeModal(setSelectedBlock) {
	console.log('Closing modal'); // Лог при закрытии модального окна
	setSelectedBlock(null);
 }
 