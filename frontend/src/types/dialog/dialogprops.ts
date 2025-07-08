import { ReadonlySignal } from '@preact/signals-react';
import { DialogType } from 'src/enums/dialogtype';

export interface DialogProps {
  type: DialogType;
  open: ReadonlySignal<boolean>;
  close: () => void;
  changeDialog: (dialog: DialogType) => void;
}
