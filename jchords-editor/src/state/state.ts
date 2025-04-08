import { computed, signal } from '@preact/signals';
import { User } from 'firebase/auth';
import Dialog from 'shared/enums/dialog';
import Song from 'shared/types/song';
import makeWelcomeSong from 'src/functions/makewelcomesong';

const welcomeSong = makeWelcomeSong();

// these are here so computed signals in state do not cause circular definition
const tabs = signal<{ song: Song; new: boolean }[]>([{ song: welcomeSong, new: true }]);
const tabIndex = signal<number>(3);

/** Global app state */
const state = {
  tabs: tabs,
  tabIndex: tabIndex,
  currSong: computed<Song | undefined>(() => tabs.value[tabIndex.value]?.song),
  user: signal<User | null>(null),
  dialog: signal<Dialog>(Dialog.None),
};

export default state;
