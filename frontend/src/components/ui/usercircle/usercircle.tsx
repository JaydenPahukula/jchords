import { User as FirebaseUser } from 'firebase/auth';
import { useState } from 'react';
import { LoginDialogTrigger } from 'src/components/dialogs/logindialog/logindialogtrigger';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { Avatar } from 'src/components/ui/avatar/avatar';
import { Button } from 'src/components/ui/button/button';
import { SignOutIcon } from 'src/components/ui/icons/signouticon';
import { Popover } from 'src/components/ui/popover/popover';
import { logOut } from 'src/functions/auth/logout';

interface UserCircleProps {
  user: FirebaseUser | null;
}

export function UserCircle(props: UserCircleProps) {
  const [open, setOpen] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);

  async function signOut() {
    setSignOutLoading(true);
    logOut().then(() => {
      setSignOutLoading(false);
      setOpen(false);
      dispatchGrowl({ description: 'Signed out successfully' });
    });
  }

  return props.user === null ? (
    <LoginDialogTrigger>
      <Button variant="primary" className="rounded-full">
        Log In
      </Button>
    </LoginDialogTrigger>
  ) : (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="outline-gray-4 aspect-square size-10 overflow-hidden rounded-full bg-transparent hover:outline-6">
          <Avatar user={props.user} className="size-full" />
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className="max-w-[300px] min-w-[240px] p-0">
        <div className="flex gap-3 overflow-hidden p-4">
          <Avatar user={props.user} className="size-12" />
          <div className="flex flex-col justify-center overflow-hidden">
            <div className="truncate text-base font-medium">{props.user.displayName}</div>
            <div className="truncate text-sm">{props.user.email}</div>
          </div>
        </div>
        <Button
          asLink
          to="/account"
          variant="subtle"
          className="border-t-gray-6 w-full rounded-none border-t-1"
          onClick={() => setOpen(false)}
        >
          Account
        </Button>
        <Button
          variant="subtle"
          className="border-t-gray-6 w-full rounded-none border-t-1"
          onClick={signOut}
          loading={signOutLoading}
        >
          <SignOutIcon />
          Sign Out
        </Button>
      </Popover.Content>
    </Popover.Root>
  );
}
