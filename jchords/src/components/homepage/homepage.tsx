import { useEffect } from 'preact/hooks';
import onHomePageLoad from 'src/state/functions/onhomepageload';
import HomeHeader from './homeheader';
import HomeSongList from './homesonglist';

export default function HomePage() {
  useEffect(onHomePageLoad, []);

  // update title
  useEffect(() => {
    document.title = 'JChords';
  });

  return (
    <div id="homepage" class="flex h-screen w-full flex-col bg-bg2">
      <HomeHeader />
      <div class="flex flex-grow flex-col items-center overflow-y-auto">
        <HomeSongList />
      </div>
    </div>
  );
}
