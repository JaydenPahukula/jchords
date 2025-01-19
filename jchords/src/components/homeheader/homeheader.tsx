import AccountIcon48 from 'src/components/icons/accounticon';
import SearchIcon from 'src/components/icons/searchicon';

export default function HomeHeader() {
  return (
    <div id="header" class="h-20 bg-bg0">
      <div id="header-content" class="flex h-full items-stretch gap-4 px-4">
        <div id="header-left" class="flex flex-shrink-0 flex-grow items-center">
          <h1 class="text-4xl font-bold">JChords</h1>
        </div>
        <div id="header-center" class="flex w-full max-w-96 items-center">
          <div
            id="searchbar"
            class="flex h-12 w-full items-center rounded-full bg-bg1 px-4 py-3 text-fg1"
          >
            <p class="flex-grow">Search...</p>
            <SearchIcon class="h-full" />
          </div>
        </div>
        <div id="header-right" class="flex flex-shrink-0 flex-grow items-center justify-end">
          <AccountIcon48 class="h-12" />
        </div>
      </div>
    </div>
  );
}
