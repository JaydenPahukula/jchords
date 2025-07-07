import { computed, signal } from '@preact/signals-react';
import { User } from 'firebase/auth';
import { Song } from 'shared/types/song';
import { DialogType } from 'src/enums/dialogtype';
import { Tab } from 'src/pages/editor/types/tab';

const welcomeSong: Song = {
  info: {
    id: 'welcome',
    title: 'Welcome',
    artist: '',
    author: '',
  },
  text: 'this is the welcome song!',
};

const tabs = signal<Tab[]>([{ song: welcomeSong, new: true, modified: false }]);
const tabIndex = signal<number>(0);

const currTab = computed<Tab>(() => {
  const tab = tabs.value[tabIndex.value];
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
  dialog: signal<DialogType>(DialogType.None),
};
