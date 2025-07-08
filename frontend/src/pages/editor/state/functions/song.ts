import { batch } from '@preact/signals-react';
import { Song } from 'shared/types/song';
import { SongInfo } from 'shared/types/songinfo';
import { apiDeleteSong } from 'src/functions/api/endpoints/deletesong';
import { apiNewSong } from 'src/functions/api/endpoints/newsong';
import { apiUpdateSong } from 'src/functions/api/endpoints/updatesong';
import { closeTab, updateCurrTab } from 'src/pages/editor/state/functions/tabs';
import { state } from 'src/pages/editor/state/state';

export function updateCurrSongInfo(update: Partial<SongInfo>, modify?: boolean) {
  const newInfo: SongInfo = { ...state.currSong.value.info, ...update };
  const newSong: Song = { ...state.currSong.value, info: newInfo };
  updateCurrTab({ song: newSong, modified: modify ?? false });
}

export function updateCurrSong(update: Partial<Song>) {
  const newSong: Song = { ...state.currSong.value, ...update };
  updateCurrTab({ song: newSong, modified: true });
}

export async function publishNewSong(): Promise<boolean> {
  if (!state.isCurrSongModified.value || !state.isCurrSongNew) return false;
  if (state.user.value === null) return false;

  const uid = state.user.value.uid;
  const song = state.currSong.value;
  song.info.id = '';
  song.info.author = uid;

  const result = await apiNewSong(song, await state.user.value.getIdToken());

  if (result === undefined) return false;

  batch(() => {
    updateCurrSongInfo({ id: result, author: uid });
    updateCurrTab({ new: false, modified: false });
  });

  return true;
}

export async function saveSong(): Promise<boolean> {
  if (!state.isCurrSongModified.value || state.isCurrSongNew.value) return false;

  const song = state.currSong.value;
  if (song.info.author !== state.user.value?.uid) return false;

  const result = await apiUpdateSong(song, await state.user.value.getIdToken());
  if (result === undefined) return false;

  updateCurrTab({ modified: false });

  return true;
}

export async function deleteSong(): Promise<boolean> {
  if (state.isCurrSongNew.value) return false;

  const song = state.currSong.value;
  if (song.info.author !== state.user.value?.uid) return false;

  const id = song.info.id;
  const result = await apiDeleteSong(id, await state.user.value.getIdToken());
  if (result === undefined) return false;

  // close all tabs with id
  batch(() => {
    for (let i = 0; i < state.tabs.value.length; i++) {
      if (state.tabs.value[i]?.song.info.id === id) {
        closeTab(i);
        i--;
      }
    }
  });

  return true;
}
