import { configureStore } from '@reduxjs/toolkit';
import chartSettingsReducer from './slices/settings';
import songDataReducer from './slices/songdata';

const store = configureStore({
  reducer: {
    songData: songDataReducer,
    chartSettings: chartSettingsReducer,
  },
});

export default store;
