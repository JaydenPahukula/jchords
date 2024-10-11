import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsslice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
