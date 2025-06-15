import { batch } from '@preact/signals';
import { apiNewSong } from 'shared/functions/api/endpoints/newsong';
import { apiSaveSong } from 'shared/functions/api/endpoints/savesong';
import { Song } from 'shared/types/song';
import { SongInfo } from 'shared/types/songinfo';
import { updateCurrTab } from 'src/state/functions/tabs';
import { state } from 'src/state/state';

export function updateCurrSongInfo(update: Partial<SongInfo>) {
  const newInfo: SongInfo = { ...state.currSong.value.info, ...update };
  const newSong: Song = { ...state.currSong.value, info: newInfo };
  updateCurrTab({ song: newSong });
}

export function updateCurrSong(update: Partial<Song>) {
  const newSong: Song = { ...state.currSong.value, ...update };
  updateCurrTab({ song: newSong, modified: true });
}

/**
 * @returns Whether or not the operation was successful
 */
export async function publishNewSong(): Promise<boolean> {
  if (!state.isCurrSongModified.value || !state.isCurrSongNew) return false;
  if (state.user.value === null) return false;

  const song = state.currSong.value;
  song.info.id = '';
  song.info.author = state.user.value.uid;

  const result = await apiNewSong(song, await state.user.value.getIdToken());

  if (result === undefined) return false;

  batch(() => {
    updateCurrSongInfo({ id: result });
    updateCurrTab({ new: false, modified: false });
  });

  return true;
}

/**
 * @returns Whether or not the operation was successful
 */
export async function saveSong(): Promise<boolean> {
  if (!state.isCurrSongModified.value || state.isCurrSongNew.value) return false;

  const song = state.currSong.value;

  if (song.info.author !== state.user.value?.uid) return false;

  const result = await apiSaveSong(song, await state.user.value.getIdToken());

  if (result === undefined) return false;

  updateCurrTab({ modified: false });

  return true;
}
