import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/types';

type ChartSettings = {};

const initialState: ChartSettings = {};

export const chartSettingsSlice = createSlice({
  name: 'chartSettings',
  initialState: initialState,
  reducers: {
    setSongsLoading: (state: ChartSettings, action: PayloadAction<boolean>) => {
      // state.songsLoading = action.payload;
    },
  },
});

export const { setSongsLoading } = chartSettingsSlice.actions;

const chartSettingsReducer = chartSettingsSlice.reducer;
export default chartSettingsReducer;

export const selectChartSettings = (state: RootState): ChartSettings => state.chartSettings;
