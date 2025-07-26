import { useSignal, useSignalEffect } from '@preact/signals-react';
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
          <div id="home-page" className="grid h-dvh grid-rows-[min-content_1fr]">
            <div
              id="header"
              className="bg-gray-1 z-10 flex h-15 w-full justify-center shadow-md sm:h-17"
            >
              <div id="header-content" className="w-full max-w-[900px]">
                <div className="flex h-full items-center justify-between px-2">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Link to="/">
                      <h1 className="mx-2 text-2xl font-bold sm:text-3xl">JChords</h1>
                    </Link>
                    <Link to="/editor" className="mx-2 text-base">
                      Editor
                    </Link>
                  </div>
                  <UserCircle
                    user={userSignal}
                    openLoginDialog={() => (dialogSignal.value = DialogType.Login)}
                    className="w-10"
                  />
                </div>
              </div>
            </div>
            <div className="bg-home-bg flex justify-center overflow-y-auto px-2 py-5">
              <div className="w-full max-w-[700px]">
                <Outlet />
              </div>
            </div>
          </div>
        </UserContext.Provider>
      </DialogContext.Provider>
    </>
  );
}
