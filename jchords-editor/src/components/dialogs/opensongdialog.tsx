import { useComputed, useSignal } from '@preact/signals';
import { useContext, useEffect } from 'preact/hooks';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { FormButton } from 'shared/components/generic/formbutton';
import { LoadingSpinner } from 'shared/components/loadingspinner/loadingspinner';
import { Dialog } from 'shared/enums/dialog';
import { apiGetSong } from 'shared/functions/api/endpoints/getsong';
import { apiGetSongList } from 'shared/functions/api/endpoints/getsonglist';
import { DialogProps } from 'shared/types/dialogprops';
import { SongInfo } from 'shared/types/songinfo';
import { newTab } from 'src/state/functions/tabs';
import { StateContext } from 'src/state/statecontext';

export function OpenSongDialog(props: DialogProps) {
  const state = useContext(StateContext);

  const songList = useSignal<SongInfo[]>([]);
  const songListLoadingState = useSignal<'done' | 'loading' | 'error'>('loading');
  const submitState = useSignal<undefined | 'loading' | 'error'>(undefined);
  const selectedIndex = useSignal<number | undefined>(undefined);
  const showAllSongs = useSignal<boolean>(true);

  const displaySongList = useComputed(() => {
    if (showAllSongs.value) return songList.value;
    return songList.value.filter((info) => info.author === state.user.value?.uid);
  });

  const selectedSongId = useComputed(() => {
    if (selectedIndex.value === undefined) return undefined;
    return songList.value[selectedIndex.value]?.id;
  });

  const submitDisabled = useComputed(
    () => selectedIndex.value === undefined || submitState.value === 'loading',
  );

  useEffect(() => {
    // only fetch data when the dialog is opened for the first time
    function fetchData() {
      if (props.dialogRef.current?.open && songListLoadingState.value != 'error') {
        songListLoadingState.value = 'loading';
        songList.value = [];
        apiGetSongList().then((result) => {
          if (result === undefined) {
            songListLoadingState.value = 'error';
          } else {
            songListLoadingState.value = 'done';
            songList.value = result;
          }
        });
      }
    }
    props.dialogRef.current?.addEventListener('toggle', fetchData);
    return () => props.dialogRef.current?.removeEventListener('toggle', fetchData);
  }, []);

  function submit() {
    const id = selectedSongId.value;
    if (id === undefined) {
      submitState.value = 'error';
    } else {
      submitState.value = 'loading';
      apiGetSong(id).then((result) => {
        if (result === undefined) {
          submitState.value = 'error';
        } else {
          selectedIndex.value = undefined;
          submitState.value = undefined;
          props.changeDialog(Dialog.None);
          newTab(result);
        }
      });
    }
  }

  return (
    <GenericDialog dialogRef={props.dialogRef} closeButton class="w-96">
      <h2 class="mb-4 text-3xl font-bold">Open Song</h2>
      {state.user.value !== null && (
        <div class="mb-2 inline-block">
          <input
            type="checkbox"
            checked={!showAllSongs.value}
            onChange={() => (showAllSongs.value = !showAllSongs.value)}
            class="mr-1"
          >
            {' '}
          </input>
          Show only your songs
        </div>
      )}
      <div class="border-fg-1 mb-2 h-80 border-1">
        {songListLoadingState.value === 'loading' ? (
          <div class="flex h-full w-full items-center justify-center">
            <div class="h-10 w-10">
              <LoadingSpinner />
            </div>
          </div>
        ) : songListLoadingState.value === 'error' ? (
          <>error</>
        ) : (
          <ol>
            {displaySongList.value.map((info, i) => (
              <li
                onClick={() => (selectedIndex.value = i)}
                class={
                  'cursor-pointer overflow-x-hidden overflow-y-auto px-1 text-sm text-ellipsis whitespace-nowrap ' +
                  (selectedIndex.value === i ? 'bg-bg-button-active' : 'hover:bg-bg-button')
                }
              >
                {info.title}
              </li>
            ))}
          </ol>
        )}
      </div>
      {submitState.value === 'error' && (
        <p class="text-fg-error mb-2 text-sm">Something went wrong. Please try again later</p>
      )}
      <FormButton
        onClick={submit}
        disabled={submitDisabled}
        loading={submitState.value === 'loading'}
      >
        Open Song
      </FormButton>
    </GenericDialog>
  );
}
