import { JCRenderOptions } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import 'src/pages/song/components/chart.css';

function calcFontSize(zoom: number): number {
  return Math.min(Math.max(12 + Math.trunc(zoom), 12), 20);
}

interface ChartProps {
  song: ParsedSong;
  renderOptions: JCRenderOptions;
  zoom: number;
}

export function Chart(props: ChartProps) {
  const fontSize = calcFontSize(props.zoom);
  const headerFontSize = fontSize + 8;
  const lineHeight = 1.25 * fontSize;

  console.log(props.song.parsed.startingKey);

  return (
    <div
      className="bg-gray-1 chart font-chart min-h-full w-full max-w-[700px] min-w-max shrink-0 rounded-none p-6 sm:min-h-0 sm:rounded-3xl sm:p-10"
      style={{ fontSize: fontSize + 'px', lineHeight: lineHeight + 'px' }}
    >
      <h1 className="mb-4 font-bold" style={{ fontSize: headerFontSize + 'px' }}>
        {props.song.info.title}
      </h1>
      <p className="mb-2 font-bold">{props.song.info.artist}</p>
      <div dangerouslySetInnerHTML={{ __html: props.song.rendered }}></div>
    </div>
  );
}
