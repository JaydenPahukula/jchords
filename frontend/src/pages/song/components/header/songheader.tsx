import { Signal } from '@preact/signals-react';
import { JCRenderOptions } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { HomeIcon } from 'src/components/ui/icons/homeicon';
import { MagnifyingGlassPlusIcon } from 'src/components/ui/icons/magnifyingglassplusicon';
import { TransposeIcon } from 'src/components/ui/icons/transposeicon';
import { HeaderIconButton } from 'src/pages/song/components/header/headericonbutton';
import { TransposeMenu } from 'src/pages/song/components/header/transposemenu';
import { ZoomMenu } from 'src/pages/song/components/header/zoommenu';

interface SongHeaderProps {
  song: ParsedSong | undefined;
  zoomSignal: Signal<number>;
  renderOptionsSignal: Signal<JCRenderOptions>;
}

export function SongHeader(props: SongHeaderProps) {
  return (
    <div id="song-header" className="text-gray-1 bg-gray-11_5 flex h-13 items-center gap-2 px-2">
      <div className="flex shrink-0 grow gap-2">
        <IconButton
          asLink
          to="/"
          className="size-10 bg-transparent p-1 hover:bg-[#fff1] active:bg-[#fff2]"
        >
          <HomeIcon fill />
        </IconButton>
      </div>
      <h1 className="truncate text-xl font-bold">{props.song?.info.title}</h1>
      <div className="flex shrink-0 grow justify-end gap-2">
        <HeaderIconButton
          icon={MagnifyingGlassPlusIcon}
          menu={<ZoomMenu zoomSignal={props.zoomSignal} />}
        />
        <HeaderIconButton
          icon={TransposeIcon}
          menu={<TransposeMenu song={props.song} renderOptionsSignal={props.renderOptionsSignal} />}
        />
      </div>
    </div>
  );
}
