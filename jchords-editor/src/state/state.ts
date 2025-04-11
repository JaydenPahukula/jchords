import { computed, signal } from '@preact/signals';
import { User } from 'firebase/auth';
import Dialog from 'shared/enums/dialog';
import Song from 'shared/types/song';
import makeWelcomeSong from 'src/functions/makewelcomesong';

const welcomeSong = makeWelcomeSong();

// these are here so computed signals in state do not cause circular definition
const songs = signal<{ [key: string]: { song: Song; new: boolean; modified: boolean } }>({
  [welcomeSong.info.id]: { song: welcomeSong, new: true, modified: false },
});
const tabs = signal<string[]>([welcomeSong.info.id]);
const tabIndex = signal<number>(0);
const currSongId = computed<string | undefined>(() => tabs.value[tabIndex.value]);

/** Global app state */
const state = {
  songs: songs,
  tabs: tabs,
  tabIndex: tabIndex,
  currSongId: currSongId,
  currSong: computed<Song | undefined>(() => songs.value[currSongId.value ?? ''].song ?? undefined),
  user: signal<User | null>(null),
  dialog: signal<Dialog>(Dialog.None),
};

export default state;
