// @ts-ignore
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js';
import cmRenderOptions, {
  cmPrintBarSeperatorsOptions,
  cmSimplifyChordsOptions,
} from 'shared/chordmark/renderoptions';
import SongChart from 'shared/types/songchart';
import SongInfo from 'shared/types/songinfo';
import './chart.css';

interface ChartProps {
  info: SongInfo;
  chart: SongChart;
  isFull: boolean;
}

const defaultRenderOptions: cmRenderOptions = {
  printBarSeparators: cmPrintBarSeperatorsOptions.grids,
  simplifyChords: cmSimplifyChordsOptions.none,
};

export default function Chart(props: ChartProps) {
  return (
    <div id={props.isFull ? 'chart-full' : 'chart'}>
      <div className="chart-header">
        <h1 className="chart-title">{props.info.name}</h1>
        <p className="chart-subtitle">{props.info.artist}</p>
        <p className="chart-subtitle">Key: C | 100 BPM | 4 / 4</p>
      </div>
      <pre
        dangerouslySetInnerHTML={{
          __html:
            props.chart === undefined
              ? ''
              : renderSong(parseSong(props.chart.text), defaultRenderOptions),
        }}
      ></pre>
    </div>
  );
}
