import { ParsedLine } from 'src/engine/parse';
import { ParsedSong } from 'src/types/parsedsong';
import { defaultRenderOptions, RenderOptions } from 'src/types/renderopts';
import { songClassName } from '../classes';

export function renderSong(song: ParsedSong, opts?: RenderOptions): string {
  if (opts === undefined) opts = defaultRenderOptions;

  let output = '';

  // main rendering
  output += '<!-- Start of JChords rendered song -->\n';
  output += `<pre class="${songClassName}">`;

  song.lines.map((line: ParsedLine) => {
    output += line.render(opts);
  });

  output += '</pre>';
  output += '\n<!-- End of JChords rendered song -->\n';

  return output;
}
