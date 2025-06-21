
import { ParserError } from 'src/classes/parsererror';
import { barSeparator, sectionLabelMarker } from 'src/constants';
import { isSectionLabel, parseSectionLabel } from 'src/functions/parser/parsesectionlabel';
import { describe, test, expect } from 'vitest';

describe('isSectionLabel()', () => {

  test('plain', () => {
    expect(isSectionLabel(`${sectionLabelMarker}Chorus`)).toBe(true);
  });

  test('with bar separator', () => {
    expect(isSectionLabel(`${sectionLabelMarker}${barSeparator}intro`)).toBe(true);
  });

  test('single char', () => {
    expect(isSectionLabel(`${sectionLabelMarker}v`)).toBe(true);
  });

  test('long with bar separator', () => {
    expect(isSectionLabel(`${sectionLabelMarker}${barSeparator}asdFasdJFAjsHasdfaSDkf`)).toBe(true);
  });

  test('missing marker', () => {
    expect(isSectionLabel("intro")).toBe(false);
  });

  test('multi-word', () => {
    expect(isSectionLabel(`${sectionLabelMarker}chorus two`)).toBe(false);
  });

  test('empty label', () => {
    expect(isSectionLabel(`${sectionLabelMarker}`)).toBe(false);
  });

  test('non-alpha character', () => {
    expect(isSectionLabel(`${sectionLabelMarker}chorus2`)).toBe(false);
  });

  test('space before bar separator', () => {
    expect(isSectionLabel(`${sectionLabelMarker} ${barSeparator}chorus`)).toBe(false);
  });
});

describe('parseSectionLabel()', () => {

  test('plain', () => {
    const result = parseSectionLabel(`${sectionLabelMarker}Chorus`);
    expect(result.label).toBe("Chorus");
    expect(result.renderBarSeparators).toBe(false);
  });

  test('with bar separator', () => {
    const result = parseSectionLabel(`${sectionLabelMarker}${barSeparator}Outro`);
    expect(result.label).toBe("Outro");
    expect(result.renderBarSeparators).toBe(true);
  });

  test('invalid', () => {
  });
});