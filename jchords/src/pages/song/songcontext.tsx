import { createContext } from 'react';
import SongChart from 'shared/types/songchart';
import SongInfo from 'shared/types/songinfo';

// used to easily pass the current song info and chart to all nested componenets
const SongContext = createContext<{
  songInfo: SongInfo | undefined;
  songChart: SongChart | undefined;
}>({
  songInfo: undefined,
  songChart: undefined,
});

export default SongContext;
