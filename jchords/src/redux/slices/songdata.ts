import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import Key from 'src/types/key';
import SongInfo from 'src/types/songinfo';
import parseKey from 'src/utils/parsekey';

type SongInfoMap = {
  [key: string]: SongInfo;
};

type SongDataState = {
  songsLoading: boolean;
  songsLoaded: boolean;
  songs: SongInfoMap;
  currId: string;
  srcLoading: boolean;
  src: string | undefined;
  defaultKey: Key | undefined;
};

const initialState: SongDataState = {
  songsLoading: true,
  songsLoaded: false,
  songs: {},
  currId: '',
  srcLoading: true,
  src: undefined,
  defaultKey: undefined,
};

export const songDataSlice = createSlice({
  name: 'songData',
  initialState: initialState,
  reducers: {
    setSongsLoading: (state: SongDataState, action: PayloadAction<boolean>) => {
      state.songsLoading = action.payload;
    },
    setSongsLoaded: (state: SongDataState) => {
      state.songsLoaded = true;
    },
    updateSongs: (state: SongDataState, action: PayloadAction<SongInfoMap>) => {
      state.songs = { ...state.songs, ...action.payload };
    },
    setCurrId: (state: SongDataState, action: PayloadAction<string>) => {
      state.currId = action.payload;
    },
    setSrcLoading: (state: SongDataState, action: PayloadAction<boolean>) => {
      state.srcLoading = action.payload;
    },
    setSrc: (state: SongDataState, action: PayloadAction<string | undefined>) => {
      state.src = action.payload;
      state.defaultKey = parseKey(action.payload ?? '');
    },
  },
});

export const { setSongsLoading, setSongsLoaded, updateSongs, setCurrId, setSrcLoading, setSrc } =
  songDataSlice.actions;

const songDataReducer = songDataSlice.reducer;
export default songDataReducer;

export const selectSongData = (state: RootState): SongDataState => state.songData;
export const selectCurrSongInfo = (state: RootState): SongInfo | undefined =>
  state.songData.songs[state.songData.currId];
