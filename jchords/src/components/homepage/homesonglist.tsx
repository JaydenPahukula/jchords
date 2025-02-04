import { useContext } from 'preact/hooks';
import PlayIcon from 'src/components/icons/playicon';
import LoadingSpinner from 'src/components/loadingspinner/loadingspinner';
import LoadState from 'src/shared/types/loadstate';
import StateContext from 'src/state/uistatecontext';

export default function HomeSongList() {
  const state = useContext(StateContext);

  switch (state.songListLoadState.value) {
    case LoadState.None:
      return <></>;
    case LoadState.Loading:
      return (
        <div class="pt-12">
          <LoadingSpinner class="w-12" />
        </div>
      );
    case LoadState.Error:
      return <p class="p-4 text-xl text-fgerror">Could not load songs</p>;
    case LoadState.Loaded:
      return (
        <div class="w-full max-w-3xl p-3">
          <h2 class="mx-2 mb-2 text-xl font-bold">All Songs</h2>
          {state.songList.value.map((info) => (
            <div class="mb-3 flex h-[76px] w-full items-center rounded-md bg-bg0 px-5 py-3 shadow-md">
              <div class="flex-grow">
                <h3 class="text-xl">{info.title}</h3>
                <p class="text-fg1">{info.artist || ' '}</p>
              </div>
              <a
                href={`/song/${info.id}`}
                class="flex cursor-pointer select-none items-center gap-2 rounded-lg bg-bg1 p-3 transition-all hover:brightness-95 active:brightness-90"
              >
                <label class="cursor-pointer">Open</label>
                <PlayIcon class="h-6" />
              </a>
            </div>
          ))}
        </div>
      );
  }
}
