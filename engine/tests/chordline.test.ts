import { ChordLine } from 'src/parser/lines/chordline';
import { describe, expect, test } from 'vitest';

describe('Parse chord line', () => {
  // not gonna test chord parsing cus I trust chord symbol

  test('plain', () => {
    const result = ChordLine.tryParse('  C  Am  G', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([
      { chord: 'C', duration: undefined },
      { chord: 'Am', duration: undefined },
      { chord: 'G', duration: undefined },
    ]);
  });

  test('repeat chords', () => {
    const result = ChordLine.tryParse('C % G %', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([
      { chord: 'C', duration: undefined },
      { chord: 'C', duration: undefined },
      { chord: 'G', duration: undefined },
      { chord: 'G', duration: undefined },
    ]);
  });

  test('repeat repeat chords', () => {
    const result = ChordLine.tryParse('C % % %', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([
      { chord: 'C', duration: undefined },
      { chord: 'C', duration: undefined },
      { chord: 'C', duration: undefined },
      { chord: 'C', duration: undefined },
    ]);
  });

  test('durations', () => {
    const result = ChordLine.tryParse('D...  Em7.  F#.. G..', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([
      { chord: 'D', duration: 3 },
      { chord: 'Em7', duration: 1 },
      { chord: 'F#', duration: 2 },
      { chord: 'G', duration: 2 },
    ]);
  });

  test('sub beat groups', () => {
    const result = ChordLine.tryParse('  D...  [ Em7 F# G ]', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([{ chord: 'D', duration: 3 }, ['Em7', 'F#', 'G']]);
  });

  test('minimal whitespace', () => {
    const result = ChordLine.tryParse('C[B Am G]C...Am.%', 0);
    expect(result).not.toBeNull();
    expect(result!.chords).toEqual([
      { chord: 'C', duration: undefined },
      ['B', 'Am', 'G'],
      { chord: 'C', duration: 3 },
      { chord: 'Am', duration: 1 },
      { chord: 'Am', duration: undefined },
    ]);
  });

  test('duration in sub beat group', () => {
    expect(ChordLine.tryParse('  D...  [ Em7.. F# G ]', 0)).toBeNull();
  });

  test('short sub beat group', () => {
    expect(ChordLine.tryParse('D...  [ Em7 ]', 0)).toBeNull();
  });

  test('empty sub beat group', () => {
    expect(ChordLine.tryParse('D...  [ ]', 0)).toBeNull();
  });

  test('unclosed sub beat group', () => {
    expect(ChordLine.tryParse('D...  [ Em7 ', 0)).toBeNull();
  });

  test('malformed repeat', () => {
    expect(ChordLine.tryParse('D %%', 0)).toBeNull();
  });

  test('non-chord', () => {
    expect(ChordLine.tryParse('D poop C', 0)).toBeNull();
  });

  test('empty line', () => {
    expect(ChordLine.tryParse('', 0)).toBeNull();
  });
});
