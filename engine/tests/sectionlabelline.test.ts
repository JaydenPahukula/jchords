import { sectionLabelShorthands } from 'src/constants';
import { sectionLabelSymbol } from 'src/constants/symbols';
import { SectionLabelLine } from 'src/engine/lines/sectionlabelline';
import { describe, expect, test } from 'vitest';

describe('Parse section label line', () => {
  test('plain', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus`);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Chorus');
  });

  test('capitalize', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}outro`);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Outro');
  });

  test('shorthands', () => {
    Object.keys(sectionLabelShorthands).forEach((abbreviation: string) => {
      const result = SectionLabelLine.tryParse(sectionLabelSymbol + abbreviation);
      expect(result).not.toBeNull();
      expect(result!.label).toBe(sectionLabelShorthands[abbreviation]);
    });
  });

  test('long random', () => {
    const result = SectionLabelLine.tryParse(
      `${sectionLabelSymbol}asdfjhaFHJNxcvKDKJNQOfasdfnpaoOpSCFNJKJziizN`,
    );
    expect(result).not.toBeNull();
    expect(result!.label).toBe('AsdfjhaFHJNxcvKDKJNQOfasdfnpaoOpSCFNJKJziizN');
  });

  test('missing marker', () => {
    expect(SectionLabelLine.tryParse('Chorus')).toBeNull();
  });

  test('multi-word', () => {
    expect(SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus two`)).toBeNull();
  });

  test('empty label', () => {
    expect(SectionLabelLine.tryParse(sectionLabelSymbol)).toBeNull();
  });

  test('non-alpha character', () => {
    expect(SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus2`)).toBeNull();
  });

  test('empty line', () => {
    expect(SectionLabelLine.tryParse('')).toBeNull();
  });
});
