
import { RenderOptions } from 'src/types/renderopts';
import { renderSong } from 'src/render/render';
import { describe, it, expect } from 'vitest';
import { Mode } from 'src/types/mode';

describe('end to end', () => {

  it('test', () => {
    const input = `C\ntesting`;
    const options: RenderOptions = { key: {rootNote: 0, mode: Mode.Major} };
    const output = renderSong(input, options);
  });
});
