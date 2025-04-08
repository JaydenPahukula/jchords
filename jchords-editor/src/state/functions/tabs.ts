import makeNewSong from 'src/functions/makenewsong';
import state from 'src/state/state';

export function switchTab(index: number) {
  state.tabIndex.value = index;
}

export function newTab() {
  state.tabIndex.value = state.tabs.value.length;
  state.tabs.value = state.tabs.value.concat([{ song: makeNewSong(), new: true }]);
}

export function closeTab(index: number) {
  if (index >= state.tabs.value.length) return;

  const newTabs = state.tabs.value.filter((_, i) => i !== index);
  state.tabs.value = newTabs;

  if (index < state.tabIndex.value) {
    state.tabIndex.value--;
  }

  if (newTabs.length == 0) newTab();
}
