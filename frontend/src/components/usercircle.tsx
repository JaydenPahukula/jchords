import { Signal, useSignal } from '@preact/signals-react';
import { User } from 'firebase/auth';
import { Link } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { SignOutIcon } from 'src/components/icons/signouticon';
import { Avatar } from 'src/components/ui/avatar';
import { Popover } from 'src/components/ui/popover';
import 'src/components/usercircle.css';
import { logOut } from 'src/functions/auth/logout';

interface UserCircleProps {
  user: Signal<User | null | undefined>;
  openLoginDialog: () => void;
  className?: string;
}

export function UserCircle(props: UserCircleProps) {
  const isMenuOpen = useSignal(false);
  const user = props.user.value;

  function onOpenChange(open: boolean) {
    if (open && !props.user.value) {
      props.openLoginDialog();
    } else {
      isMenuOpen.value = open;
    }
  }

  function close() {
    isMenuOpen.value = false;
  }

  function signOut() {
    close();
    logOut();
    dispatchGrowl({ description: 'Signed out successfully' });
  }

  return (
    <Popover.Root open={isMenuOpen.value} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <button
          className={`outline-gray-4 aspect-square overflow-hidden rounded-full bg-transparent hover:outline-6 ${props.className}`}
        >
          <Avatar user={user} />
        </button>
      </Popover.Trigger>
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
