import { useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Text } from '@radix-ui/themes';
import { updateProfile } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { Avatar } from 'src/components/ui/avatar';
import { SignOutIcon } from 'src/components/ui/icons/signouticon';
import LoadingSpinner from 'src/components/ui/loadingspinner';
import { TextField } from 'src/components/ui/textfield';
import { logOut } from 'src/functions/auth/logout';
import { DeleteAccountButton } from 'src/pages/home/components/accountpage/deleteaccountbutton';
import { VerifyEmailButton } from 'src/pages/home/components/accountpage/verifyemailbutton';
import { UserContext } from 'src/pages/home/state/usercontext';

export function AccountPage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

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
    <LoadingSpinner className="mx-auto my-8 w-12" />
  ) : (
    <div className="card p-8 sm:p-12">
      <div className="mb-4 flex items-center gap-5">
        <Avatar user={user} className="!w-28" />
      </div>
      <div className="max-w-[400px]">
        <label className="mb-1 font-medium" htmlFor="display-name-input">
          Display Name:
        </label>
        <div className="mb-3 flex gap-2">
          <TextField
            xButton
            id="display-name-input"
            value={displayName.value}
            onInput={(e) => (displayName.value = e.currentTarget.value)}
          />
          <Button
            loading={updateDisplayNameLoading.value}
            disabled={updateDisplayNameDisabled.value}
            onClick={updateDisplayName}
          >
            Update
          </Button>
        </div>
        <Text as="label" htmlFor="account-page-email-input" weight="medium">
          Email:
        </Text>
        <TextField id="account-page-email-input" disabled value={user.email ?? ''} />
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
      </div>
    </div>
  );
}
