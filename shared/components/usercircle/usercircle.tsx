import { User } from 'firebase/auth';
import { ExpandableMenuButton } from 'shared/components/generic/expandablemenubutton';
import { UserIcon } from 'shared/components/icons/usericon';
import { Dialog } from 'shared/enums/dialog';
import { logOut } from 'shared/functions/auth/logout';

function UserCircleMenu() {
  return (
    <div class="text-fg-0 bg-bg-0 relative z-20 overflow-hidden rounded-lg !shadow-lg">
      <p
        onClick={logOut}
        class="hover:bg-bg-button active:bg-bg-button-hover px-10 py-6 text-lg whitespace-nowrap"
      >
        Sign Out
      </p>
    </div>
  );
}

interface UserCircleProps {
  user: User | null;
  showDialog: (dialog: Dialog) => void;
}

export function UserCircle(props: UserCircleProps) {
  const isSignedIn = props.user !== null;

  return isSignedIn ? (
    <ExpandableMenuButton menu={<UserCircleMenu />}>
      <div class="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent">
        <UserIcon />
      </div>
    </ExpandableMenuButton>
  ) : (
    <div
      onClick={() => props.showDialog(Dialog.Login)}
      class="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent"
    >
      <UserIcon />
    </div>
  );
}
