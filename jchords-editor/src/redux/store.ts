import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialog';
import songDataReducer from './slices/songdata';

const store = configureStore({
  reducer: {
    songData: songDataReducer,
    dialog: dialogReducer,
  },
});

export default store;
