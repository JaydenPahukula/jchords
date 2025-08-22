import { useRef, useState } from 'react';
import { LoginDialogCreateAccountForm } from 'src/components/dialogs/logindialog/logindialogcreateaccountformprops';
import { LoginDialogLoginContent } from 'src/components/dialogs/logindialog/logindialoglogincontent';
import { Dialog } from 'src/components/ui/dialog';
import { DialogProps } from 'src/types/dialog/dialogprops';

// ------------------------------------------
// TODO: FIX FOCUS/ARIA ISSUES WHEN SWITCHING
// ------------------------------------------

export function LoginDialogTrigger({ children }: DialogProps) {
  const loginContent = useRef<HTMLDivElement>(null);
  const createAccountContent = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <div
          className="grid transition-[height] duration-300 ease-in-out"
          style={{
            height: login
              ? loginContent.current?.clientHeight
              : createAccountContent.current?.clientHeight,
          }}
        >
          <div
            ref={loginContent}
            aria-hidden={!login}
            inert={!login}
            className={`col-start-1 row-start-1 h-min transition-transform duration-300 ${!login ? '-translate-x-[130%]' : ''}`}
          >
            <LoginDialogLoginContent
              disabled={!login}
              close={() => setOpen(false)}
              switchToCreateAccount={() => setLogin(false)}
            />
          </div>
          <div
            ref={createAccountContent}
            aria-hidden={login}
            inert={login}
            className={`col-start-1 row-start-1 h-min transition-transform duration-300 ${login ? 'translate-x-[130%]' : ''}`}
          >
            <LoginDialogCreateAccountForm
              disabled={login}
              close={() => setOpen(false)}
              back={() => setLogin(true)}
            />
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
