import { Song } from 'shared/types/song';
import { SongInfo } from 'shared/types/songinfo';
import { state } from 'src/state/state';

export function updateCurrSongInfo(update: Partial<SongInfo>) {
  const currId = state.currSongId.value;
  if (currId === undefined || !(currId in state.songs.value)) return;
  state.songs.value[currId].song.info = { ...state.songs.value[currId].song.info, ...update };
  state.songs.value[currId].modified = true;
  state.songs.value = { ...state.songs.value };
}

export function updateCurrSong(update: Partial<Song>) {
  const currId = state.currSongId.value;
  if (currId === undefined || !(currId in state.songs.value)) return;
  state.songs.value[currId].song = { ...state.songs.value[currId].song, ...update };
  state.songs.value[currId].modified = true;
  state.songs.value = { ...state.songs.value };
}
