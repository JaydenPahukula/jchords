import { keyDeclarationKeyword } from 'src/constants';
import { KeyDeclarationLine } from 'src/engine/lines/keydeclarationline';
import { Note } from 'src/types/note';
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
