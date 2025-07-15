import { Chord, ChordParseFailure, chordParserFactory, chordRendererFactory } from 'chord-symbol';
import { chordClassName, chordLineClassName, formatterClassName } from 'src/constants/classes';
import {
  barSeparator,
  chordDurationSymbol,
  repeatChordSymbol,
  subBeatChordGroupEndSymbol,
  subBeatChordGroupStartSymbol,
} from 'src/constants/symbols';
import { LyricLine } from 'src/engine/lines/lyricline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { Key } from 'src/types/key';
import { RenderOptions } from 'src/types/renderopts';
import { TimeSignature } from 'src/types/timesignature';

/**
 * Represents a parsed chord line
 *
 * Parses each individual chord twice, once during line parsing to check if it is
 * even a chord, then again during rendering because the rendering process has context,
 * so we can parse the chords with respect to the key.
 */
export class ChordLine implements ParsedLine {
  type = LineType.Chord;

  chords: (ChordWithDuration | SubBeatChordGroup)[];
  timeSignature: TimeSignature | undefined;
  key: Key | undefined;
  originalLine: string;
  /** Undefined if there isn't a following lyric line */
  lyrics: LyricLine | undefined;
  /** Should be populated BEFORE this line attempts to self-render, same length as `this.chords` */
  renderedChords: string[] | undefined;

  constructor(
    chords: (ChordWithDuration | SubBeatChordGroup)[],
    timeSignature: TimeSignature | undefined,
    key: Key | undefined,
    originalLine: string,
  ) {
    this.chords = chords;
    this.timeSignature = timeSignature;
    this.key = key;
    this.originalLine = originalLine;

    this.lyrics = undefined;
    // ^ lyric line parsing can change this value
    this.renderedChords = undefined;
  }

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    let pos = 0;
    const chords: (ChordWithDuration | SubBeatChordGroup)[] = [];
    let inSubBeatGroup = false;
    let subBeatGroup: Chord[] = [];
    let lastChord: string | null = null;

    const chordParseFunction = chordParserFactory({
      key: (state.key as string) ?? undefined,
    });

    // parsing char by char
    while (pos < line.length) {
      const currentChar = line[pos]!;

      if (currentChar == ' ') {
        // do nothing
      } else if (currentChar == chordDurationSymbol) {
        // chord duration is parsed immediately after chord parsing
        return null;
      } else if (currentChar == subBeatChordGroupStartSymbol) {
        // start of sub beat group
        if (inSubBeatGroup) {
          return null;
        } else {
          inSubBeatGroup = true;
          lastChord = null;
          subBeatGroup = [];
        }
      } else if (currentChar == subBeatChordGroupEndSymbol) {
        // end of sub beat group
        if (!inSubBeatGroup) return null;
        else {
          inSubBeatGroup = false;
          if (subBeatGroup.length >= 2) {
            chords.push(subBeatGroup as SubBeatChordGroup);
          } else return null;
        }
      } else {
        // maybe a chord, get all characters until the next special symbol and check
        let currentString = currentChar;
        while (
          pos + 1 < line.length &&
          line[pos + 1] !== subBeatChordGroupStartSymbol &&
          line[pos + 1] !== subBeatChordGroupEndSymbol &&
          line[pos + 1] !== chordDurationSymbol &&
          line[pos + 1] !== ' '
        ) {
          pos++;
          currentString += line[pos];
        }

        if (currentString === repeatChordSymbol) {
          // retrieve last chord to repeat
          if (lastChord === null) return null;
          currentString = lastChord;
        }

        const maybeChord = chordParseFunction(currentString);
        if ((maybeChord as ChordParseFailure).error !== undefined) return null; // not a chord
        const chord = maybeChord as Chord;

        // parse duration
        let duration;
        while (pos + 1 < line.length && line[pos + 1] === chordDurationSymbol) {
          pos++;
          if (duration === undefined) duration = 0;
          duration++;
        }

        if (duration !== undefined && inSubBeatGroup) return null; // cant define durations in a sub beat group

        if (inSubBeatGroup) {
          subBeatGroup.push(chord);
        } else {
          chords.push({
            chord: chord,
            duration: duration,
          });
        }
        lastChord = currentString;
      }

      pos++;
    }

    if (chords.length == 0 || inSubBeatGroup) return null;

    const newLine = new ChordLine(chords, state.timeSignature, state.key, line);
    state.lastLastChordLine = state.lastChordLine;
    state.lastChordLine = newLine;
    return newLine;
  };

  // yeah ik this function is kinda spaghetti, sowwy
  render = (opts: RenderOptions, state: RenderState): string => {
    if (this.renderedChords === undefined) this.prerenderChords(opts);

    if (this.lyrics !== undefined && opts.alignChordsWithLyrics) {
      // align with lyrics
      let output = `<span class="${chordLineClassName}">`;

      let currentPos = 0;
      let accumulatedShift = 0; // how much the marker positions need to be shifted due to expanding previous ones to fit the chords
      const chordsToAlign: string[] = [];
      for (const chordOrGroup of this.renderedChords!) {
        if (chordOrGroup.startsWith(subBeatChordGroupStartSymbol)) {
          for (const chord of chordOrGroup.split(' ')) chordsToAlign.push(chord); // this is a chord group
        } else {
          chordsToAlign.push(chordOrGroup); // this is a chord
        }
      }
      for (let i = 0; i < chordsToAlign.length; i++) {
        const chord = chordsToAlign[i]!;
        const markerPos = this.lyrics.markers[i];

        // moving chord to its assigned position
        const assignedPos = markerPos ?? this.lyrics.lyrics.length;
        while (assignedPos + accumulatedShift > currentPos) {
          output += ' ';
          currentPos += 1;
        }

        output += `<span class="aligned-chord ${chordClassName}">${chord}</span> `;
        currentPos += chord.length + 1;

        // checking if space needs to be added in the lyric line
        const nextMarkerPos = this.lyrics.markers[i + 1];
        if (
          markerPos !== undefined &&
          nextMarkerPos !== undefined &&
          i + 1 != chordsToAlign.length
        ) {
          const distToNextMarker = nextMarkerPos + accumulatedShift - currentPos;
          if (distToNextMarker < 0) {
            // grow the width of this marker in the lyric line
            this.lyrics.markerWidths[i + 1] = -distToNextMarker;
            accumulatedShift += -distToNextMarker;
          }
        }
      }
      output += `<br /></span>`;
      return output;
    } else if (opts.showChordTimings && this.timeSignature !== undefined) {
      // align with duration
      let output = `<span class="${chordLineClassName}">`;

      const barSize = this.timeSignature[0];
      type ChordToRender = {
        string: string;
        duration: number;
      };
      const chordsToRender: ChordToRender[] = [];
      for (let i = 0; i < this.chords.length; i++) {
        const chordOrGroup = this.chords[i]!;
        const rendered = this.renderedChords![i]!;
        if (rendered.startsWith(subBeatChordGroupStartSymbol)) {
          // chord group
          chordsToRender.push({
            string: rendered,
            duration: 1,
          });
        } else {
          // chord
          const chord = chordOrGroup as ChordWithDuration;
          chordsToRender.push({
            string: rendered,
            duration: chord.duration ?? barSize,
          });
        }
      }

      let beat = 0;
      const bars: ChordToRender[][] = [];
      let currentBar: ChordToRender[] = [];
      for (const chord of chordsToRender) {
        if (beat + chord.duration > barSize) {
          // overflowing bar, give up with alignment
          return this.simpleRender(opts);
        } else if (beat + chord.duration == barSize) {
          // completed bar
          currentBar.push(chord);
          bars.push(currentBar);
          currentBar = [];
          beat = 0;
        } else {
          // incomplete bar
          currentBar.push(chord);
          beat += chord.duration;
        }
      }
      if (currentBar.length !== 0) bars.push(currentBar);

      output += `<span class="${formatterClassName}">${barSeparator}</span>`;
      for (const bar of bars) {
        if (bar.length === 1 && bar[0]!.duration == barSize) {
          output += `<span class="${chordClassName}">${bar[0]!.string}</span>    <span class="${formatterClassName}">${barSeparator}</span>`;
        } else if (
          // if the bar is 2 equally spaced chords, no need render the durations
          barSize % 2 === 0 &&
          bar.length === 2 &&
          bar[0]!.duration === barSize / 2 &&
          bar[1]!.duration === barSize / 2
        ) {
          for (const chord of bar) {
            output += `<span class="${chordClassName}">${chord.string}</span>  `;
          }
          output += `<span class="${formatterClassName}">${barSeparator}</span>`;
        } else {
          let beats = 0;
          for (const chord of bar) {
            output += `<span class="${chordClassName}">${chord.string}</span>`;
            if (!(chord.string.startsWith(subBeatChordGroupStartSymbol) && chord.duration === 1))
              output += `<span class="${formatterClassName}">${chordDurationSymbol.repeat(chord.duration)}</span>`;
            output += ' ';
            beats += chord.duration;
          }
          if (beats === barSize)
            // only render closing separator if it is a full bar
            output += `<span class="${formatterClassName}">${barSeparator}</span>`;
        }
      }
      output += `<br /></span>`;
      return output;
    } else {
      return this.simpleRender(opts);
    }
  };

  /** Fallback chord rendering, with no duration markers or alignment at all */
  simpleRender(opts: RenderOptions): string {
    let output = `<span class="${chordLineClassName}">`;
    this.renderedChords!.forEach((chord: string) => {
      output += `<span class="${chordClassName}">${chord}</span>  `;
    });
    output += `<br /></span>`;
    return output;
  }

  /**
   * Prerenders the chords individually before the main rendering of the line, because the width of the rendered chord
   * is needed by other lines before rendering
   */
  prerenderChords(opts: RenderOptions) {
    const chordRenderFunction = chordRendererFactory({ printer: 'text', useShortNamings: true });
    this.renderedChords = [];

    for (let i = 0; i < this.chords.length; i++) {
      const chordOrGroup = this.chords[i]!;
      if ((chordOrGroup as ChordWithDuration).chord !== undefined) {
        const chord = chordOrGroup as ChordWithDuration;
        this.renderedChords.push(chordRenderFunction(chord.chord));
      } else {
        const group = chordOrGroup as SubBeatChordGroup;
        this.renderedChords.push(
          subBeatChordGroupStartSymbol +
            group.map(chordRenderFunction).join(' ') +
            subBeatChordGroupEndSymbol,
        );

        /*for (let j = 0; j < group.length; j++) {
          let rendered = chordRenderFunction(group[j]!);
          if (
            (this.lyrics === undefined || !opts.alignChordsWithLyrics) &&
            opts.showChordDurations
          ) {
            // render sub beat symbols
            if (j === 0) rendered = subBeatChordGroupStartSymbol + rendered;
            if (j + 1 === group.length) rendered = rendered + subBeatChordGroupEndSymbol;
          }
          this.renderedChords.push(rendered);
        }*/
      }
    }
  }
}

/**
 * A chord that has been parsed by chord symbol, with duration information
 */
type ChordWithDuration = {
  chord: Chord;
  duration: number | undefined;
};

/** Like a list of `RawChord`s, but with no durations */
type SubBeatChordGroup = [Chord, Chord, ...Chord[]];
