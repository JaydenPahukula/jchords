import { useContext } from 'preact/hooks';
import HomeHeader from 'src/components/homeheader/homeheader';
import HomeSongList from 'src/components/homesonglist/homesonglist';
import StateContext from 'src/state/statecontext';

export default function HomePage() {
  const stateManager = useContext(StateContext);

  stateManager?.onHomePageLoad();

  return (
    <div id="app" class="h-full min-h-screen w-full bg-bg2">
      <HomeHeader />
      <div class="flex flex-col items-center">
        <HomeSongList />
      </div>
    </div>
  );
}
