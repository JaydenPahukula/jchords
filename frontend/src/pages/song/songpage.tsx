import { batch, useSignal } from '@preact/signals-react';
import { Flex, Grid, Spinner } from '@radix-ui/themes';
import { RenderOptions } from 'engine';
import { useEffect } from 'react';
import { Song } from 'shared/types/song';
import { DialogType } from 'src/enums/dialogtype';
import { apiGetSong } from 'src/functions/api/endpoints/getsong';
import { Chart } from 'src/pages/song/chart';
import { SongHeader } from 'src/pages/song/header/songheader';
import 'src/pages/song/songpage.css';

// const defaultRenderOptions: RenderOptions = {
//   accidentalsType: 'auto',
//   transposeValue: 0,
//   printBarSeparators: 'grids',
//   symbolType: 'chord',
// };

const defaultRenderOptions: RenderOptions = {
  alignChordsWithLyrics: true,
  showChordDurations: false,
};

export function SongPage() {
  const songId = window.location.pathname.match(/^\/song\/([A-Za-z0-9]+)/)?.[1];
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
      <SongHeader song={song} />
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
