import { GearIcon } from 'shared/components/icons/gearicon';
import { HomeIcon } from 'shared/components/icons/homeicon';
import { MusicNoteIcon } from 'shared/components/icons/musicnoteicon';
import { SongHeaderButton } from 'src/components/songpage/header/songheaderbutton';
import { TestMenu } from 'src/components/songpage/header/testmenu';
import { TransposeMenu } from 'src/components/songpage/header/transposemenu';

export function SongHeader() {
  return (
    <div
      id="header"
      class="bg-bg-9 text-fg-8 z-[1] flex h-[3.25rem] flex-shrink-0 items-center shadow-md"
    >
      <div class="flex flex-1 px-3">
        <SongHeaderButton onClick={() => route('/')}>
          <HomeIcon />
        </SongHeaderButton>
      </div>
      <h1 class="align-middle text-2xl font-bold">{state.currSong.value?.info.title}</h1>
      <div class="flex flex-1 justify-end gap-2 px-3">
        <ExpandableMenuButton menu={<TransposeMenu />}>
          <SongHeaderButton>
            <MusicNoteIcon />
          </SongHeaderButton>
        </ExpandableMenuButton>
        <ExpandableMenuButton menu={<TestMenu />}>
          <SongHeaderButton>
            <GearIcon />
          </SongHeaderButton>
        </ExpandableMenuButton>
      </div>
    </div>
  );
}
