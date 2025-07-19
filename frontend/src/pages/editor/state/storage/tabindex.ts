import { debounce } from 'shared/functions/debouce';

export function getStoredTabIndex(): number | undefined {
  const result = localStorage.getItem('editor-tab-index');
  if (result === null) return undefined;
  const index = parseInt(result);
  if (Number.isNaN(index)) return undefined;
  return index;
}

export const storeTabIndex = debounce((index: number) => {
  localStorage.setItem('editor-tab-index', index.toString());
}, 3000);
