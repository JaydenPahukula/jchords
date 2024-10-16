import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import Song from 'src/types/song';
import SongId from 'src/types/songid';

/*
 * This slice manages the array of all the songs current open in
 * the editor.
 */

type SongDataState = {
  currSongId: SongId;
  songs: {
    [key: SongId]: {
      song: Song;
      modified: boolean;
    };
  };
  order: SongId[];
};

const initialState: SongDataState = {
  currSongId: 'welcome',
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
    addSong: (state: SongDataState, action: PayloadAction<Song>) => {
      const id: SongId = action.payload.info.id;
      const newSongs = { ...state.songs };
      newSongs[id] = {
        song: action.payload,
        modified: false,
      };
      return {
        currSongId: id,
        songs: newSongs,
        order: [...state.order, id],
      };
    },
    setSongSrc: (state: SongDataState, action: PayloadAction<{ id: SongId; newSrc: string }>) => {
      state.songs[action.payload.id].song.src = action.payload.newSrc;
    },
    setCurrSong: (state: SongDataState, action: PayloadAction<SongId>) => {
      state.currSongId = action.payload;
    },
  },
});

export const { addSong, setSongSrc, setCurrSong } = songDataSlice.actions;

const songDataReducer = songDataSlice.reducer;
export default songDataReducer;

export const selectSongData = (state: RootState): SongDataState => state.songData;
export const selectCurrSong = (state: RootState): Song =>
  state.songData.songs[state.songData.currSongId].song;
