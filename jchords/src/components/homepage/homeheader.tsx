import AccountIcon48 from 'src/components/icons/accounticon';
import SearchIcon from 'src/components/icons/searchicon';

export default function HomeHeader() {
  return (
    <div id="header" class="z-[1] flex h-20 flex-shrink-0 justify-center bg-bg0 shadow-md">
      <div id="header-content" class="flex h-full w-full max-w-5xl items-stretch gap-4 px-4">
        <div id="header-left" class="flex items-center">
          <h1 class="text-4xl font-bold">JChords</h1>
        </div>
        <div id="header-right" class="flex flex-grow items-center justify-end gap-4">
          <div
            id="searchbar"
            class="flex h-12 w-full max-w-96 items-center rounded-full bg-bg1 px-4 py-3 text-fg1"
          >
            <p class="flex-grow">Search...</p>
            <SearchIcon class="h-full" />
          </div>
          <AccountIcon48 class="h-12" />
        </div>
      </div>
    </div>
  );
}
