import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Settings, { defaultSettings } from 'shared/types/settings';
import calcAccidentalsType from 'shared/utils/accidentalstype';

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
    updateSettings: (state: SettingsState, action: PayloadAction<Partial<Settings>>) => {
      // automatically set the accidentals type if changing keys while not overriding
      if (!state.value.overrideAccidentals && state.value.key !== action.payload.key) {
        action.payload.accidentalsType = calcAccidentalsType(action.payload.key);
      }
      // automatically reset to default the accidentals type if turning off override
      if (
        state.value.overrideAccidentals === true &&
        action.payload.overrideAccidentals === false
      ) {
        action.payload.accidentalsType = calcAccidentalsType(state.value.key);
      }
      // update values
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;

export default settingsReducer;
