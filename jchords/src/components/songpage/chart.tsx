// @ts-expect-error
import { renderSong } from 'chord-mark';
import { useContext } from 'preact/hooks';
import UIStateContext from 'src/state/uistatecontext';

export default function Chart() {
  const { currSong, renderOptions } = useContext(UIStateContext);

  return (
    <div
      id="chart"
      class="bg-bg-0 mb-20 box-border w-full rounded-3xl p-10 pb-16 font-mono !shadow-md lg:w-auto lg:min-w-[48rem]"
    >
      <h2 class="text-3xl font-bold">{currSong.value.info.title}</h2>
      <h3 class="text-lg">{currSong.value.info.artist}</h3>
      <br />
      <pre
        class="w-full max-w-3xl leading-tight"
        dangerouslySetInnerHTML={{ __html: renderSong(currSong.value.parsed, renderOptions.value) }}
      />
    </div>
  );
}
