import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import Song from 'src/types/song';
import SongId from 'src/types/songid';
import SongInfo from 'src/types/songinfo';

/*
 * This slice manages the array of all the songs current open in
 * the editor.
 */

type Songs = {
  [key: SongId]: {
    song: Song;
    modified: boolean;
  };
};

type SongDataState = {
  currIndex: number;
  songs: Songs;
  order: SongId[];
};

const initialState: SongDataState = {
  currIndex: 0,
  songs: {
    welcome: {
      song: {
        src: 'welcome!',
        info: {
          id: 'welcome',
          title: 'Welcome!',
          artist: 'JChords',
        },
      },
      modified: false,
    },
  },
  order: ['welcome'],
};

export const songDataSlice = createSlice({
  name: 'songData',
  initialState: initialState,
  reducers: {
    openSong: (state: SongDataState, action: PayloadAction<Song>) => {
      const id: SongId = action.payload.info.id;
      const newSongs = { ...state.songs };
      newSongs[id] = {
        song: action.payload,
        modified: false,
      };
      return {
        currIndex: 0,
        songs: newSongs,
        order: [...state.order, id],
      };
    },
    setCurrSong: (state: SongDataState, action: PayloadAction<number>) => {
      const index = Math.max(0, Math.min(state.order.length - 1, action.payload));
      state.currIndex = index;
    },
    closeSong: (state: SongDataState, action: PayloadAction<number>): SongDataState => {
      if (state.order.length <= 1) return state;
      const index = Math.max(0, Math.min(state.order.length - 1, action.payload));
      const id = state.order[index];
      const { [id]: _, ...newSongs } = state.songs;
      return {
        currIndex: Math.min(state.order.length - 2, state.currIndex),
        order: [...state.order.slice(0, index), ...state.order.slice(index + 1)],
        songs: newSongs,
      };
    },
    updateSongSrc: (
      state: SongDataState,
      action: PayloadAction<{ id: SongId; newSrc: string; modify?: boolean }>,
    ) => {
      state.songs[action.payload.id].song.src = action.payload.newSrc;
      if (action.payload.modify !== false) state.songs[action.payload.id].modified = true; // mark updated
    },
    updateSongInfo: (
      state: SongDataState,
      action: PayloadAction<{ id: SongId; update: Partial<SongInfo> }>,
    ) => {
      const update = { ...action.payload.update };
      delete update.id; // do not update song id
      const oldInfo = state.songs[action.payload.id].song.info;
      state.songs[action.payload.id].song.info = { ...oldInfo, ...update };
      state.songs[action.payload.id].modified = true; // mark updated
    },
  },
});

export const { openSong, setCurrSong, closeSong, updateSongSrc, updateSongInfo } =
  songDataSlice.actions;

const songDataReducer = songDataSlice.reducer;
export default songDataReducer;

export const selectSongData = (state: RootState): SongDataState => state.songData;
export const selectCurrSong = (state: RootState): Song =>
  state.songData.songs[state.songData.order[state.songData.currIndex]].song;
