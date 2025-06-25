import { useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Dialog, Flex, Spinner, Switch, Table, Text } from '@radix-ui/themes';
import { useContext, useEffect } from 'react';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { DialogType } from 'shared/enums/dialogtype';
import { apiGetSong } from 'shared/functions/api/endpoints/getsong';
import { apiGetSongList } from 'shared/functions/api/endpoints/getsonglist';
import { DialogProps } from 'shared/types/dialog/dialogprops';
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
    // fetch data when the dialog is opened
    if (props.open.value) {
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
  }, [props.open.value]);

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
          props.changeDialog(DialogType.None);
          newTab(result);
        }
      });
    }
  }

  return (
    <GenericDialog {...props} closeButton width="460px">
      <Dialog.Title>Open Song</Dialog.Title>
      <Dialog.Description aria-describedby={undefined} />
      {state.user.value !== null && (
        <Flex as="span" mb="3" align="center" gap="2">
          <Switch
            color="indigo"
            checked={!showAllSongs.value}
            onCheckedChange={() => (showAllSongs.value = !showAllSongs.value)}
          />
          <Text>Show only your songs</Text>
        </Flex>
      )}
      <Table.Root
        size="1"
        variant="surface"
        mb="3"
        style={{ maxHeight: '600px', overflowX: 'auto' }}
      >
        <Table.Body>
          {songListLoadingState.value === 'loading' ? (
            <Table.Row>
              <Table.Cell>
                <Spinner size="3" mx="auto" my="4" />
              </Table.Cell>
            </Table.Row>
          ) : songListLoadingState.value === 'error' ? (
            <>error</> // TODO
          ) : displaySongList.value.length === 0 ? (
            <Table.Row>
              <Table.Cell>
                <Box width="100%" asChild>
                  <Text align="center" color="gray">
                    You don't have any songs!
                  </Text>
                </Box>
              </Table.Cell>
            </Table.Row>
          ) : (
            displaySongList.value.map((info, i) => (
              <Table.Row
                key={info.id}
                onClick={() => (selectedIndex.value = i)}
                tabIndex={0}
                className={
                  selectedIndex.value === i
                    ? 'open-song-dialog-row-selected'
                    : 'open-song-dialog-row'
                }
              >
                <Table.Cell py="1" style={{ height: '10px' }}>
                  <Text truncate style={{ cursor: 'pointer' }}>
                    {info.title}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      {submitState.value === 'error' && (
        <Text color="red" size="3">
          Something went wrong. Please try again later
        </Text>
      )}
      <Flex width="100%" justify="end" mt="3">
        <Button
          size="3"
          variant="surface"
          onClick={submit}
          disabled={submitDisabled.value}
          loading={submitState.value === 'loading'}
        >
          Open Song
        </Button>
      </Flex>
    </GenericDialog>
  );
}
