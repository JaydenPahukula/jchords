import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DialogState = {
  isSongPickerDialogOpen: boolean;
  isImportDialogOpen: boolean;
};

const initialState: DialogState = {
  isSongPickerDialogOpen: false,
  isImportDialogOpen: false,
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
    openImportDialog: (state: DialogState, action: PayloadAction<void>) => {
      state.isImportDialogOpen = true;
    },
    closeImportDialog: (state: DialogState, action: PayloadAction<void>) => {
      state.isImportDialogOpen = false;
    },
    closeAllDialogs: (state: DialogState, action: PayloadAction<void>): DialogState => {
      return initialState;
    },
  },
});

export const {
  openSongPickerDialog,
  closeSongPickerDialog,
  openImportDialog,
  closeImportDialog,
  closeAllDialogs,
} = dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
