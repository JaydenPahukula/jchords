import { barSeparator, sectionLabelShorthands, sectionLabelSymbol } from 'src/constants';
import { SectionLabelLine } from 'src/parser/lines/sectionlabelline';
import { describe, expect, test } from 'vitest';

describe('Parse section label line', () => {
  test('plain', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}Chorus`);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Chorus');
    expect(result!.renderBarSeparators).toBe(false);
  });

  test('with bar separator', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}${barSeparator}Chorus`);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Chorus');
    expect(result!.renderBarSeparators).toBe(true);
  });

  test('capitalize', () => {
    const result = SectionLabelLine.tryParse(`${sectionLabelSymbol}outro`);
    expect(result).not.toBeNull();
    expect(result!.label).toBe('Outro');
    expect(result!.renderBarSeparators).toBe(false);
  });

  test('shorthands', () => {
    Object.keys(sectionLabelShorthands).forEach((abbreviation: string) => {
      const result = SectionLabelLine.tryParse(sectionLabelSymbol + abbreviation);
      expect(result).not.toBeNull();
      expect(result!.label).toBe(sectionLabelShorthands[abbreviation]);
    });
  });

  test('long random with bar separator', () => {
    const result = SectionLabelLine.tryParse(
      `${sectionLabelSymbol}${barSeparator}asdfjhaFHJNxcvKDKJNQOfasdfnpaoOpSCFNJKJziizN`,
    );
    expect(result).not.toBeNull();
    expect(result!.renderBarSeparators).toBe(true);
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

  test('space before bar separator', () => {
    expect(SectionLabelLine.tryParse(`${sectionLabelSymbol} ${barSeparator}Chorus`)).toBeNull();
  });
});
