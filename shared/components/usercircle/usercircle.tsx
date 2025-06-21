import { signal } from '@preact/signals';
import { Box, IconButton, Popover } from '@radix-ui/themes';
import { User } from 'firebase/auth';
import { UserIcon } from 'shared/components/icons/usericon';
import { DialogType } from 'shared/enums/dialogtype';
import { logOut } from 'shared/functions/auth/logout';

function UserCircleMenu() {
  return (
    <div className="text-fg-0 bg-bg-0 relative z-20 overflow-hidden rounded-lg !shadow-lg">
      <p
        onClick={logOut}
        className="hover:bg-bg-button active:bg-bg-button-hover px-10 py-6 text-lg whitespace-nowrap"
      >
        Sign Out
      </p>
    </div>
  );
}

interface UserCircleProps {
  user: User | null;
  showDialog: (dialog: DialogType) => void;
}

export function UserCircle(props: UserCircleProps) {
  const isMenuOpen = signal(false);
  const isSignedIn = props.user !== null;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Box p="6px" width="100%" height="100%">
          <Box width="100%" height="100%" asChild>
            <IconButton radius="full" className="user-circle-button">
              <UserIcon color="var(--gray-12)" height="100%" width="100%" />
            </IconButton>
          </Box>
        </Box>
      </Popover.Trigger>
      <Popover.Content>
        <UserCircleMenu />
      </Popover.Content>
    </Popover.Root>
  );
  // return isSignedIn ? (
  //   <ExpandableMenuButton menu={<UserCircleMenu />}>
  //     <div className="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent">
  //       <UserIcon />
  //     </div>
  //   </ExpandableMenuButton>
  // ) : (
  //   <div
  //     onClick={() => props.showDialog(DialogType.Login)}
  //     className="hover:outline-bg-button-hover active:outline-bg-button-active bg-bg-button cursor-pointer rounded-full outline-[6px] outline-transparent"
  //   >
  //     <UserIcon />
  //   </div>
  // );
}
