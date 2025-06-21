
import { ParserError } from 'src/classes/parsererror';
import { allowedTimeSignatures } from 'src/constants';
import { parseTimeSignature } from 'src/functions/parser/parsetimesignature';
import { describe, test, expect } from 'vitest';


describe('parseTimeSignature()', () => {

  test('plain 4/4', () => {
    const result = parseTimeSignature("4/4");
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(4);
    expect(result!.denominator).toBe(4);
  });

  test('plain 6/8', () => {
    const result = parseTimeSignature("6/8");
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(6);
    expect(result!.denominator).toBe(8);
  });

  test('plain 1/2', () => {
    const result = parseTimeSignature("1/2");
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(1);
    expect(result!.denominator).toBe(2);
  });

  test('plain 12/8', () => {
    const result = parseTimeSignature("12/8");
    expect(result).not.toBeNull();
    expect(result!.numerator).toBe(12);
    expect(result!.denominator).toBe(8);
  });


  test('invalid character letter', () => {
    expect(parseTimeSignature("a/4")).toBeNull();
  });
  test('extra characters', () => {
    expect(parseTimeSignature("4/4/4")).toBeNull();
  });
  test('invalid character dot', () => {
    expect(parseTimeSignature("4.4")).toBeNull();
  });
  test('whitespace before', () => {
    expect(parseTimeSignature(" 4/4")).toBeNull();
  });
  test('whitespace between', () => {
    expect(parseTimeSignature("4/ 4")).toBeNull();
  });
});