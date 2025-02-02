// @ts-expect-error
import { parseSong, renderSong } from 'chord-mark';
import { useContext } from 'preact/hooks';
import UIStateContext from 'src/state/uistatecontext';

export default function Chart() {
  const { currSong, currSongInfo } = useContext(UIStateContext);

  if (currSong.value === undefined || currSongInfo.value === undefined) return <></>;

  return (
    <div
      id="chart"
      class="font-mono lg:w- mb-20 box-border w-full rounded-3xl bg-bg0 p-10 pb-16 lg:w-auto lg:min-w-[48rem]"
    >
      <h2 class="text-3xl font-bold">{currSongInfo.value.title}</h2>
      <h3 class="text-lg">{currSongInfo.value.artist}</h3>
      <br />
      <pre
        class="w-full max-w-3xl leading-tight"
        dangerouslySetInnerHTML={{ __html: renderSong(parseSong(currSong.value.text)) }}
      />
    </div>
  );
}
