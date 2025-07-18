import { ChordLine } from 'src/engine/lines/chordline';
import { RenderOptions } from 'src/types/renderopts';

const MIN_BAR_LENGTH = 5;

export class BarAlignmentGroup {
  chordLines: ChordLine[];
  private barLengths: number[] | undefined;

  constructor(chordLines: ChordLine[] = []) {
    this.chordLines = chordLines;
    this.barLengths = undefined;
  }

  add(newLine: ChordLine) {
    this.chordLines.push(newLine);
  }

  getBarLengths(opts: RenderOptions): number[] {
    // memoization
    if (this.barLengths !== undefined && this.barLengths.length === this.chordLines.length)
      return this.barLengths;

    // calcuting
    const lengths: number[] = [];
    for (const chordLine of this.chordLines) {
      const bars = chordLine.groupChordsIntoBars(opts);

      if (bars === null) continue;
      for (let i = 0; i < bars.length; i++) {
        let barLength = 0;
        const bar = bars[i]!;
        for (const chord of bar) {
          barLength += chord.chordString.length + chord.duration + 1;
        }
        if (i < lengths.length) {
          lengths[i]! = Math.max(lengths[i]!, barLength);
        } else {
          lengths.push(barLength);
        }
      }
    }
    this.barLengths = lengths.map((n) => {
      return Math.max(n, MIN_BAR_LENGTH);
    });
    console.log(this.chordLines, this.barLengths);
    return this.barLengths;
  }
}
