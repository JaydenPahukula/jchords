import { updateProfile } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { dispatchGrowl } from 'src/components/growl/growlprovider';
import { Avatar } from 'src/components/ui/avatar/avatar';
import { Button } from 'src/components/ui/button/button';
import { SignOutIcon } from 'src/components/ui/icons/signouticon';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';
import { TextField } from 'src/components/ui/textfield/textfield';
import { logOut } from 'src/functions/auth/logout';
import { bind } from 'src/functions/util/bind';
import { DeleteAccountButton } from 'src/pages/home/components/accountpage/deleteaccountbutton';
import { VerifyEmailButton } from 'src/pages/home/components/accountpage/verifyemailbutton';
import { UserContext } from 'src/pages/home/state/usercontext';

export function AccountPage() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [displayName, setDisplayName] = useState('');
  const [updateDisplayNameLoading, setUpdateDisplayNameLoading] = useState(false);
  const updateDisplayNameDisabled =
    updateDisplayNameLoading || displayName === '' || displayName === user?.displayName;

  useEffect(() => {
    if (user === null) navigate('/');
    if (user) setDisplayName(user.displayName ?? '');
  }, [user]);

  if (user === null) return null;

  function updateDisplayName() {
    if (updateDisplayNameDisabled || !user) return;
    setUpdateDisplayNameLoading(true);
    updateProfile(user, { displayName: displayName })
      .then(() => {
        dispatchGrowl({ description: 'Updated successfully' });
      })
      .catch(() => {
        dispatchGrowl({ description: 'Failed to update, try again later' });
      })
      .finally(() => {
        setUpdateDisplayNameLoading(false);
      });
  }

  function signOut() {
    logOut();
    navigate('/');
    dispatchGrowl({ description: 'Signed out successfully' });
  }
  return user === undefined ? (
    <LoadingSpinner className="mx-auto my-8 size-10" />
  ) : (
    <div className="card m-2 p-8 sm:p-12">
      <div className="mb-4 flex items-center gap-5">
        <Avatar user={user} className="size-28 rounded-3xl" />
      </div>
      <label className="mb-1 inline-block text-lg" htmlFor="display-name-input">
        Display Name:
      </label>
      <div className="mb-3 flex w-full max-w-sm gap-2">
        <TextField
          xButton
          id="display-name-input"
          value={displayName}
          onInput={bind(setDisplayName)}
          className="w-full"
        />
        <Button
          loading={updateDisplayNameLoading}
          disabled={updateDisplayNameDisabled}
          onClick={updateDisplayName}
        >
          Update
        </Button>
      </div>
      <label className="mb-1 inline-block text-lg" htmlFor="account-page-email-input">
        Email:
      </label>
      <TextField
        id="account-page-email-input"
        readOnly
        value={user.email ?? ''}
        className="mb-2 w-full max-w-sm"
      />
      <VerifyEmailButton user={user} />
      <Button onClick={signOut} variant="danger">
        <SignOutIcon />
        Sign Out
      </Button>
      <div className="border-b-gray-7 my-5 h-0 w-full border-b-1"></div>
      <DeleteAccountButton user={user} />
    </div>
  );
}
