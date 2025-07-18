import { Chord, ChordParseFailure, chordParserFactory, chordRendererFactory } from 'chord-symbol';
import {
  chordClassName,
  chordLineClassName,
  formatSymbolClassName,
  lineClassName,
} from 'src/classes';
import { LyricLine } from 'src/engine/lines/lyricline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import {
  barSeparator,
  chordDurationSymbol,
  repeatChordSymbol,
  subBeatChordGroupEndSymbol,
  subBeatChordGroupStartSymbol,
} from 'src/symbols';
import { BarAlignmentGroup } from 'src/types/baralignmentgroup';
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

  /** Undefined if there isn't a following lyric line */
  lyrics: LyricLine | undefined;
  /** Should be populated BEFORE this line attempts to self-render, same length as `this.chords` */
  renderedChords: string[] | undefined;
  renderAlignment: 'lyrics' | 'bars' | 'none' | undefined;
  /** For memoizing the result of `groupChordsIntoBars` */
  bars: Bar[] | undefined;

  constructor(
    public chords: (ChordWithDuration | SubBeatChordGroup)[],
    public timeSignature: TimeSignature,
    public key: Key | undefined,
    public barAlignmentGroup: BarAlignmentGroup,
  ) {
    this.lyrics = undefined;
    // ^ lyric line parsing can change this value
    this.renderedChords = undefined;
    this.renderAlignment = undefined;
    this.bars = undefined;
  }

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    let pos = 0;
    const chords: (ChordWithDuration | SubBeatChordGroup)[] = [];
    let inSubBeatGroup = false;
    let subBeatGroup: Chord[] = [];
    let lastChord: string | null = null;

    const chordParseFunction = chordParserFactory({
      key: state.key?.render(),
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

    if (state.currentBarAlignmentGroup === null)
      state.currentBarAlignmentGroup = new BarAlignmentGroup();

    const thisLine = new ChordLine(
      chords,
      state.timeSignature,
      state.key,
      state.currentBarAlignmentGroup,
    );
    state.lastLastChordLine = state.lastChordLine;
    state.lastChordLine = thisLine;
    state.currentBarAlignmentGroup.add(thisLine);
    return thisLine;
  };

  render = (opts: RenderOptions): string => {
    if (this.renderedChords === undefined || this.renderAlignment === undefined)
      this.prerenderChords(opts);

    let output = '';
    switch (this.renderAlignment) {
      case 'lyrics':
        // align with lyrics
        output += `<span class="${lineClassName} ${chordLineClassName}">`;

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
          const markerPos = this.lyrics!.markers[i];

          // moving chord to its assigned position
          const assignedPos = markerPos ?? this.lyrics!.lyrics.length;
          while (assignedPos + accumulatedShift > currentPos) {
            output += ' ';
            currentPos += 1;
          }

          output += `<span class="aligned-chord ${chordClassName}">${chord}</span> `;
          currentPos += chord.length + 1;

          // checking if space needs to be added in the lyric line
          const nextMarkerPos = this.lyrics!.markers[i + 1];
          if (
            markerPos !== undefined &&
            nextMarkerPos !== undefined &&
            i + 1 != chordsToAlign.length
          ) {
            const distToNextMarker = nextMarkerPos + accumulatedShift - currentPos;
            if (distToNextMarker < 0) {
              // grow the width of this marker in the lyric line
              this.lyrics!.markerWidths[i + 1] = -distToNextMarker;
              accumulatedShift += -distToNextMarker;
            }
          }
        }
        output += `<br /></span>`;
        return output;
      case 'bars':
        // align with bars and show durations and stuff
        const bars = this.groupChordsIntoBars(opts);
        if (bars === null) return this.renderSimple(opts);

        const targetBarLengths = this.barAlignmentGroup.getBarLengths(opts);
        const barSeparatorHTML = `<span class="${formatSymbolClassName}">${barSeparator}</span>`;

        output = `<span class="${lineClassName} ${chordLineClassName}">`;
        output += barSeparatorHTML;
        for (let i = 0; i < bars.length; i++) {
          const bar = bars[i]!;
          let barLength = 0;
          const chordStrings: string[] = bar.map((chord) => {
            let chordString = '';
            chordString += `<span class="${chordClassName}">${chord.chordString}</span>`;
            barLength += chord.chordString.length;
            if (chord.duration > 0) {
              chordString += `<span class="${formatSymbolClassName}">${chordDurationSymbol.repeat(chord.duration)}</span>`;
              barLength += chord.duration;
            }
            chordString += ' ';
            barLength += 1;
            return chordString;
          });
          const targetBarLength = targetBarLengths[i];
          if (targetBarLength === undefined) continue;

          // add spaces to each chord in a reverse round robin fashion until the
          // bar reaches the target length
          let chordIndex = chordStrings.length - 1;
          while (barLength < targetBarLength) {
            chordStrings[chordIndex] += ' ';
            barLength += 1;
            if (--chordIndex < 0) chordIndex = chordStrings.length - 1;
          }
          for (const chordString of chordStrings) output += chordString;

          if (bar.complete) output += barSeparatorHTML;
        }
        output += `<br /></span>`;
        return output;
      case 'none':
      case undefined:
        return this.renderSimple(opts);
    }
  };

  /** Fallback chord rendering, with no duration markers or alignment at all */
  renderSimple(opts: RenderOptions): string {
    let output = `<span class="${lineClassName} ${chordLineClassName}">`;
    this.renderedChords!.forEach((chord: string) => {
      output += `<span class="${chordClassName}">${chord}</span>  `;
    });
    output += `<br /></span>`;
    return output;
  }

  /**
   * Prerenders the chord symbols individually before the main rendering of the line, because the width of the rendered chord
   * is needed by other lines before rendering
   */
  prerenderChords(opts: RenderOptions) {
    const chordRenderFunction = chordRendererFactory({
      printer: 'text',
      useShortNamings: true,
      transposeValue: opts.transpose,
      accidental: opts.accidentalPreference,
    });
    this.renderedChords = [];

    // rendering chords
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
      }
    }

    // determining alignment type
    if (this.lyrics !== undefined && opts.alignChordsWithLyrics) {
      this.renderAlignment = 'lyrics';
    } else if (opts.showChordTimings) {
      this.renderAlignment = 'bars';
    } else {
      this.renderAlignment = 'none';
    }
  }

  /**
   * A method that returns a 2d array of each bar, and the prerendered chords/durations within.
   *
   * The duration field determines how many dots to render, NOT the actual duration of the chord
   */
  groupChordsIntoBars(opts: RenderOptions): Bar[] | null {
    if (this.bars !== undefined) return this.bars;
    if (this.renderedChords === undefined || this.renderAlignment === undefined)
      this.prerenderChords(opts);
    if (this.renderAlignment !== 'bars') return null;

    type ChordToRender = {
      chordString: string;
      duration: number;
      forceRenderDuration?: boolean;
    };
    const beatsPerBar = this.timeSignature![0];
    const chordsToRender: ChordToRender[] = [];
    for (let i = 0; i < this.chords.length; i++) {
      const chordOrGroup = this.chords[i]!;
      const rendered = this.renderedChords![i]!;
      if (rendered.startsWith(subBeatChordGroupStartSymbol)) {
        // chord group
        chordsToRender.push({
          chordString: rendered,
          duration: 1,
        });
      } else {
        // chord
        const chord = chordOrGroup as ChordWithDuration;
        chordsToRender.push({
          chordString: rendered,
          duration: chord.duration ?? beatsPerBar,
        });
      }
    }

    let beat = 0;
    const bars: Bar[] = [];
    let currentBar: Bar = Object.assign([], { complete: false });
    for (const chord of chordsToRender) {
      if (beat + chord.duration >= beatsPerBar) {
        // bar is completed
        const overflowBeats = beat + chord.duration - beatsPerBar;
        if (overflowBeats > 0) {
          chord.duration -= overflowBeats;
          chord.forceRenderDuration = true; // force render the dots
        }
        currentBar.push(chord);
        currentBar.complete = true;
        bars.push(currentBar);
        currentBar = Object.assign([], { complete: false });
        beat = 0;
        if (overflowBeats > 0) {
          currentBar.push({ chordString: '', duration: overflowBeats });
          beat = overflowBeats;
        }
      } else {
        // incomplete bar
        currentBar.push(chord);
        beat += chord.duration;
      }
    }
    if (currentBar.length !== 0) {
      bars.push(currentBar);
    }

    for (const bar of bars) {
      if (bar.length === 0) continue;

      if (
        bar.length === 1 &&
        bar[0]!.duration === beatsPerBar &&
        bar[0]!.forceRenderDuration !== true
      ) {
        // bars with one chord don't render duration symbols
        bar[0]!.duration = 0;
        continue;
      } else if (bar.length > 1) {
        // bars with all chords being the same duration don't render duration symbols
        const duration = bar[0]!.duration;
        let allSame = true;
        for (let i = 1; i < bar.length; i++) {
          if (bar[i]!.duration !== duration || bar[i]!.forceRenderDuration === true) {
            allSame = false;
            break;
          }
        }
        if (allSame) {
          bar.forEach((chord) => {
            chord.duration = 0;
          });
          continue;
        }
      }
    }

    // memoizing
    this.bars = bars;

    return bars;
  }
}

/**
 * A chord that has been parsed by chord symbol, with duration information
 */
type ChordWithDuration = {
  chord: Chord;
  duration: number | undefined;
};

/** Like a list of `ChordWithDuration`s, but with no durations */
type SubBeatChordGroup = [Chord, Chord, ...Chord[]];

type Bar = {
  chordString: string;
  duration: number;
  forceRenderDuration?: boolean;
}[] & {
  complete: boolean;
};
