import { useEffect } from 'preact/hooks';
import { GrowlStack } from 'shared/components/growls/growlstack';
import { HomeHeader } from 'src/components/homepage/homeheader';
import { HomeSongList } from 'src/components/homepage/homesonglist';
import { onHomePageLoad } from 'src/state/functions/onhomepageload';

export function HomePage() {
  useEffect(onHomePageLoad, []);

  // update title
  useEffect(() => {
    document.title = 'JChords';
  });

  return (
    <>
      <GrowlStack />
      <div id="homepage" class="bg-bg-3 flex h-dvh w-full flex-col">
        <HomeHeader />
        <div class="flex grow flex-col items-center overflow-y-auto">
          <HomeSongList />
        </div>
      </div>
    </>
  );
}
