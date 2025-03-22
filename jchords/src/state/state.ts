import { signal } from '@preact/signals';
import { User } from 'firebase/auth';
import LoadState from 'shared/enums/loadstate';
import Size from 'shared/enums/size';
import parseSong from 'shared/functions/parsesong';
import cmRenderOptions, { makeDefaultRenderOptions } from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import { makeEmptySong } from 'shared/types/song';
import SongInfo from 'shared/types/songinfo';
import calcSize from 'src/responsiveness/calcsize';

/** Global app state */
const state = {
  size: signal<Size>(calcSize()),
  songList: signal<SongInfo[]>([]),
  songListLoadState: signal<LoadState>(LoadState.None),
  currSongId: signal<string>(''),
  currSong: signal<ParsedSong>(parseSong(makeEmptySong())),
  currSongLoadState: signal<LoadState>(LoadState.None),
  renderOptions: signal<cmRenderOptions>(makeDefaultRenderOptions()),
  user: signal<User | null>(null),
};

export default state;
