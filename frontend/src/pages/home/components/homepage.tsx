import { batch, useSignal } from '@preact/signals-react';
import { Box, Button, Card, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import { useEffect } from 'react';
import { SongInfo } from 'shared/types/songinfo';
import { PlayIcon } from 'src/components/icons/playicon';
import { SearchIcon } from 'src/components/icons/searchicon';
import { DialogType } from 'src/enums/dialogtype';
import { apiGetSongList } from 'src/functions/api/endpoints/getsonglist';
import { useDialogContext } from 'src/pages/home/state/dialog';

export function HomePage() {
  const dialogSignal = useDialogContext();

  const songList = useSignal<SongInfo[] | 'loading' | 'error'>('loading');

  useEffect(() => {
    // update title
    document.title = 'JChords';
    // fetch song list
    batch(() => {
      dialogSignal.value = DialogType.None;
      songList.value = 'loading';
    });
    apiGetSongList().then((result) => {
      songList.value = result ?? 'error';
    });
  }, []);

  return (
    <>
      <Box width="100%" mb="4" asChild>
        <TextField.Root placeholder="Search for a song..." size="3">
          <TextField.Slot>
            <SearchIcon />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      {songList.value === 'loading' ? (
        <Spinner mx="auto" my="6" size="3" />
      ) : songList.value === 'error' ? (
        <Box width="100%" asChild>
          <Text align="center" my="4" color="red">
            Error loading songs{/* TODO: make this nicer */}
          </Text>
        </Box>
      ) : (
        songList.value.map((info) => (
          <Card key={info.id} mb="2" asChild>
            <Box p="2">
              <Flex align="center">
                <Box flexGrow="1" pl="1">
                  <Text truncate as="p" weight="medium" size="3">
                    {info.title || '*No Title*'}
                  </Text>
                  <Text truncate as="p" size="2" color="gray">
                    {info.artist || '*No Artist*'}
                  </Text>
                </Box>
                <Button size="3" variant="outline" asChild>
                  <a href={'/song/' + info.id}>
                    Open
                    <PlayIcon height="20px" width="20px" />
                  </a>
                </Button>
              </Flex>
            </Box>
          </Card>
        ))
      )}
    </>
  );
}
