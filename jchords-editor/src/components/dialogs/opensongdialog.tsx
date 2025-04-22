import { useComputed, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import getSong from 'shared/api/functions/getsong';
import getSongList from 'shared/api/functions/getsonglist';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormButton from 'shared/components/generic/formbutton';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import Dialog from 'shared/enums/dialog';
import DialogProps from 'shared/types/dialogprops';
import SongInfo from 'shared/types/songinfo';
import { newTab } from 'src/state/functions/tabs';

export default function OpenSongDialog(props: DialogProps) {
  const songList = useSignal<SongInfo[] | 'loading' | 'error'>('loading');
  const errorState = useSignal<undefined | 'loading' | 'error'>(undefined);
  const selectedIndex = useSignal<number | undefined>(undefined);

  const selectedSongId = useComputed(() => {
    if (songList.value === 'loading' || songList.value === 'error') return;
    return songList.value[selectedIndex.value ?? -1]?.id;
  });

  const submitDisabled = useComputed(
    () => selectedIndex.value === undefined || errorState.value === 'loading',
  );

  useEffect(() => {
    songList.value = 'loading';
    getSongList().then((res) => {
      songList.value = res === undefined ? 'error' : res;
    });
  }, []);

  function submit() {
    if (selectedSongId.value === undefined) {
      errorState.value = 'error';
    } else {
      errorState.value = 'loading';
      getSong(selectedSongId.value).then((result) => {
        if (result === undefined) {
          errorState.value = 'error';
        } else {
          selectedIndex.value = undefined;
          errorState.value = undefined;
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
      {errorState.value === 'error' && (
        <p class="text-fg-error mb-2 text-sm">Something went wrong. Please try again later</p>
      )}
      <FormButton
        onClick={submit}
        disabled={submitDisabled}
        loading={errorState.value === 'loading'}
      >
        Open Song
      </FormButton>
    </GenericDialog>
  );
}
