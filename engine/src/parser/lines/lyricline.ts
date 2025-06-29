import { chordPositionMarker } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class LyricLine implements ParsedLine {
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

  render(state: RenderState): string {
    throw new Error('Method not implemented.');
  }
}
