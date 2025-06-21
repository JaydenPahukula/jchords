import { Song } from 'shared/types/song';
import { makeNewSong } from 'src/functions/makenewsong';
import { state } from 'src/state/state';
import { Tab } from 'src/types/tab';

export function switchTab(index: number) {
  state.tabIndex.value = index;
}

export function newTab(newSong?: Song, modified?: boolean, isNew?: boolean) {
  isNew = isNew ?? newSong === undefined;
  if (newSong === undefined) newSong = makeNewSong();
  state.tabIndex.value = state.tabs.value.length;
  state.tabs.value = [
    ...state.tabs.value,
    { song: newSong, new: isNew, modified: modified ?? false },
  ];
}

export function closeTab(index: number) {
  if (index < 0 || index >= state.tabs.value.length) return;

  if (index < state.tabIndex.value || index >= state.tabs.value.length - 1) {
    state.tabIndex.value--;
  }

  const newTabs = state.tabs.value.filter((_, i) => i !== index);
  state.tabs.value = newTabs;

  if (newTabs.length == 0) newTab();
}

export function updateCurrTab(update: Partial<Tab>) {
  const currTabIndex = state.tabIndex.value;
  const newTab = { ...state.currTab.value, ...update };
  state.tabs.value = state.tabs.value.map((tab, i) => (i === currTabIndex ? newTab : tab));
}
