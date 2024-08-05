export function handleItemClick(block, categoryId, setSelectedBlock) {
	setSelectedBlock({ ...block, categoryId });
 }
 
 export function closeModal(setSelectedBlock) {
	setSelectedBlock(null);
 }
 