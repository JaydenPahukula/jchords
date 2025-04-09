import makeNewSong from 'src/functions/makenewsong';
import state from 'src/state/state';

export function switchTab(index: number) {
  state.tabIndex.value = index;
}

export function newTab() {
  const newSong = makeNewSong();
  state.tabIndex.value = state.tabs.value.length;
  state.tabs.value = state.tabs.value.concat([newSong.info.id]);
  state.songs.value = { ...state.songs.value, [newSong.info.id]: { song: newSong, new: true } };
}

export function closeTab(index: number) {
  if (index >= state.tabs.value.length) return;

  if (index < state.tabIndex.value || index >= state.tabs.value.length - 1) {
    state.tabIndex.value--;
  }

  const id = state.tabs.value[index];

  const newTabs = state.tabs.value.filter((_, i) => i !== index);
  state.tabs.value = newTabs;

  if (id in state.songs.value && !newTabs.includes(id)) {
    const { [id]: _, ...newSongs } = state.songs.value;
    state.songs.value = newSongs;
  }

  if (newTabs.length == 0) newTab();
}
