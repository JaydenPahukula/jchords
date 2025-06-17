import { useComputed, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { FormButton } from 'shared/components/generic/formbutton';
import { LoadingSpinner } from 'shared/components/loadingspinner/loadingspinner';
import { Dialog } from 'shared/enums/dialog';
import { apiGetSong } from 'shared/functions/api/endpoints/getsong';
import { apiGetSongList } from 'shared/functions/api/endpoints/getsonglist';
import { DialogProps } from 'shared/types/dialogprops';
import { SongInfo } from 'shared/types/songinfo';
import { newTab } from 'src/state/functions/tabs';

export function OpenSongDialog(props: DialogProps) {
  const songList = useSignal<SongInfo[] | 'loading' | 'error'>('loading');
  const submitState = useSignal<undefined | 'loading' | 'error'>(undefined);
  const selectedIndex = useSignal<number | undefined>(undefined);

  const selectedSongId = useComputed(() => {
    if (songList.value === 'loading' || songList.value === 'error') return;
    return songList.value[selectedIndex.value ?? -1]?.id;
  });

  const submitDisabled = useComputed(
    () => selectedIndex.value === undefined || submitState.value === 'loading',
  );

  useEffect(() => {
    // only fetch data when the dialog is opened for the first time
    function fetchData() {
      if (props.dialogRef.current?.open && !Array.isArray(songList.value)) {
        songList.value = 'loading';
        apiGetSongList().then((res) => {
          songList.value = res === undefined ? 'error' : res;
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
    <GenericDialog dialogRef={props.dialogRef} closeButton>
      <h2 class="mb-4 text-3xl font-bold">Open Song</h2>
      <div class="border-fg-1 mb-2 h-80 border-1">
        {songList.value === 'loading' ? (
          <div class="flex h-full w-full items-center justify-center">
            <div class="h-10 w-10">
              <LoadingSpinner />
            </div>
          </div>
        ) : songList.value === 'error' ? (
          <>error</>
        ) : (
          <ol>
            {songList.value.map((info, i) => (
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
