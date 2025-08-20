import { Signal } from '@preact/signals-react';
import { Flex, Heading } from '@radix-ui/themes';
import { JCRenderOptions } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import { HomeIcon } from 'src/components/icons/homeicon';
import { MagnifyingGlassPlusIcon } from 'src/components/icons/magnifyingglassplusicon';
import { TransposeIcon } from 'src/components/icons/transposeicon';
import {
  HeaderIconButton,
  HeaderIconLink,
} from 'src/pages/song/components/header/headericonbutton';
import { TransposeMenu } from 'src/pages/song/components/header/transposemenu';
import { ZoomMenu } from 'src/pages/song/components/header/zoommenu';

interface SongHeaderProps {
  song: ParsedSong | undefined;
  zoomSignal: Signal<number>;
  renderOptionsSignal: Signal<JCRenderOptions>;
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
          <HeaderIconButton
            icon={MagnifyingGlassPlusIcon}
            menu={<ZoomMenu zoomSignal={props.zoomSignal} />}
          />
          <HeaderIconButton
            icon={TransposeIcon}
            menu={
              <TransposeMenu song={props.song} renderOptionsSignal={props.renderOptionsSignal} />
            }
          />
        </Flex>
      </Flex>
    </>
  );
}
