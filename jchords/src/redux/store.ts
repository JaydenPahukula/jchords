import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settings';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export default store;
