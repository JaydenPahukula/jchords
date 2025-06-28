import { repeatChordSymbol } from 'src/constants';
import { RepeatChordsLine } from 'src/parser/lines/repeatchordsline';
import { describe, expect, test } from 'vitest';

describe('Parse section label line', () => {
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
