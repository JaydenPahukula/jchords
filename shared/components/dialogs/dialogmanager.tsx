import { computed, Signal, useSignalEffect } from '@preact/signals-react';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogManifest } from 'shared/types/dialog/dialogmanifest';

interface DialogManagerProps {
  signal: Signal<DialogType>;
  manifest: DialogManifest;
}

export function DialogManager({ signal, manifest }: DialogManagerProps) {
  // create refs and listeners for each dialog
  // const dialogs = manifest.map((entry) => {
  //   return {
  //     ...entry,
  //     ref: useRef<HTMLDialogElement>(null),
  //     /** Checks and updates the signal if the dialog was closed another way, i.e. with `.close()` */
  //     closeListener: () => {
  //       if (signal.value === entry.type) signal.value = DialogType.None;
  //     },
  //   };
  // });

  // useEffect(() => {
  //   // add onClose event listeners
  //   dialogs.forEach(({ ref, closeListener }) => {
  //     ref.current?.addEventListener('close', closeListener);
  //     ref.current?.addEventListener('cancel', closeListener);
  //   });
  //   // cleanup
  //   return () =>
  //     dialogs.forEach(({ ref, closeListener }) => {
  //       ref.current?.removeEventListener('close', closeListener);
  //       ref.current?.removeEventListener('cancel', closeListener);
  //     });
  // });

  // useSignalEffect(() => {
  //   const dialog = dialogs.find(({ type }) => type === signal.value)?.ref?.current;
  //   dialog?.showModal();
  //   return () => dialog?.close();
  // });

  useSignalEffect(() => {
    if (signal.value !== DialogType.None) {
      (document.activeElement as HTMLElement)?.blur();
    }
  });

  return (
    <>
      {manifest.map(({ type, component }) =>
        component({
          type: type,
          open: computed(() => signal.value === type),
          close: () => (signal.value = DialogType.None),
          changeDialog: (dialog: DialogType) => (signal.value = dialog),
        }),
      )}
    </>
  );
}
