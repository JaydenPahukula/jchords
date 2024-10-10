import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cmRenderOptions from 'shared/chordmark/renderoptions';

export type RenderOptionsState = Partial<cmRenderOptions>;

const initialState: RenderOptionsState = {};

export const renderOptionsSlice = createSlice({
  name: 'renderOptions',
  initialState: initialState,
  reducers: {
    updateRenderOptions: (state: RenderOptionsState, action: PayloadAction<RenderOptionsState>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { updateRenderOptions } = renderOptionsSlice.actions;

const renderOptionsReducer = renderOptionsSlice.reducer;

export default renderOptionsReducer;
