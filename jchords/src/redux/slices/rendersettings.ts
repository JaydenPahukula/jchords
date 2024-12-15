import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';
import cmRenderSettings from 'src/types/cmrendersettings';
import { cmAccidental } from 'src/types/cmsong';

type RenderSettingsState = {
  settings: cmRenderSettings;
};

const initialState: RenderSettingsState = {
  settings: {
    accidentalsType: cmAccidental.flat,
    transposeValue: 0,
  },
};

export const renderSettingsSlice = createSlice({
  name: 'renderSettings',
  initialState: initialState,
  reducers: {
    updateRenderSettings: (
      state: RenderSettingsState,
      action: PayloadAction<Partial<cmRenderSettings>>,
    ) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { updateRenderSettings } = renderSettingsSlice.actions;

const renderSettingsReducer = renderSettingsSlice.reducer;
export default renderSettingsReducer;

export const selectRenderSettings = (state: RootState): RenderSettingsState => state.renderSettings;
