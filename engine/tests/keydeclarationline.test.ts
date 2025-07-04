import { keyDeclarationKeyword, keyDeclarationLineClassName } from 'src/constants';
import { KeyDeclarationLine } from 'src/engine/lines/keydeclarationline';
import { defaultRenderOptions } from 'src/index';
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
    expect(result!.original).toEqual('C');
  });

  test('plain 2', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' F#m');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.FSharp,
      minor: true,
    });
    expect(result!.original).toEqual('F#m');
  });

  test('flat', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' Eb');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.DSharp,
      minor: false,
    });
    expect(result!.original).toEqual('Eb');
  });

  test('lowercase note', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' gb');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual({
      note: Note.FSharp,
      minor: false,
    });
    expect(result!.original).toEqual('gb');
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
  const initialState = (): RenderState => {
    return {
      key: undefined,
      currentLine: 0,
      lines: [],
      lastChordLine: undefined,
      lastLastChordLine: undefined,
      currentSection: undefined,
    };
  };

  test('plain', () => {
    const line: KeyDeclarationLine = new KeyDeclarationLine({ note: Note.C, minor: false }, 'C');
    const opts = defaultRenderOptions();
    const state = {
      ...initialState(),
      lines: [line],
    };
    const container = document.createElement('div');
    container.innerHTML = line.render(state, opts);

    expect(container.querySelectorAll('.' + keyDeclarationLineClassName)).toHaveLength(1);
  });

  test('overwriting', () => {
    const line1: KeyDeclarationLine = new KeyDeclarationLine(
      { note: Note.FSharp, minor: true },
      'F#m',
    );
    const line2: KeyDeclarationLine = new KeyDeclarationLine({ note: Note.D, minor: false }, 'D');
    const opts = defaultRenderOptions();
    const state = {
      ...initialState(),
      lines: [line1, line2],
      key: { note: Note.C, minor: false },
    };
    let output = line1.render(state, opts);
    expect(state.key).toEqual(line1.key);

    output = line2.render(state, opts);
    expect(state.key).toEqual(line2.key);
  });
});
