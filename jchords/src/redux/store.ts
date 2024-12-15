import { configureStore } from '@reduxjs/toolkit';
import renderSettingsReducer from './slices/rendersettings';
import songDataReducer from './slices/songdata';

const store = configureStore({
  reducer: {
    songData: songDataReducer,
    renderSettings: renderSettingsReducer,
  },
});

export default store;
