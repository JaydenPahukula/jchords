import AccountIcon48 from 'src/components/icons/accounticon';
import SearchIcon from 'src/components/icons/searchicon';

const searchBarId = 'searchbar';

export default function HomeHeader() {
  const focusSearchBar = () => document.getElementById(searchBarId)?.focus();

  return (
    <div id="header" class="bg-bg-0 z-[1] flex h-20 flex-shrink-0 justify-center !shadow-md">
      <div id="header-content" class="flex h-full w-full max-w-5xl items-stretch gap-4 px-4">
        <div id="header-left" class="flex items-center">
          <h1 class="text-4xl font-bold">JChords</h1>
        </div>
        <div id="header-right" class="flex flex-grow items-center justify-end gap-4">
          <div
            onClick={focusSearchBar}
            class="bg-bg-button hover:bg-bg-button-hover flex h-12 w-64 max-w-xl cursor-text items-center gap-1 rounded-full px-4 py-3"
          >
            <input
              class="min-w-0 flex-shrink flex-grow bg-transparent outline-none"
              id={searchBarId}
              type="text"
              placeholder="Search..."
            ></input>
            <SearchIcon class="h-full" />
          </div>
          <AccountIcon48 class="h-12" />
        </div>
      </div>
    </div>
  );
}
