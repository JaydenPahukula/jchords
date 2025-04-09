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

  const id = state.tabs.value[index];

  const newTabs = state.tabs.value.filter((_, i) => i !== index);
  state.tabs.value = newTabs;

  if (id in state.songs.value && !newTabs.includes(id)) {
    const { [id]: _, ...newSongs } = state.songs.value;
    state.songs.value = newSongs;
  }

  if (index < state.tabIndex.value) {
    state.tabIndex.value--;
  }

  if (newTabs.length == 0) newTab();
}
