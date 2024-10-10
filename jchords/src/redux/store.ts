import { configureStore } from '@reduxjs/toolkit';
import renderOptionsReducer from './renderoptionsslice';

const store = configureStore({
  reducer: {
    renderOptions: renderOptionsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
