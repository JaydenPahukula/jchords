import { computed, effect, signal } from '@preact/signals-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Song } from 'shared/types/song';
import { auth } from 'src/firebase/auth';
import { getStoredTabIndex, storeTabIndex } from 'src/pages/editor/state/storage/tabindex';
import { getStoredTabs, storeTabs } from 'src/pages/editor/state/storage/tabs';
import { welcomeSong } from 'src/pages/editor/state/welcomesong';
import { Tab } from 'src/pages/editor/types/tab';

const defaultTabs = [{ song: welcomeSong, new: true, modified: false }];
const tabs = signal<Tab[]>(getStoredTabs() ?? defaultTabs);
effect(() => storeTabs(tabs));

const tabIndex = signal<number>(Math.min(getStoredTabIndex() ?? 0, tabs.value.length - 1));
effect(() => storeTabIndex(tabIndex.value));

const currTab = computed<Tab>(() => {
  let tab = tabs.value[tabIndex.value];
  if (tab === undefined) {
    console.error('state.tabIndex out of range');
    tab = tabs.value[0];
    if (tab === undefined) throw new Error('No tabs are open!');
  }
  return tab;
});

const userSignal = signal<User | null | undefined>(undefined);
onAuthStateChanged(auth, (user) => {
  userSignal.value = user;
});
effect(() => {
  console.log('user changed:', userSignal.value);
});

/** Global app state */
export const state = {
  tabs: tabs,
  tabIndex: tabIndex,
  currTab: currTab,
  currSong: computed<Song>(() => currTab.value.song),
  isCurrSongNew: computed<boolean>(() => currTab.value.new),
  isCurrSongModified: computed<boolean>(() => currTab.value.modified),
  user: userSignal,
};
