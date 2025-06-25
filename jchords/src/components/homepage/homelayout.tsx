import { useSignal } from '@preact/signals-react';
import { Container, Flex, Grid, Heading } from '@radix-ui/themes';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link, Outlet } from 'react-router';
import { CreateAccountDialog } from 'shared/components/dialogs/createaccountdialog';
import { DialogManager } from 'shared/components/dialogs/dialogmanager';
import { LoginDialog } from 'shared/components/dialogs/logindialog';
import { UserCircle } from 'shared/components/usercircle/usercircle';
import { DialogType } from 'shared/enums/dialogtype';
import { auth } from 'shared/firebase/auth';
import { DialogManifest } from 'shared/types/dialog/dialogmanifest';
import { DialogContext } from 'src/state/dialogcontext';

const dialogManifest: DialogManifest = [
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
];

export function HomeLayout() {
  const dialogSignal = useSignal<DialogType>(DialogType.None);

  const userSignal = useSignal<User | null>(null);
  onAuthStateChanged(auth, (user) => {
    console.log('user changed:', user);
    userSignal.value = user;
  });

  return (
    <>
      <DialogManager signal={dialogSignal} manifest={dialogManifest} />
      <DialogContext.Provider value={dialogSignal}>
        <Grid id="home-page" rows="min-content 1fr" height="100lvh">
          <Container
            size="3"
            id="header"
            height="68px"
            style={{ zIndex: '1', boxShadow: 'var(--shadow-4)' }}
          >
            <Flex height="100%" align="center" justify="between">
              <Link to="/" style={{ color: 'var(--gray-12)', textDecorationLine: 'none' }}>
                <Heading size="7">JChords</Heading>
              </Link>
              <UserCircle
                user={auth.currentUser}
                showDialog={() => (dialogSignal.value = DialogType.Login)}
                width="52px"
              />
            </Flex>
          </Container>
          <Container size="2" style={{ background: 'var(--gray-2)' }} overflowY="auto">
            <Outlet />
          </Container>
        </Grid>
      </DialogContext.Provider>
    </>
  );
}
