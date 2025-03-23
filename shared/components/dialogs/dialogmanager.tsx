import { Signal, useSignalEffect } from '@preact/signals';
import { RefObject } from 'preact';
import { useRef } from 'preact/hooks';
import CreateAccountDialog from 'shared/components/dialogs/createaccountdialog';
import LoginDialog from 'shared/components/dialogs/logindialog';
import Dialog from 'shared/enums/dialog';

interface DialogManagerProps {
  signal: Signal<Dialog>;
}

export default function DialogManager({ signal }: DialogManagerProps) {
  const loginDialogRef = useRef<HTMLDialogElement>(null);
  const createAccountDialogRef = useRef<HTMLDialogElement>(null);

  function getRef(dialog: Dialog): RefObject<HTMLDialogElement> | undefined {
    switch (dialog) {
      case Dialog.Login:
        return loginDialogRef;
      case Dialog.CreateAccount:
        return createAccountDialogRef;
      default:
        return undefined;
    }
  }

  useSignalEffect(() => {
    const dialog = getRef(signal.value)?.current;
    if (dialog) {
      dialog.showModal();
      return () => dialog.close();
    }
    return () => {};
  });

  const changeDialog = (newDialog: Dialog) => (signal.value = newDialog);

  // switch (signal.value) {
  //   case Dialog.Login:
  //     return <LoginDialog changeDialog={changeDialog} />;
  //   case Dialog.CreateAccount:
  //     return <CreateAccountDialog />;
  //   default:
  //     return <></>;
  // }
  return (
    <div id="dialogs" class="h-10">
      <LoginDialog dialogRef={loginDialogRef} changeDialog={changeDialog} />
      <CreateAccountDialog dialogRef={createAccountDialogRef} changeDialog={changeDialog} />
    </div>
  );
}
