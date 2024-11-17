import { configureStore } from '@reduxjs/toolkit';
import songDataReducer from './slices/songdata';

const store = configureStore({
  reducer: {
    songData: songDataReducer,
  },
});

export default store;
