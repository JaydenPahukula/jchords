export function getStoredTabIndex(): number | undefined {
  const result = localStorage.getItem('editor-tab-index');
  if (result === null) return undefined;
  const index = parseInt(result);
  if (Number.isNaN(index)) return undefined;
  return index;
}

export function storeTabIndex(index: number) {
  console.log('storing tab', index);
  localStorage.setItem('editor-tab-index', index.toString());
}
