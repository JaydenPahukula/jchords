import { TimeSignatureLine } from 'src/parser/lines/timesignatureline';
import { describe, expect, test } from 'vitest';

describe('Parse time signature line', () => {
  test('plain 4/4', () => {
    const result = TimeSignatureLine.tryParse('4/4');
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(4);
    expect(result!.denominator).toBe(4);
  });

  test('plain 6/8', () => {
    const result = TimeSignatureLine.tryParse('6/8');
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(6);
    expect(result!.denominator).toBe(8);
  });

  test('plain 1/2', () => {
    const result = TimeSignatureLine.tryParse('1/2');
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(1);
    expect(result!.denominator).toBe(2);
  });

  test('plain 12/8', () => {
    const result = TimeSignatureLine.tryParse('12/8');
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(12);
    expect(result!.denominator).toBe(8);
  });

  test('invalid character letter', () => {
    expect(TimeSignatureLine.tryParse('a/4')).toBeNull();
  });

  test('extra characters', () => {
    expect(TimeSignatureLine.tryParse('4/4/4')).toBeNull();
  });

  test('invalid character dot', () => {
    expect(TimeSignatureLine.tryParse('4.4')).toBeNull();
  });

  test('whitespace before', () => {
    expect(TimeSignatureLine.tryParse(' 4/4')).toBeNull();
  });

  test('whitespace between', () => {
    expect(TimeSignatureLine.tryParse('4/ 4')).toBeNull();
  });

  test('empty line', () => {
    expect(TimeSignatureLine.tryParse('')).toBeNull();
  });
});
