import { useContext } from 'react';
import { Link } from 'react-router';
import { UserCircle } from 'src/components/ui/usercircle/usercircle';
import { UserContext } from 'src/pages/home/state/usercontext';

export function HomeHeader() {
  const user = useContext(UserContext);

  return (
    <div className="bg-gray-1 border-b-gray-6 flex h-15 w-full justify-center border-b-1 sm:h-17">
      <div
        id="header-content"
        className="flex size-full max-w-[900px] items-center justify-between gap-2 px-2 sm:gap-4 sm:px-3"
      >
        <Link to="/">
          <h1 className="mx-2 text-2xl font-bold sm:text-3xl">JChords</h1>
        </Link>
        <Link to="/editor" className="mx-2 text-base">
          Editor
        </Link>
        <div className="grow"></div>
        {user === undefined ? <></> : <UserCircle user={user} />}
      </div>
    </div>
  );
}
