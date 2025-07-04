import { errorClassName, timeSignatureLineClassName } from 'src/constants';
import { TimeSignatureLine } from 'src/engine/lines/timesignatureline';
import { defaultRenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';
import { describe, expect, test } from 'vitest';

describe('Parse time signature line', () => {
  test('plain 4/4', () => {
    const result = TimeSignatureLine.tryParse('4/4');
    expect(result).not.toBeNull();
    expect(result!.ts).toEqual({
      upper: 4,
      lower: 4,
    });
  });

  test('plain 6/8', () => {
    const result = TimeSignatureLine.tryParse('6/8');
    expect(result).not.toBeNull();
    expect(result!.ts).toEqual({
      upper: 6,
      lower: 8,
    });
  });

  test('plain 1/2', () => {
    const result = TimeSignatureLine.tryParse('1/2');
    expect(result).not.toBeNull();
    expect(result!.ts).toEqual({
      upper: 1,
      lower: 2,
    });
  });

  test('plain 12/8', () => {
    const result = TimeSignatureLine.tryParse('12/8');
    expect(result).not.toBeNull();
    expect(result!.ts).toEqual({
      upper: 12,
      lower: 8,
    });
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

describe('Render time signature line', () => {
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
    const line: TimeSignatureLine = new TimeSignatureLine(4, 4);
    const opts = { ...defaultRenderOptions() };
    const state: RenderState = {
      ...initialState,
      lines: [line],
    };
    const container = document.createElement('div');
    container.innerHTML = line.render(state, opts);

    expect(container.querySelectorAll('.' + timeSignatureLineClassName)).toHaveLength(1);
  });

  test('overwriting', () => {
    const line1: TimeSignatureLine = new TimeSignatureLine(4, 4);
    const line2: TimeSignatureLine = new TimeSignatureLine(6, 8);
    const opts = defaultRenderOptions();
    const state: RenderState = {
      ...initialState,
      lines: [line1, line2],
      timeSignature: { upper: 6, lower: 8 },
    };

    line1.render(state, opts);
    expect(state.timeSignature).toEqual(line1.ts);

    line2.render(state, opts);
    expect(state.timeSignature).toEqual(line2.ts);
  });

  test('invalid time signature', () => {
    const line: TimeSignatureLine = new TimeSignatureLine(4, 7);
    const opts = defaultRenderOptions();
    const state = {
      ...initialState,
      lines: [line],
    };
    const container = document.createElement('div');
    container.innerHTML = line.render(state, opts);

    expect(container.querySelectorAll('.' + timeSignatureLineClassName)).toHaveLength(1);
    expect(container.querySelectorAll('.' + errorClassName).length).toBeTruthy();
  });
});
