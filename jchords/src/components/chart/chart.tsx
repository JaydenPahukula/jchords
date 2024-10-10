// @ts-ignore
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js';
import { useContext } from 'react';
import cmRenderOptions, { cmDefaultRenderOptions } from 'shared/chordmark/renderoptions';
import Key, { keyToString } from 'shared/types/key';
import SongContext from 'src/pages/song/songcontext';
import { useAppSelector } from 'src/redux/hooks';
import './chart.css';

interface ChartProps {
  isFull: boolean;
}

export default function Chart(props: ChartProps) {
  const { songInfo, songChart } = useContext(SongContext);

  const renderOptions: cmRenderOptions = {
    ...cmDefaultRenderOptions,
    ...useAppSelector((state) => state.renderOptions),
  };

  const metadata = [];
  if (songChart !== undefined && songChart?.key !== Key.None) {
    metadata.push('Key: ' + keyToString(songChart?.key));
  }

  // filler data
  metadata.push('100 bpm');
  metadata.push('4/4');

  return (
    <div id={props.isFull ? 'chart-full' : 'chart'}>
      <div className="chart-header">
        <h1 className="chart-title">{songInfo?.name}</h1>
        <p className="chart-subtitle">{songInfo?.artist}</p>
        <p className="chart-subtitle">{metadata.join(' | ')}</p>
      </div>
      <pre
        id="chart-content"
        dangerouslySetInnerHTML={{
          __html:
            songChart === undefined ? '' : renderSong(parseSong(songChart?.text), renderOptions),
        }}
      ></pre>
    </div>
  );
}
