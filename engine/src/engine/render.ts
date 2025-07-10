import { ParsedLine } from 'src/engine/parse';
import { ParsedSong } from 'src/types/parsedsong';
import { RenderOptions } from 'src/types/renderopts';
import { sectionClassName, songClassName } from '../constants/classes';

export function renderSong(song: ParsedSong, opts: RenderOptions): string {
  let output = '';

  // main rendering
  output += '<!-- Start of JChords rendered song -->\n';
  output += `<div class="${songClassName}"><pre class="${sectionClassName}">`;

  song.lines.map((line: ParsedLine) => {
    output += line.render(opts);
  });

  output += '</pre></div>';
  output += '\n<!-- End of JChords rendered song -->\n';

  return output;
}
