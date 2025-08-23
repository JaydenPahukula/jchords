import { User as FirebaseUser } from 'firebase/auth';
import { Link } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { Avatar } from 'src/components/ui/avatar';
import { SignOutIcon } from 'src/components/ui/icons/signouticon';
import { Popover } from 'src/components/ui/popover';
import { logOut } from 'src/functions/auth/logout';

interface UserCircleProps {
  user: FirebaseUser;
}

export function UserCircle(props: UserCircleProps) {
  function signOut() {
    close();
    logOut();
    dispatchGrowl({ description: 'Signed out successfully' });
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="outline-gray-4 aspect-square h-10 w-10 overflow-hidden rounded-full bg-transparent hover:outline-6">
          <Avatar user={props.user} className="h-full w-full" />
        </button>
      </Popover.Trigger>
      <Popover.Content className="max-w-[300px] p-0!">
        {!props.user ? null : (
          <>
            <div className="flex gap-3 overflow-hidden p-4">
              <Avatar user={props.user} className="h-12 w-12" />
              <div className="flex flex-col justify-center overflow-hidden">
                <div className="truncate text-base font-medium">
                  {props.user.displayName ?? props.user.email}
                </div>
                <div className="truncate text-sm">
                  {props.user.email}
                  {props.user.email}
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
