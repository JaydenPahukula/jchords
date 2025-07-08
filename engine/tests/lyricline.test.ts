import { chordPositionMarker } from 'src/constants/symbols';
import { LyricLine } from 'src/engine/lines/lyricline';
import { describe, expect, test } from 'vitest';

describe('Parse lyric line', () => {
  test('no markers', () => {
    const result = LyricLine.tryParse('Old McDonald had a farm');
    expect(result.lyrics).toEqual('Old McDonald had a farm');
    expect(result.chordPositions.length).toBe(0);
  });

  test('with markers', () => {
    const result = LyricLine.tryParse(
      `${chordPositionMarker}Old McDonald ${chordPositionMarker}had a ${chordPositionMarker}farm`,
    );
    expect(result.lyrics).toEqual('Old McDonald had a farm');
    expect(result.chordPositions).toEqual([0, 13, 19]);
  });

  test('consecutive markers', () => {
    const result = LyricLine.tryParse(
      `${chordPositionMarker}${chordPositionMarker}Old McDonald had a ${chordPositionMarker}farm`,
    );
    expect(result.lyrics).toEqual('Old McDonald had a farm');
    expect(result.chordPositions).toEqual([0, 0, 19]);
  });

  test('only markers', () => {
    const result = LyricLine.tryParse(
      `     ${chordPositionMarker}    ${chordPositionMarker}       ${chordPositionMarker}`,
    );
    expect(result.lyrics).toEqual('                ');
    expect(result.chordPositions).toEqual([5, 9, 16]);
  });
});
