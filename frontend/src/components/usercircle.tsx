import { Signal, useSignal } from '@preact/signals-react';
import { Box, Button, Flex, IconButton, Inset, Popover, Text } from '@radix-ui/themes';
import { User } from 'firebase/auth';
import { Link } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { SignOutIcon } from 'src/components/icons/signouticon';
import { UserIcon } from 'src/components/icons/usericon';
import { UserAvatar } from 'src/components/useravatar';
import 'src/components/usercircle.css';
import { logOut } from 'src/functions/auth/logout';

interface UserCircleProps {
  user: Signal<User | null | undefined>;
  openLoginDialog: () => void;
  width?: string;
}

export function UserCircle(props: UserCircleProps) {
  const isMenuOpen = useSignal(false);
  const user = props.user.value;

  function onOpenChange(open: boolean) {
    if (open && !props.user) {
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
              {user ? (
                <UserAvatar height="100%" width="100%" user={user} />
              ) : (
                <UserIcon color="var(--gray-12)" height="100%" width="100%" />
              )}
            </IconButton>
          </Box>
        </Popover.Trigger>
      </Box>
      <Popover.Content maxWidth="300px" minWidth="250px">
        {!user ? null : (
          <>
            <Flex overflow="hidden" gap="3">
              <UserAvatar size="4" user={user} />
              <Flex
                direction="column"
                justify="center"
                overflow="hidden"
                pb="var(--popover-content-padding)"
              >
                <Text truncate size="3" weight="medium">
                  {user.displayName ?? user.email}
                </Text>
                <Text truncate size="2" weight="regular">
                  {user.email}
                </Text>
              </Flex>
            </Flex>
            <Inset side="bottom">
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
            </Inset>
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}
