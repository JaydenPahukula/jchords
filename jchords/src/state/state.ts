import { signal } from '@preact/signals';
import LoadState from 'shared/enums/loadstate';
import Size from 'shared/enums/size';
import parseSong from 'shared/functions/parsesong';
import cmRenderOptions, { makeDefaultRenderOptions } from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import { makeEmptySong } from 'shared/types/song';
import SongInfo, { makeEmptySongInfo } from 'shared/types/songinfo';
import SongInfoMap from 'shared/types/songinfomap';
import calcSize from 'src/responsiveness/calcsize';
import SongLoadState from 'src/types/songloadstate';

/** Global app state */
const state = {
  size: signal<Size>(calcSize()),
  songMap: signal<SongInfoMap>({}),
  songMapLoadState: signal<LoadState>(LoadState.None),
  currSongId: signal<string>(''),
  currSong: signal<ParsedSong>(parseSong(makeEmptySong())),
  currSongInfo: signal<SongInfo>(makeEmptySongInfo()),
  currSongLoadState: signal<SongLoadState>(SongLoadState.Loading),
  renderOptions: signal<cmRenderOptions>(makeDefaultRenderOptions()),
};

export default state;
