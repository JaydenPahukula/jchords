import { useContext, useEffect } from 'preact/hooks';
import HomeHeader from 'src/components/home/homeheader';
import HomeSongList from 'src/components/home/homesonglist';
import StateContext from 'src/state/statecontext';

export default function HomePage() {
  const state = useContext(StateContext);

  useEffect(() => state.onHomePageLoad(), []);

  // update title
  useEffect(() => {
    document.title = 'JChords';
  });

  return (
    <div id="app" class="flex h-screen w-full flex-col bg-bg2">
      <HomeHeader />
      <div class="flex flex-grow flex-col items-center overflow-y-auto">
        <HomeSongList />
      </div>
    </div>
  );
}
