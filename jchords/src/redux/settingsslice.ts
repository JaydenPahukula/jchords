import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Settings, { defaultSettings } from 'shared/types/settings';

type SettingsState = {
  value: Settings;
};

const initialState: SettingsState = {
  value: defaultSettings,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    updateSettings: (state: SettingsState, action: PayloadAction<Settings>) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
