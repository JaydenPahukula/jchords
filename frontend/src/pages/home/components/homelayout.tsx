import { onAuthStateChanged, User } from 'firebase/auth';
import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { LoginDialogTrigger } from 'src/components/dialogs/logindialog/logindialogtrigger';
import { Button } from 'src/components/ui/button';
import { UserCircle } from 'src/components/ui/usercircle';
import { auth } from 'src/firebase/auth';
import { UserContext } from 'src/pages/home/state/usercontext';

export function HomeLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  onAuthStateChanged(auth, setUser);

  onAuthStateChanged(auth, (user) => console.log('user changed:', user));

  return (
    <UserContext.Provider value={user}>
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
              {user ? (
                <UserCircle user={user} />
              ) : (
                <LoginDialogTrigger>
                  <Button variant="primary" className="rounded-full">
                    Log In
                  </Button>
                </LoginDialogTrigger>
              )}
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
  );
}
