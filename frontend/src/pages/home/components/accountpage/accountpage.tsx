import { useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Card, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import { updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { SignOutIcon } from 'src/components/icons/signouticon';
import { TextFieldWithX } from 'src/components/textfieldwithx';
import { UserAvatar } from 'src/components/useravatar';
import { logOut } from 'src/functions/auth/logout';
import { DeleteAccountButton } from 'src/pages/home/components/accountpage/deleteaccountbutton';
import { VerifyEmailButton } from 'src/pages/home/components/accountpage/verifyemailbutton';
import { useUserContext } from 'src/pages/home/state/user';

export function AccountPage() {
  const navigate = useNavigate();
  const user = useUserContext().value;

  const displayName = useSignal(user?.displayName ?? '');
  const updateDisplayNameLoading = useSignal(false);
  const updateDisplayNameDisabled = useComputed(
    () =>
      updateDisplayNameLoading.value ||
      displayName.value === '' ||
      displayName.value === user?.displayName,
  );

  useEffect(() => {
    if (user === null) navigate('/');
    if (user) displayName.value = user.displayName ?? '';
  }, [user]);

  if (user === null) return null;

  function updateDisplayName() {
    if (updateDisplayNameDisabled.value || !user) return;
    updateDisplayNameLoading.value = true;
    updateProfile(user, { displayName: displayName.value })
      .then(() => {
        updateDisplayNameLoading.value = false;
        dispatchGrowl({ description: 'Updated successfully' });
      })
      .catch(() => {
        updateDisplayNameLoading.value = false;
        dispatchGrowl({ description: 'Failed to update, try again later' });
      });
  }

  function signOut() {
    logOut();
    navigate('/');
    dispatchGrowl({ description: 'Signed out successfully' });
  }

  return user === undefined ? (
    <Spinner mx="auto" my="6" size="3" />
  ) : (
    <Card size={{ initial: '4', xs: '5' }}>
      <Flex align="center" gap="5" mb="4">
        <UserAvatar size="7" user={user} />
      </Flex>
      <Box maxWidth="400px">
        <Text as="label" htmlFor="display-name-input" weight="medium">
          Display Name:
        </Text>
        <Flex mt="1" mb="3" gap="2">
          <Box flexGrow="1">
            <TextFieldWithX
              id="display-name-input"
              value={displayName.value}
              onInput={(e) => (displayName.value = e.currentTarget.value)}
            />
          </Box>
          <Button
            loading={updateDisplayNameLoading.value}
            disabled={updateDisplayNameDisabled.value}
            onClick={updateDisplayName}
          >
            Update
          </Button>
        </Flex>
        <Text as="label" htmlFor="account-page-email-input" weight="medium">
          Email:
        </Text>
        <TextField.Root
          id="account-page-email-input"
          mt="1"
          mb="2"
          disabled
          value={user.email ?? ''}
        />
        <VerifyEmailButton user={user} />
        <Box mt="6">
          <Button onClick={signOut} color="red" variant="soft">
            <SignOutIcon />
            Sign Out
          </Button>
        </Box>
        <Box mt="2">
          <DeleteAccountButton user={user} />
        </Box>
      </Box>
    </Card>
  );
}
