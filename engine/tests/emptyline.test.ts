import { EmptyLine } from 'src/parser/lines/emptyline';
import { describe, expect, test } from 'vitest';

describe('Parse empty line', () => {
  test('empty', () => {
    expect(EmptyLine.tryParse('')).not.toBeNull();
  });

  test('with whitespace', () => {
    expect(EmptyLine.tryParse('\t  \t\t\r\r   ')).not.toBeNull();
  });

  test('with words', () => {
    expect(EmptyLine.tryParse(' hello world')).toBeNull();
  });
});
