// @ts-ignore
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js';
import { cmDefaultRenderOptions } from 'shared/chordmark/renderoptions';
import Key, { keyToString } from 'shared/types/key';
import SongChart from 'shared/types/songchart';
import SongInfo from 'shared/types/songinfo';
import './chart.css';

interface ChartProps {
  info: SongInfo;
  chart: SongChart;
  isFull: boolean;
}

export default function Chart(props: ChartProps) {
  const metadata = [];
  if (props.chart.key != Key.None) metadata.push('Key: ' + keyToString(props.chart.key));

  // filler data
  metadata.push('100 bpm');
  metadata.push('4/4');

  return (
    <div id={props.isFull ? 'chart-full' : 'chart'}>
      <div className="chart-header">
        <h1 className="chart-title">{props.info.name}</h1>
        <p className="chart-subtitle">{props.info.artist}</p>
        <p className="chart-subtitle">{metadata.join(' | ')}</p>
      </div>
      <pre
        dangerouslySetInnerHTML={{
          __html:
            props.chart === undefined
              ? ''
              : renderSong(parseSong(props.chart.text), cmDefaultRenderOptions),
        }}
      ></pre>
    </div>
  );
}
