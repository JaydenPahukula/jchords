import UserIcon from 'shared/components/icons/usericon';
import Dialog from 'shared/enums/dialog';
import ExpandableMenuButton from 'src/components/expandablemenubutton/expandablemenubutton';
import showDialog from 'src/state/functions/showdialog';

function UserCircleMenu({ isSignedIn }: { isSignedIn: boolean }) {
  return isSignedIn ? (
    <>test</>
  ) : (
    <div
      onClick={() => showDialog(Dialog.Login)}
      class="text-fg-0 bg-bg-0 z-[2] overflow-hidden rounded-lg !shadow-lg"
    >
      <p class="hover:bg-bg-button active:bg-bg-button-hover px-10 py-6 text-lg whitespace-nowrap">
        Sign In
      </p>
    </div>
  );
}

export default function UserCircle() {
  return (
    <ExpandableMenuButton menu={<UserCircleMenu isSignedIn={false} />}>
      <div class="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent">
        <UserIcon />
      </div>
    </ExpandableMenuButton>
  );
}
