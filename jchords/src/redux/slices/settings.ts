import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {};

const initialState: SettingsState = {};

export const settingsSlice = createSlice({
  name: 'dialog',
  initialState: initialState,
  reducers: {},
});

export const {} = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
