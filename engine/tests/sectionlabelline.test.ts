import { sectionLabelShorthands, sectionLabelSymbol } from 'src/constants';
import { SectionLabelLine } from 'src/parser/lines/sectionlabelline';
import { describe, expect, test } from 'vitest';

describe('Parse section label line', () => {
  test('plain', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus`, 0);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Chorus');
  });

  test('capitalize', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}outro`, 0);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Outro');
  });

  test('shorthands', () => {
    Object.keys(sectionLabelShorthands).forEach((abbreviation: string) => {
      const result = SectionLabelLine.tryParse(sectionLabelSymbol + abbreviation, 0);
      expect(result).not.toBeNull();
      expect(result!.label).toBe(sectionLabelShorthands[abbreviation]);
    });
  });

  test('long random', () => {
    const result = SectionLabelLine.tryParse(
      `${sectionLabelSymbol}asdfjhaFHJNxcvKDKJNQOfasdfnpaoOpSCFNJKJziizN`,
      0,
    );
    expect(result).not.toBeNull();
    expect(result!.label).toBe('AsdfjhaFHJNxcvKDKJNQOfasdfnpaoOpSCFNJKJziizN');
  });

  test('missing marker', () => {
    expect(SectionLabelLine.tryParse('Chorus', 0)).toBeNull();
  });

  test('multi-word', () => {
    expect(SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus two`, 0)).toBeNull();
  });

  test('empty label', () => {
    expect(SectionLabelLine.tryParse(sectionLabelSymbol, 0)).toBeNull();
  });

  test('non-alpha character', () => {
    expect(SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus2`, 0)).toBeNull();
  });

  test('empty line', () => {
    expect(SectionLabelLine.tryParse('', 0)).toBeNull();
  });
});
