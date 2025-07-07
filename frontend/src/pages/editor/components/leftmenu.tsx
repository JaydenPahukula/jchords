import { useComputed } from '@preact/signals-react';
import { Box, Flex, Heading, Text, TextField } from '@radix-ui/themes';
import { ChangeEvent } from 'react';
import { LeftMenuPublishButton } from 'src/pages/editor/components/leftmenupublishbutton';
import { updateCurrSongInfo } from 'src/pages/editor/state/functions/song';
import { useStateContext } from 'src/pages/editor/state/statecontext';

export function LeftMenu() {
  const state = useStateContext();
  const disabled = useComputed(() => state.currSong.value === undefined);

  const song = state.currSong.value;

  const visibleId = song.info.id === 'welcome' ? '' : song.info.id;

  const onTitleInput = (e: ChangeEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ title: e.target.value }, true);

  const onArtistInput = (e: ChangeEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ artist: e.target.value }, true);

  return (
    <Flex
      id="left-menu"
      p="4"
      direction="column"
      width="25vw"
      maxWidth="256px"
      style={{ borderRight: 'var(--border)' }}
    >
      <Heading align="center" as="h2" weight="regular" size="4">
        Song Info
      </Heading>
      <Box mb="3">
        <Text as="label" htmlFor="id-input">
          ID:
        </Text>
        <TextField.Root id="id-input" value={visibleId} readOnly disabled />
      </Box>
      <Box mb="3">
        <Text as="label" htmlFor="title-input">
          Title:
        </Text>
        <TextField.Root
          id="title-input"
          value={song.info.title}
          onInput={onTitleInput}
          disabled={disabled.value}
        />
      </Box>
      <Box mb="3">
        <Text as="label" htmlFor="artist-input">
          Artist:
        </Text>
        <TextField.Root
          id="artist-input"
          value={song.info.artist}
          onInput={onArtistInput}
          disabled={disabled.value}
        />
      </Box>
      <Box flexGrow="1" />
      <LeftMenuPublishButton />
    </Flex>
  );
}
