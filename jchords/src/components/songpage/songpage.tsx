import { batch, useSignal } from '@preact/signals-react';
import { Flex, Grid, Heading, Spinner } from '@radix-ui/themes';

import { useEffect } from 'react';
import { useParams } from 'react-router';
import { HomeIcon } from 'shared/components/icons/homeicon';
import { DialogType } from 'shared/enums/dialogtype';
import { apiGetSong } from 'shared/functions/api/endpoints/getsong';
import { cmRenderOptions } from 'shared/types/cm/cmrenderoptions';
import { Song } from 'shared/types/song';
import { Chart } from 'src/components/songpage/chart';
import { HeaderIconLink } from 'src/components/songpage/headericonbutton';

const defaultRenderOptions: cmRenderOptions = {
  accidentalsType: 'auto',
  transposeValue: 0,
  printBarSeparators: 'grids',
  symbolType: 'chord',
};

type SongPageParams = {
  songId: string;
};

export function SongPage() {
  const { songId } = useParams<SongPageParams>();
  if (songId === undefined) throw new Error('songId is undefined');

  const dialogSignal = useSignal<DialogType>(DialogType.None);
  const songSignal = useSignal<Song | 'loading' | 'error'>('loading');

  const song =
    songSignal.value === 'loading' || songSignal.value === 'error' ? undefined : songSignal.value;

  useEffect(() => {
    document.title = 'JChords';
    batch(() => {
      dialogSignal.value = DialogType.None;
      songSignal.value = 'loading';
    });
    apiGetSong(songId).then((result) => {
      if (result === undefined) {
        songSignal.value = 'error';
      } else {
        songSignal.value = result;
        document.title = result.info.title + ' - JChords';
      }
    });
  }, [songId]);

  return (
    <Grid id="song-page" rows="min-content 1fr" height="100lvh">
      <Flex id="song-header" align="center" height="52px" px="2" gap="2">
        <Flex flexGrow="1" flexShrink="0" gap="2">
          <HeaderIconLink icon={HomeIcon} href="/" />
        </Flex>
        <Heading as="h2" size="5" weight="bold" truncate>
          {song?.info.title}
        </Heading>
        <Flex flexGrow="1" flexShrink="0" gap="2" justify="end">
          {/* <HeaderIconButton icon={MusicNoteIcon} menu={<TransposeMenu />} /> */}
        </Flex>
      </Flex>
      <Flex direction="column" align="center" p="4" pb="8" overflowY="auto">
        {song === undefined ? (
          <Spinner mx="auto" size="3" />
        ) : (
          <Chart song={song} renderOptions={defaultRenderOptions} />
        )}
      </Flex>
    </Grid>
  );
}
