import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { closeAllDialogs } from 'src/redux/slices/dialog';
import './dialog.css';
import SongPickerModal from './songpicker/songpickerdialog';

export default function DialogHandler(): ReactElement {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.dialog);

  const isAnyDialogOpen = Object.values(state).includes(true);

  // add event listener to close dialogs when clicked outside
  useEffect(() => {
    if (isAnyDialogOpen) {
      const handler = (e: MouseEvent) => {
        if (e.target === document.getElementById('dialog-background')) dispatch(closeAllDialogs());
      };
      const ref = document.getElementById('dialog-background');
      ref?.addEventListener('click', handler);
      return () => ref?.removeEventListener('click', handler);
    }
  });

  return isAnyDialogOpen ? (
    <div id="dialog-background">{state.isSongPickerDialogOpen ? <SongPickerModal /> : <></>}</div>
  ) : (
    <></>
  );
}
