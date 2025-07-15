import { useSignal, useSignalEffect } from '@preact/signals-react';
import { Container, Flex, Grid, Heading } from '@radix-ui/themes';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link, Outlet } from 'react-router';
import { CreateAccountDialog } from 'src/components/dialogs/createaccountdialog';
import { DialogManager } from 'src/components/dialogs/dialogmanager';
import { LoginDialog } from 'src/components/dialogs/logindialog';
import { UserCircle } from 'src/components/usercircle';
import { DialogType } from 'src/enums/dialogtype';
import { auth } from 'src/firebase/auth';
import { DialogContext } from 'src/pages/home/state/dialog';
import { UserContext } from 'src/pages/home/state/user';
import { DialogManifest } from 'src/types/dialog/dialogmanifest';

const dialogManifest: DialogManifest = [
  { type: DialogType.Login, component: LoginDialog },
  { type: DialogType.CreateAccount, component: CreateAccountDialog },
];

export function HomeLayout() {
  const dialogSignal = useSignal<DialogType>(DialogType.None);

  const userSignal = useSignal<User | null | undefined>(undefined);
  onAuthStateChanged(auth, (user) => {
    userSignal.value = user;
  });
  useSignalEffect(() => {
    console.log('user changed:', userSignal.value);
  });

  return (
    <>
      <DialogManager signal={dialogSignal} manifest={dialogManifest} />
      <DialogContext.Provider value={dialogSignal}>
        <UserContext.Provider value={userSignal}>
          <Grid id="home-page" rows="min-content 1fr" height="100lvh">
            <Container
              size="3"
              id="header"
              height={{ initial: '58px', sm: '68px' }}
              style={{ zIndex: '1', boxShadow: 'var(--shadow-4)' }}
            >
              <Flex height="100%" align="center" justify="between">
                <Link to="/" style={{ color: 'var(--gray-12)', textDecorationLine: 'none' }}>
                  <Heading size={{ initial: '6', sm: '7' }} mx="4">
                    JChords
                  </Heading>
                </Link>
                <UserCircle
                  user={userSignal.value ?? null}
                  openLoginDialog={() => (dialogSignal.value = DialogType.Login)}
                  width="52px"
                />
              </Flex>
            </Container>
            <Container
              size="2"
              py="5"
              px="2"
              style={{ background: 'var(--gray-3)' }}
              overflowY="auto"
            >
              <Outlet />
            </Container>
          </Grid>
        </UserContext.Provider>
      </DialogContext.Provider>
    </>
  );
}
