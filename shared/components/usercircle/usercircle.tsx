import { useSignal } from '@preact-signals/safe-react';
import { Box, Button, IconButton, Popover } from '@radix-ui/themes';
import { User } from 'firebase/auth';
import { growlManager } from 'shared/classes/growlmanager';
import { UserIcon } from 'shared/components/icons/usericon';
import { DialogType } from 'shared/enums/dialogtype';
import { logOut } from 'shared/functions/auth/logout';

interface UserCircleProps {
  user: User | null;
  showDialog: (dialog: DialogType) => void;
}

export function UserCircle(props: UserCircleProps) {
  const isMenuOpen = useSignal(false);

  function onOpenChange(open: boolean) {
    if (open && props.user === null) {
      props.showDialog(DialogType.Login);
    } else {
      isMenuOpen.value = open;
    }
  }

  function signOut() {
    isMenuOpen.value = false;
    logOut();
    growlManager.dispatchGrowl({ description: 'Signed out successfully' });
  }

  return (
    <Popover.Root open={isMenuOpen.value} onOpenChange={onOpenChange}>
      <Box flexShrink="0" mr="1" width="48px" height="48px" p="6px">
        <Popover.Trigger className="asdfasdf">
          <Box width="100%" height="100%" asChild>
            <IconButton radius="full" className="user-circle-button">
              <UserIcon color="var(--gray-12)" height="100%" width="100%" />
            </IconButton>
          </Box>
        </Popover.Trigger>
      </Box>
      <Popover.Content>
        <Button onClick={signOut}>Sign Out</Button>
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
