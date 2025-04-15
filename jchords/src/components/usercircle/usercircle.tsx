import { useContext } from 'preact/hooks';
import logOut from 'shared/auth/logout';
import ExpandableMenuButton from 'shared/components/generic/expandablemenubutton';
import UserIcon from 'shared/components/icons/usericon';
import Dialog from 'shared/enums/dialog';
import showDialog from 'src/state/functions/showdialog';
import StateContext from 'src/state/statecontext';

function UserCircleMenu() {
  return (
    <div class="text-fg-0 bg-bg-0 z-[2] overflow-hidden rounded-lg !shadow-lg">
      <p
        onClick={logOut}
        class="hover:bg-bg-button active:bg-bg-button-hover px-10 py-6 text-lg whitespace-nowrap"
      >
        Sign Out
      </p>
    </div>
  );
}
export default function UserCircle() {
  const { user } = useContext(StateContext);

  const isSignedIn = user.value !== null;

  return isSignedIn ? (
    <ExpandableMenuButton menu={<UserCircleMenu />}>
      <div class="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent">
        <UserIcon />
      </div>
    </ExpandableMenuButton>
  ) : (
    <div
      onClick={() => showDialog(Dialog.Login)}
      class="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent"
    >
      <UserIcon />
    </div>
  );
}
