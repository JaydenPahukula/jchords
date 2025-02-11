import { signal } from '@preact/signals';
import LoadState from 'shared/enums/loadstate';
import parseSong from 'shared/functions/parsesong';
import cmRenderOptions, { makeDefaultRenderOptions } from 'shared/types/cm/cmrenderoptions';
import ParsedSong from 'shared/types/parsedsong';
import { makeEmptySong } from 'shared/types/song';
import SongInfo, { makeEmptySongInfo } from 'shared/types/songinfo';
import SongInfoMap from 'shared/types/songinfomap';
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
