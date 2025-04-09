import { useSignal } from '@preact/signals';
import { useContext, useRef, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import SearchIcon from 'shared/components/icons/searchicon';
import XIcon from 'shared/components/icons/xicon';
import Size from 'shared/enums/size';
import UserCircle from 'src/components/usercircle/usercircle';
import StateContext from 'src/state/statecontext';

export default function HomeHeader() {
  const state = useContext(StateContext);
  const [clearHeader, setClearHeader] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchText = useSignal('');

  const isSm = state.size.value < Size.sm;

  const showXIcon = searchText.value.length > 0 || clearHeader;

  function focusSearchBar() {
    searchBarRef.current?.focus();
  }

  function clearSearchText() {
    searchText.value = '';
  }

  function searchBarOnInput(e: JSX.TargetedInputEvent<HTMLInputElement>) {
    searchText.value = e.currentTarget.value;
  }

  function searchBarOnFocus() {
    if (isSm) setClearHeader(true);
  }

  function onXClick() {
    clearSearchText();
    if (isSm) {
      setClearHeader(false);
      searchBarRef.current?.blur();
    }
  }

  return (
    <div id="header" class="bg-bg-0 z-[1] flex h-18 flex-shrink-0 justify-center !shadow-md">
      <div id="header-content" class="flex h-full w-full max-w-5xl items-stretch gap-4 px-4">
        {!clearHeader && (
          <div id="header-left" class="flex items-center">
            <a href="/">
              <h1 class="text-3xl font-bold sm:text-4xl">JChords</h1>
            </a>
          </div>
        )}
        <div id="header-right" class="flex grow items-center justify-end gap-1 sm:gap-4">
          <div
            class={
              'sm:bg-bg-button sm:hover:bg-bg-button-hover flex h-12 items-center rounded-xl sm:w-64 sm:max-w-xl ' +
              (clearHeader ? 'bg-bg-button w-full' : '')
            }
          >
            <input
              class={
                'h-full w-full flex-shrink grow bg-transparent px-3 outline-none sm:max-w-64 ' +
                (clearHeader ? 'max-w-screen' : 'max-w-0')
              }
              ref={searchBarRef}
              value={searchText}
              onInput={searchBarOnInput}
              onFocus={searchBarOnFocus}
              type="text"
              placeholder="Search"
            ></input>
            {showXIcon ? (
              <div class="aspect-square h-full cursor-pointer p-[14px]" onClick={onXClick}>
                <XIcon />
              </div>
            ) : (
              <div class="aspect-square h-full p-[14px]" onClick={focusSearchBar}>
                <SearchIcon />
              </div>
            )}
          </div>
          {!clearHeader && (
            <div class="w-11">
              <UserCircle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
