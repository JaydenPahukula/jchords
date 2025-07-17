import { Signal } from '@preact/signals-react';
import { debounce } from 'shared/functions/debouce';
import { ArrayOf } from 'shared/functions/generateInterfaceChecker';
import { parseJSON } from 'shared/functions/jsonparse';
import { isTab, Tab } from 'src/pages/editor/types/tab';

const isTabArray = ArrayOf(isTab);

export function getStoredTabs(): Tab[] | undefined {
  const result = localStorage.getItem('editor-tabs');
  if (result === null) return undefined;
  const parsed = parseJSON(result);
  return isTabArray(parsed) ? parsed : undefined;
}

export const storeTabs = debounce((tabSignal: Signal<Tab[]>) => {
  console.log('saving tabs');
  localStorage.setItem('editor-tabs', JSON.stringify(tabSignal.value));
}, 3000);
