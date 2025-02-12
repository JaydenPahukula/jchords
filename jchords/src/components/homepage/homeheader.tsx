import { useContext, useState } from 'preact/hooks';
import Size from 'shared/enums/size';
import AccountIcon48 from 'src/components/icons/accounticon';
import SearchIcon from 'src/components/icons/searchicon';
import UIStateContext from 'src/state/uistatecontext';

const searchBarId = 'searchbar';

export default function HomeHeader() {
  const state = useContext(UIStateContext);
  const [searchBarFocused, setSearchBarFocused] = useState<boolean>(false);

  const isSm = state.size.value < Size.sm;
  const clearHeader = isSm && searchBarFocused;

  const focusSearchBar = () => document.getElementById(searchBarId)?.focus();

  return (
    <div id="header" class="bg-bg-0 z-[1] flex h-20 flex-shrink-0 justify-center !shadow-md">
      <div id="header-content" class="flex h-full w-full max-w-5xl items-stretch gap-4 px-4">
        {!clearHeader && (
          <div id="header-left" class="flex items-center">
            <h1 class="text-3xl font-bold sm:text-4xl">JChords</h1>
          </div>
        )}
        <div id="header-right" class="flex flex-grow items-center justify-end gap-4">
          <div
            onClick={focusSearchBar}
            class="sm:bg-bg-button sm:hover:bg-bg-button-hover focus-within:bg-bg-button flex h-12 cursor-text items-center rounded-xl p-3 focus-within:w-full sm:w-64 sm:max-w-xl sm:gap-1 sm:focus-within:w-64"
          >
            <input
              class="w-full max-w-0 flex-shrink flex-grow bg-transparent outline-none focus:max-w-screen sm:not-focus:max-w-64"
              id={searchBarId}
              onFocus={() => setSearchBarFocused(true)}
              onFocusOut={() => setSearchBarFocused(false)}
              type="text"
              placeholder="Search..."
            ></input>
            <SearchIcon class="h-full" />
          </div>
          {!clearHeader && <AccountIcon48 class="h-10 sm:h-12" />}
        </div>
      </div>
    </div>
  );
}
