import { useSignal } from '@preact/signals-react';
import { Box, Button, Flex, IconButton, Popover, Text } from '@radix-ui/themes';
import { User } from 'firebase/auth';
import { Link } from 'react-router';
import { logOut } from 'shared/functions/auth/logout';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { SignOutIcon } from 'src/components/icons/signouticon';
import { UserIcon } from 'src/components/icons/usericon';
import { UserAvatar } from 'src/components/useravatar';
import 'src/components/usercircle.css';

interface UserCircleProps {
  user: User | null;
  openLoginDialog: () => void;
  width?: string;
}

export function UserCircle(props: UserCircleProps) {
  const isMenuOpen = useSignal(false);

  function onOpenChange(open: boolean) {
    if (open && props.user === null) {
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
      <Box flexShrink="0" mr="1" width={props.width} height={props.width} p="6px">
        <Popover.Trigger>
          <Box width="100%" height="100%" overflow="hidden" asChild>
            <IconButton radius="full" className="user-circle-button">
              {props.user ? (
                <UserAvatar height="100%" width="100%" user={props.user} />
              ) : (
                <UserIcon color="var(--gray-12)" height="100%" width="100%" />
              )}
            </IconButton>
          </Box>
        </Popover.Trigger>
      </Box>
      <Popover.Content maxWidth="300px" minWidth="250px" asChild>
        {props.user === null ? null : (
          <Box p="0" overflow="hidden">
            <Flex overflow="hidden" p="var(--popover-content-padding)" gap="3">
              <UserAvatar size="4" user={props.user} />
              <Flex direction="column" justify="center" overflow="hidden">
                <Text truncate size="3" weight="medium">
                  {props.user.displayName ?? props.user.email}
                </Text>
                <Text truncate size="2" weight="regular">
                  {props.user.email}
                </Text>
              </Flex>
            </Flex>
            <Box width="100%" asChild p="2">
              <Button
                radius="none"
                variant="ghost"
                size="3"
                onClick={close}
                style={{
                  color: 'var(--gray-12)',
                  borderTop: 'var(--border)',
                  margin: '0',
                  boxSizing: 'border-box',
                }}
                asChild
              >
                <Link to="/account">Account</Link>
              </Button>
            </Box>
            <Box width="100%" asChild p="2">
              <Button
                radius="none"
                variant="ghost"
                size="3"
                onClick={signOut}
                style={{
                  color: 'var(--gray-12)',
                  borderTop: 'var(--border)',
                  margin: '0',
                  boxSizing: 'border-box',
                }}
              >
                <SignOutIcon />
                Sign Out
              </Button>
            </Box>
          </Box>
        )}
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
