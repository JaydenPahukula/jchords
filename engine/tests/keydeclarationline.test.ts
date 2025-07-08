import { errorClassName, keyDeclarationLineClassName } from 'src/constants/classes';
import { keyDeclarationKeyword } from 'src/constants/symbols';
import { KeyDeclarationLine } from 'src/engine/lines/keydeclarationline';
import { defaultRenderOptions, RenderOptions } from 'src/index';
import { Note } from 'src/types/note';
import { RenderState } from 'src/types/renderstate';
import { describe, expect, test } from 'vitest';

describe('Parse key declaration line', () => {
  test('plain', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' C');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.C,
      minor: false,
    });
    expect(result!.originalString).toEqual('C');
  });

  test('plain 2', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' F#m');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.FSharp,
      minor: true,
    });
    expect(result!.originalString).toEqual('F#m');
  });

  test('flat', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' Eb');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.DSharp,
      minor: false,
    });
    expect(result!.originalString).toEqual('Eb');
  });

  test('lowercase note', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' gb');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.FSharp,
      minor: false,
    });
    expect(result!.originalString).toEqual('gb');
  });

  test('uppercase keyword', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword.toUpperCase() + ' A#m');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.ASharp,
      minor: true,
    });
  });

  test('invalid key', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' ABC');
    expect(result).not.toBeNull();
    expect(result!.key).toBeNull();
  });

  test('invalid key 2', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' H#');
    expect(result).not.toBeNull();
    expect(result!.key).toBeNull();
  });

  test('no whitespace after keyword', () => {
    expect(KeyDeclarationLine.tryParse(keyDeclarationKeyword + 'C')).toBeNull();
  });

  test('multiple keys', () => {
    expect(KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' C B')).toBeNull();
  });

  test('empty line', () => {
    expect(KeyDeclarationLine.tryParse('')).toBeNull();
  });
});

describe('Render key declaration line', () => {
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
    const line: KeyDeclarationLine = new KeyDeclarationLine('C');
    expect(line.key).not.toBeNull();
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line],
    };
    const container = document.createElement('div');
    container.innerHTML = line.render(state, opts);

    expect(container.querySelectorAll('.' + keyDeclarationLineClassName)).toHaveLength(1);
  });

  test('accidental preferences', () => {
    const line1: KeyDeclarationLine = new KeyDeclarationLine('C#');
    const line2: KeyDeclarationLine = new KeyDeclarationLine('Eb');
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line1, line2],
    };

    opts.accidentalsPreferrence = 'sharps';
    expect(line1.render(state, opts).includes('C#')).toBe(true);
    opts.accidentalsPreferrence = 'flats';
    expect(line1.render(state, opts).includes('Db')).toBe(true);
    opts.accidentalsPreferrence = 'auto';
    expect(line1.render(state, opts).includes('C#')).toBe(true);

    opts.accidentalsPreferrence = 'sharps';
    expect(line2.render(state, opts).includes('D#')).toBe(true);
    opts.accidentalsPreferrence = 'flats';
    expect(line2.render(state, opts).includes('Eb')).toBe(true);
    opts.accidentalsPreferrence = 'auto';
    expect(line2.render(state, opts).includes('Eb')).toBe(true);
  });

  test('overwriting', () => {
    const line1: KeyDeclarationLine = new KeyDeclarationLine('F#m');
    expect(line1.key).not.toBeNull();
    const line2: KeyDeclarationLine = new KeyDeclarationLine('D');
    expect(line2.key).not.toBeNull();
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line1, line2],
      key: { note: Note.C, minor: false },
    };
    line1.render(state, opts);
    expect(state.key).toEqual(line1.key);

    line2.render(state, opts);
    expect(state.key).toEqual(line2.key);
  });

  test('invalid chord', () => {
    const line: KeyDeclarationLine = new KeyDeclarationLine('CD');
    expect(line.key).toBeNull();
    const opts: RenderOptions = { ...defaultRenderOptions };
    const state: RenderState = {
      ...initialState,
      lines: [line],
    };
    const container = document.createElement('div');
    container.innerHTML = line.render(state, opts);

    expect(container.querySelectorAll('.' + keyDeclarationLineClassName)).toHaveLength(1);
    expect(container.querySelectorAll('.' + errorClassName).length).toBeTruthy();
  });
});
