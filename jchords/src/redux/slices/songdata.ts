import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import SongInfo from 'src/types/songinfo';

type SongInfoMap = {
  [key: string]: SongInfo;
};

type SongDataState = {
  loading: boolean;
  songsLoaded: boolean;
  songs: SongInfoMap;
  src: string | undefined;
};

const initialState: SongDataState = {
  loading: true,
  songsLoaded: false,
  songs: {},
  src: undefined,
};

export const songDataSlice = createSlice({
  name: 'songData',
  initialState: initialState,
  reducers: {
    setLoading: (state: SongDataState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSongsLoaded: (state: SongDataState) => {
      state.songsLoaded = true;
    },
    updateSongs: (state: SongDataState, action: PayloadAction<SongInfoMap>) => {
      state.songs = { ...state.songs, ...action.payload };
    },
    setSrc: (state: SongDataState, action: PayloadAction<string | undefined>) => {
      state.src = action.payload;
    },
  },
});

export const { setLoading, setSongsLoaded, updateSongs, setSrc } = songDataSlice.actions;

const songDataReducer = songDataSlice.reducer;
export default songDataReducer;

export const selectSongData = (state: RootState): SongDataState => state.songData;
