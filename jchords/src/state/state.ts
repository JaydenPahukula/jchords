import { signal } from '@preact/signals';
import LoadState from 'src/shared/enums/loadstate';
import parseSong from 'src/shared/functions/parsesong';
import cmRenderOptions, { makeDefaultRenderOptions } from 'src/shared/types/cm/cmrenderoptions';
import ParsedSong from 'src/shared/types/parsedsong';
import { makeEmptySong } from 'src/shared/types/song';
import SongInfo, { makeEmptySongInfo } from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';
import SongLoadState from 'src/types/songloadstate';

/** Global app state */
const state = {
  songMap: signal<SongInfoMap>({}),
  songMapLoadState: signal<LoadState>(LoadState.None),
  currSongId: signal<string>(''),
  currSong: signal<ParsedSong>(parseSong(makeEmptySong())),
  currSongInfo: signal<SongInfo>(makeEmptySongInfo()),
  currSongLoadState: signal<SongLoadState>(SongLoadState.Loading),
  renderOptions: signal<cmRenderOptions>(makeDefaultRenderOptions()),
};

export default state;
