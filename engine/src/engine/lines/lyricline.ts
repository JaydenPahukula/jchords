import { lyricLineClassName } from 'src/constants/classes';
import { chordPositionMarker } from 'src/constants/symbols';
import { ChordLine } from 'src/engine/lines/chordline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { RenderOptions } from 'src/types/renderopts';

export class LyricLine implements ParsedLine {
  type = LineType.Lyric;

  lyrics: string;
  markers: number[];
  markerWidths: number[];

  constructor(lyrics: string, markerPositions: number[]) {
    this.lyrics = lyrics;
    this.markers = markerPositions;
    this.markerWidths = new Array(markerPositions.length).fill(0);
  }

  static tryParse = (line: string, state: ParseState): LyricLine => {
    let lineWithoutMarkers = '';

    const markerPositions = [];
    for (let i = 0; i < line.length; i++) {
      const c = line.charAt(i);
      if (c == chordPositionMarker) {
        markerPositions.push(lineWithoutMarkers.length);
      } else {
        lineWithoutMarkers += c;
      }
    }

    const newLine = new LyricLine(lineWithoutMarkers, markerPositions);

    const previousLine = state.previousLines[state.lineNum - 1];
    if (previousLine?.type == LineType.Chord) {
      (previousLine as ChordLine).lyrics = newLine;
    }

    // Everything is a lyric line
    return newLine;
  };

  render(opts: RenderOptions, state: RenderState): string {
    let output = `<span class="${lyricLineClassName}">`;
    //output += `\n\n<!--\nmarker widths: ${this.markerWidths}\n-->\n\n`;
    let currentPos = 0;
    for (let i = 0; i < this.markers.length; i++) {
      const markerPos = this.markers[i]!;
      const markerWidth = this.markerWidths[i]!;
      output += ' '.repeat(markerWidth);
      output += this.lyrics.slice(currentPos, markerPos + 1);
      currentPos = markerPos + 1;
    }
    output += this.lyrics.slice(currentPos);
    output += '<br /></span>';
    return output;
  }
}
