import { Signal } from '@preact/signals-react';
import { User } from 'firebase/auth';
import { Link } from 'react-router';
import { LoginDialog } from 'src/components/dialogs/logindialog';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { SignOutIcon } from 'src/components/icons/signouticon';
import { Avatar } from 'src/components/ui/avatar';
import { Popover } from 'src/components/ui/popover';
import 'src/components/usercircle.css';
import { logOut } from 'src/functions/auth/logout';

interface UserCircleProps {
  user: Signal<User | null | undefined>;
}

export function UserCircle(props: UserCircleProps) {
  const user = props.user.value;

  function signOut() {
    close();
    logOut();
    dispatchGrowl({ description: 'Signed out successfully' });
  }

  const button = (
    <button className="outline-gray-4 aspect-square w-10 overflow-hidden rounded-full bg-transparent hover:outline-6">
      <Avatar user={user} />
    </button>
  );

  return user === undefined ? (
    button
  ) : user === null ? (
    <LoginDialog>{button}</LoginDialog>
  ) : (
    <Popover.Root>
      <Popover.Trigger asChild>{button}</Popover.Trigger>
      <Popover.Content className="max-w-[300px] p-0!">
        {!user ? null : (
          <>
            <div className="flex gap-3 overflow-hidden p-4">
              <Avatar user={user} className="!h-12 !w-12" />
              <div className="flex flex-col justify-center overflow-hidden">
                <div className="truncate text-base font-medium">
                  {user.displayName ?? user.email}
                </div>
                <div className="truncate text-sm">
                  {user.email}
                  {user.email}
                </div>
              </div>
            </div>
            <button className="border-t-gray-6 button-0 w-full border-t-1 p-2" onClick={close}>
              <Link to="/account">Account</Link>
            </button>
            <button className="border-t-gray-6 button-0 w-full border-t-1 p-2" onClick={signOut}>
              <SignOutIcon />
              Sign Out
            </button>
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
