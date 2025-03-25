import { Signal, useSignalEffect } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';
import DIALOGS from 'shared/components/dialogs/dialogmanifest';
import Dialog from 'shared/enums/dialog';

interface DialogManagerProps {
  signal: Signal<Dialog>;
}

export default function DialogManager({ signal }: DialogManagerProps) {
  // create refs and listeners for each dialog
  const dialogs = DIALOGS.map((entry) => {
    return {
      ...entry,
      ref: useRef<HTMLDialogElement>(null),
      /** Checks and updates the signal if the dialog was closed another way, i.e. with `.close()` */
      listener: () => {
        if (signal.value === entry.type) signal.value = Dialog.None;
      },
    };
  });

  useEffect(() => {
    // add onClose event listeners
    dialogs.forEach(({ ref, listener }) => {
      ref.current?.addEventListener('close', listener);
      ref.current?.addEventListener('cancel', listener);
    });
    // cleanup
    return () =>
      dialogs.forEach(({ ref, listener }) => {
        ref.current?.removeEventListener('close', listener);
        ref.current?.removeEventListener('cancel', listener);
      });
  });

  useSignalEffect(() => {
    const dialog = dialogs.find(({ type }) => type === signal.value)?.ref?.current;
    dialog?.showModal();
    return () => dialog?.close();
  });

  return (
    <div id="dialogs">
      {dialogs.map(({ component, ref }) => {
        return component({
          dialogRef: ref,
          changeDialog: (newDialog: Dialog) => (signal.value = newDialog),
        });
      })}
    </div>
  );
}
