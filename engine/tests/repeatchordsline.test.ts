import { errorClassName } from 'src/constants/classes';
import { repeatChordSymbol } from 'src/constants/symbols';
import { ChordLine } from 'src/engine/lines/chordline';
import { RepeatChordsLine } from 'src/engine/lines/repeatchordsline';
import { defaultRenderOptions, RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';
import { describe, expect, test } from 'vitest';

describe('Parse repeat chords line', () => {
  test('last line', () => {
    const result = RepeatChordsLine.tryParse(repeatChordSymbol);
    expect(result).not.toBeNull();
    expect(result!.precedingLineNum).toBe(1);
  });

  test('second to last line', () => {
    const result = RepeatChordsLine.tryParse(repeatChordSymbol + repeatChordSymbol);
    expect(result).not.toBeNull();
    expect(result!.precedingLineNum).toBe(2);
  });

  test('too many', () => {
    const result = RepeatChordsLine.tryParse(repeatChordSymbol.repeat(3));
    expect(result).toBeNull();
  });

  test('whitespace between', () => {
    const result = RepeatChordsLine.tryParse(repeatChordSymbol + ' ' + repeatChordSymbol);
    expect(result).toBeNull();
  });

  test('empty line', () => {
    expect(RepeatChordsLine.tryParse('')).toBeNull();
  });
});

describe('Render repeat chords line', () => {
  const initialState: RenderState = {
    key: undefined,
    timeSignature: undefined,
    currentLine: 0,
    lines: [],
    lastChordLine: undefined,
    lastLastChordLine: undefined,
    currentSection: undefined,
  };

  test('plain', () => {
    const line1: ChordLine = ChordLine.tryParse('C A G')!;
    const line2: RepeatChordsLine = new RepeatChordsLine(1);
    const line3: ChordLine = ChordLine.tryParse('A G D')!;
    const line4: RepeatChordsLine = new RepeatChordsLine(2);
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line1, line2, line3, line4],
    };

    const line1Result = line1.render(state, opts);
    expect(line2.render(state, opts)).toEqual(line1Result);
    line3.render(state, opts);
    expect(line4.render(state, opts)).toEqual(line1Result);
  });

  test('no preceding chord line', () => {
    const line1: RepeatChordsLine = new RepeatChordsLine(1);
    const line2: ChordLine = ChordLine.tryParse('C A G')!;
    const line3: RepeatChordsLine = new RepeatChordsLine(2);
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line1, line2, line3],
    };

    const container = document.createElement('div');
    container.innerHTML = line1.render(state, opts);
    expect(container.querySelectorAll('.' + errorClassName)).toHaveLength(1);

    state.lastChordLine = line2;

    container.innerHTML = line3.render(state, opts);
    expect(container.querySelectorAll('.' + errorClassName)).toHaveLength(1);
  });
});
