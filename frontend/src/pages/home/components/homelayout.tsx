import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { auth } from 'src/firebase/auth';
import { HomeHeader } from 'src/pages/home/components/homeheader';
import { UserContext } from 'src/pages/home/state/usercontext';

export function HomeLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  onAuthStateChanged(auth, setUser);

  useEffect(() => {
    console.log('user changed:', user);
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <div className="bg-gray-3 grid h-dvh grid-rows-[min-content_1fr]">
        <HomeHeader />
        <div className="flex w-full justify-center overflow-y-auto">
          <div className="w-full max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
