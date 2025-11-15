import { Signal } from '@preact/signals-react';
import { JCRenderOptions } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import { IconButton } from 'src/components/ui/iconbutton/iconbutton';
import { HomeIcon } from 'src/components/ui/icons/homeicon';
import { MagnifyingGlassPlusIcon } from 'src/components/ui/icons/magnifyingglassplusicon';
import { TransposeIcon } from 'src/components/ui/icons/transposeicon';
import { Popover } from 'src/components/ui/popover/popover';
import { TransposeMenu } from 'src/pages/song/components/header/transposemenu';
import { ZoomMenu } from 'src/pages/song/components/header/zoommenu';

interface SongPageHeaderProps {
  song: ParsedSong | undefined;
  zoom: number;
  setZoom: (zoom: number) => void;
  renderOptionsSignal: Signal<JCRenderOptions>;
}

export function SongPageHeader(props: SongPageHeaderProps) {
  return (
    <div
      id="song-header"
      className="text-gray-1 bg-gray-11_5 flex h-13 w-full items-center gap-2 overflow-hidden px-2"
    >
      <div className="flex shrink-0 grow basis-0 gap-2">
        <IconButton
          asLink
          to="/"
          className="size-10 bg-transparent p-[6px] hover:bg-[#fff1] active:bg-[#fff2]"
        >
          <HomeIcon fill />
        </IconButton>
      </div>
      <h1 className="min-w-0 shrink truncate text-lg font-bold sm:text-xl">
        {props.song?.info.title}
      </h1>
      <div className="flex shrink-0 grow basis-0 justify-end gap-2">
        <Popover.Root>
          <Popover.Trigger asChild>
            <IconButton className="size-10 bg-transparent p-[6px] hover:bg-[#fff1] active:bg-[#fff2]">
              <MagnifyingGlassPlusIcon />
            </IconButton>
          </Popover.Trigger>
          <ZoomMenu zoom={props.zoom} setZoom={props.setZoom} />
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <IconButton className="size-10 bg-transparent p-[6px] hover:bg-[#fff1] active:bg-[#fff2]">
              <TransposeIcon />
            </IconButton>
          </Popover.Trigger>
          <TransposeMenu song={props.song} renderOptionsSignal={props.renderOptionsSignal} />
        </Popover.Root>
      </div>
    </div>
  );
}
