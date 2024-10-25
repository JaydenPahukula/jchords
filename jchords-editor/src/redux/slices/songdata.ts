import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import Song from 'src/types/song';
import SongInfo from 'src/types/songinfo';

/*
 * This slice manages the array of all the songs current open in
 * the editor.
 */

type Songs = {
  [key: string]: {
    song: Song;
    srcModified: boolean;
    infoModified: boolean;
    isNew: boolean;
  };
};

type SongDataState = {
  currIndex: number;
  songs: Songs;
  order: string[];
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
      srcModified: false,
      infoModified: false,
      isNew: false,
    },
  },
  order: ['welcome'],
};

export const songDataSlice = createSlice({
  name: 'songData',
  initialState: initialState,
  reducers: {
    openSong: (
      state: SongDataState,
      action: PayloadAction<{ song: Song; isNew: boolean }>,
    ): SongDataState => {
      const id: string = action.payload.song.info.id;
      // switch to song if it is already open
      const i = state.order.findIndex((id) => id === action.payload.song.info.id);
      if (i !== -1) return { ...state, currIndex: i };
      // else open in new tab
      return {
        currIndex: state.order.length,
        songs: {
          ...state.songs,
          [id]: {
            song: action.payload.song,
            srcModified: false,
            infoModified: false,
            isNew: action.payload.isNew,
          },
        },
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
      action: PayloadAction<{ id: string; newSrc: string; modify?: boolean }>,
    ) => {
      state.songs[action.payload.id].song.src = action.payload.newSrc;
      if (action.payload.modify !== false) state.songs[action.payload.id].infoModified = true; // mark updated
    },
    updateSongInfo: (
      state: SongDataState,
      action: PayloadAction<{ id: string; update: Partial<SongInfo> }>,
    ) => {
      const oldInfo = state.songs[action.payload.id].song.info;
      state.songs[action.payload.id].song.info = {
        ...oldInfo,
        ...action.payload.update,
        id: action.payload.id, // do not update id
      };
      state.songs[action.payload.id].infoModified = true; // mark updated
    },
    markUnmodified: (state: SongDataState, action: PayloadAction<string>) => {
      state.songs[action.payload].srcModified = false;
      state.songs[action.payload].infoModified = false;
    },
    // for when a song gets first saved
    songCreated: (
      state: SongDataState,
      action: PayloadAction<{ oldId: string; id: string }>,
    ): SongDataState => {
      const newSongs = { ...state.songs };
      newSongs[action.payload.id] = {
        song: state.songs[action.payload.oldId].song,
        srcModified: false,
        infoModified: false,
        isNew: false,
      };
      return {
        currIndex: state.currIndex,
        songs: newSongs,
        order: state.order.map((id, i) => (i === state.currIndex ? action.payload.id : id)),
      };
    },
  },
});

export const {
  openSong,
  setCurrSong,
  closeSong,
  updateSongSrc,
  updateSongInfo,
  markUnmodified,
  songCreated,
} = songDataSlice.actions;

const songDataReducer = songDataSlice.reducer;
export default songDataReducer;

export const selectSongData = (state: RootState): SongDataState => state.songData;
export const selectCurrSong = (state: RootState): Song =>
  state.songData.songs[state.songData.order[state.songData.currIndex]].song;
