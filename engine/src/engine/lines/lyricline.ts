import { chordPositionMarker } from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

export class LyricLine implements ParsedLine {
  type = LineType.Lyric;

  lyrics: string;
  chordPositions: number[];

  constructor(lyrics: string, chordPositions: number[]) {
    this.lyrics = lyrics;
    this.chordPositions = chordPositions;
  }

  static tryParse = (line: string): LyricLine => {
    let lineWithoutMarkers = '';

    const chordPositions = [];
    for (let i = 0; i < line.length; i++) {
      const c = line.charAt(i);
      if (c == chordPositionMarker) {
        chordPositions.push(lineWithoutMarkers.length);
      } else {
        lineWithoutMarkers += c;
      }
    }

    // Everything is a lyric line
    return new LyricLine(lineWithoutMarkers, chordPositions);
  };

  render(state: RenderState, opts: RenderOptions): string {
    return '<!-- lyric line TODO -->\n';
  }
}
