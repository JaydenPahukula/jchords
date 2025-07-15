import { ParsedLine } from 'src/engine/parse';
import { ParsedSong } from 'src/types/parsedsong';
import { defaultRenderOptions, RenderOptions } from 'src/types/renderopts';
import { songClassName } from '../classes';

export function renderSong(song: ParsedSong, opts?: RenderOptions): string {
  if (opts === undefined) opts = defaultRenderOptions;

  let output = '';

  // prerendering chords to determine bar alignment group widths
  for (const group of song.barAlignmentGroups) {
    for (const chordLine of group) chordLine.prerenderChords(opts);
  }

  // main rendering
  output += '<!-- Start of JChords rendered song -->\n';
  output += `<pre class="${songClassName}">`;

  const state: RenderState = {};
  song.lines.map((line: ParsedLine) => {
    output += line.render(opts, state);
  });

  output += '</pre>';
  output += '\n<!-- End of JChords rendered song -->\n';

  return output;
}

export type RenderState = {};
