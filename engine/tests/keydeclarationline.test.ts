import { keyDeclarationKeyword } from 'src/constants';
import { KeyDeclarationLine } from 'src/parser/lines/keydeclarationline';
import { describe, expect, test } from 'vitest';

describe('Parse key declaration line', () => {
  test('plain', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' C');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual('C');
  });

  test('fancy', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' F#m');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual('F#m');
  });

  test('whitespace around', () => {
    const result = KeyDeclarationLine.tryParse(keyDeclarationKeyword + '      C          ');
    expect(result).not.toBeNull();
    expect(result!.key).toEqual('C');
  });

  test('obviously invalid key', () => {
    expect(KeyDeclarationLine.tryParse(keyDeclarationKeyword + ' ABCD')).toBeNull();
  });

  test('no whitespace after keyword', () => {
    expect(KeyDeclarationLine.tryParse(keyDeclarationKeyword + 'C')).toBeNull();
  });

  test('multiple keys', () => {
    expect(KeyDeclarationLine.tryParse('C B')).toBeNull();
  });

  test('empty line', () => {
    expect(KeyDeclarationLine.tryParse('')).toBeNull();
  });
});
