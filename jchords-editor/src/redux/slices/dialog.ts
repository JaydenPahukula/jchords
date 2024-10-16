import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DialogState = {
  isSongPickerDialogOpen: boolean;
};

const initialState: DialogState = {
  isSongPickerDialogOpen: false,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialState,
  reducers: {
    openSongPickerDialog: (state: DialogState, action: PayloadAction<void>) => {
      state.isSongPickerDialogOpen = true;
    },
    closeSongPickerDialog: (state: DialogState, action: PayloadAction<void>) => {
      state.isSongPickerDialogOpen = false;
    },
    closeAllDialogs: (state: DialogState, action: PayloadAction<void>) => {
      return initialState;
    },
  },
});

export const { openSongPickerDialog, closeSongPickerDialog, closeAllDialogs } = dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
