import { computed, signal } from '@preact/signals';
import { User } from 'firebase/auth';
import { Dialog } from 'shared/enums/dialog';
import { Song } from 'shared/types/song';
import { makeWelcomeSong } from 'src/functions/makewelcomesong';
import { Tab } from 'src/types/tab';

const welcomeSong = makeWelcomeSong();

const tabs = signal<Tab[]>([{ song: welcomeSong, new: true, modified: false }]);
const tabIndex = signal<number>(0);

const currTab = computed<Tab>(() => {
  const tab = tabs.value.at(tabIndex.value);
  if (tab === undefined) throw new Error(`state.tabIndex out of range`);
  return tab;
});

/** Global app state */
export const state = {
  tabs: tabs,
  tabIndex: tabIndex,
  currTab: currTab,
  currSong: computed<Song>(() => currTab.value.song),
  isCurrSongNew: computed<boolean>(() => currTab.value.new),
  isCurrSongModified: computed<boolean>(() => currTab.value.modified),
  user: signal<User | null>(null),
  dialog: signal<Dialog>(Dialog.None),
};
