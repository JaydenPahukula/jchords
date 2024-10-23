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
    srcModified: boolean;
    infoModified: boolean;
    isNew: boolean;
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
    openSong: (state: SongDataState, action: PayloadAction<Song>): SongDataState => {
      const id: SongId = action.payload.info.id;
      const newSongs = { ...state.songs };
      newSongs[id] = {
        song: action.payload,
        srcModified: false,
        infoModified: false,
        isNew: false,
      };
      return {
        currIndex: state.order.length,
        songs: newSongs,
        order: [...state.order, id],
      };
    },
    openBlankSong: (state: SongDataState, action: PayloadAction<void>): SongDataState => {
      let n = 0;
      while (state.order.includes('new' + n.toString())) n += 1;
      const id = 'new' + n.toString();
      const newSongs = { ...state.songs };
      newSongs[id] = {
        song: {
          src: '',
          info: {
            id: id,
            title: n === 0 ? 'New Song' : 'New Song ' + n.toString(),
            artist: '',
          },
        },
        srcModified: false,
        infoModified: false,
        isNew: true,
      };
      return {
        currIndex: state.order.length,
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
      if (action.payload.modify !== false) state.songs[action.payload.id].infoModified = true; // mark updated
    },
    updateSongInfo: (
      state: SongDataState,
      action: PayloadAction<{ id: SongId; update: Partial<SongInfo> }>,
    ) => {
      const update = { ...action.payload.update };
      delete update.id; // do not update song id
      const oldInfo = state.songs[action.payload.id].song.info;
      state.songs[action.payload.id].song.info = { ...oldInfo, ...update };
      state.songs[action.payload.id].infoModified = true; // mark updated
    },
    markUnmodified: (state: SongDataState, action: PayloadAction<SongId>) => {
      state.songs[action.payload].srcModified = false;
      state.songs[action.payload].infoModified = false;
    },
    // for when a song gets first saved
    songCreated: (
      state: SongDataState,
      action: PayloadAction<{ oldId: SongId; id: SongId }>,
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
  openBlankSong,
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
