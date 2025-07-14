import { Flex, Heading } from '@radix-ui/themes';
import { Song } from 'shared/types/song';
import { HomeIcon } from 'src/components/icons/homeicon';
import { TransposeIcon } from 'src/components/icons/transposeicon';
import { HeaderIconButton, HeaderIconLink } from 'src/pages/song/header/headericonbutton';

interface SongHeaderProps {
  song: Song | undefined;
}

export function SongHeader(props: SongHeaderProps) {
  return (
    <Flex id="song-header" align="center" height="52px" px="2" gap="2">
      <Flex flexGrow="1" flexShrink="0" gap="2">
        <HeaderIconLink href="/">
          <HomeIcon />
        </HeaderIconLink>
      </Flex>
      <Heading as="h2" size="5" weight="bold" truncate>
        {props.song?.info.title}
      </Heading>
      <Flex flexGrow="1" flexShrink="0" gap="2" justify="end">
        <HeaderIconButton menu={<></>}>
          <TransposeIcon />
        </HeaderIconButton>
      </Flex>
    </Flex>
  );
}
