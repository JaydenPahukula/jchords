import { Signal } from '@preact/signals-react';
import { Flex, Heading } from '@radix-ui/themes';
import { Song } from 'shared/types/song';
import { HomeIcon } from 'src/components/icons/homeicon';
import { TransposeIcon } from 'src/components/icons/transposeicon';
import { ZoomIcon } from 'src/components/icons/zoomicon';
import {
  HeaderIconButton,
  HeaderIconLink,
} from 'src/pages/song/components/header/headericonbutton';
import { ZoomMenu } from 'src/pages/song/components/header/zoommenu';

interface SongHeaderProps {
  song: Song | undefined;
  zoomSignal: Signal<number>;
}

export function SongHeader(props: SongHeaderProps) {
  return (
    <>
      <Flex id="song-header" align="center" height="52px" px="2" gap="2">
        <Flex flexGrow="1" flexShrink="0" gap="2">
          <HeaderIconLink icon={HomeIcon} href="/" />
        </Flex>
        <Heading as="h2" size="5" weight="bold" truncate>
          {props.song?.info.title}
        </Heading>
        <Flex flexGrow="1" flexShrink="0" gap="2" justify="end">
          <HeaderIconButton icon={ZoomIcon} menu={<ZoomMenu zoomSignal={props.zoomSignal} />} />
          <HeaderIconButton icon={TransposeIcon} menu={<></>} />
        </Flex>
      </Flex>
    </>
  );
}
