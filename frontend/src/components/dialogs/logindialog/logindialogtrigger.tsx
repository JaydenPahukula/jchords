import { useEffect, useRef, useState } from 'react';
import { LoginDialogCreateAccountForm } from 'src/components/dialogs/logindialog/logindialogcreateaccountformprops';
import { LoginDialogLoginContent } from 'src/components/dialogs/logindialog/logindialoglogincontent';
import { Dialog } from 'src/components/ui/dialog/dialog';
import { DialogProps } from 'src/types/dialog/dialogprops';

export function LoginDialogTrigger({ children }: DialogProps) {
  const loginContent = useRef<HTMLDivElement>(null);
  const createAccountContent = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [height, setHeight] = useState<number | string>('auto');

  // height needs to be calculated manually so it animates
  function recalcHeight(overrideLogin?: boolean) {
    const h =
      (overrideLogin ?? login) // override
        ? loginContent.current?.clientHeight
        : createAccountContent.current?.clientHeight;
    if (h) setHeight(h);
  }

  useEffect(recalcHeight, [login]);

  useEffect(() => {
    if (!open) {
      setLogin(true);
      recalcHeight(true);
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <div
          style={{ height: height }}
          className="grid transition-[height] duration-300 ease-in-out"
        >
          <div
            ref={loginContent}
            aria-hidden={!login}
            inert={!login}
            className={
              'col-start-1 row-start-1 h-min transition-transform duration-300 ease-in-out' +
              (!login && ' -translate-x-[130%]')
            }
          >
            <LoginDialogLoginContent
              disabled={!login}
              close={() => setOpen(false)}
              switchToCreateAccount={() => setLogin(false)}
              recalcHeight={recalcHeight}
            />
          </div>
          <div
            ref={createAccountContent}
            aria-hidden={login}
            inert={login}
            className={
              'col-start-1 row-start-1 h-min transition-transform duration-300 ease-in-out' +
              (login && ' translate-x-[130%]')
            }
          >
            <LoginDialogCreateAccountForm
              disabled={login}
              close={() => setOpen(false)}
              back={() => setLogin(true)}
              recalcHeight={recalcHeight}
            />
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
