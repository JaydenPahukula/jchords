import { parseSong as jcParseSong, JCRenderOptions, renderSong } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import { Song } from 'shared/types/song';

export function parseSong(song: Song, renderOptions: JCRenderOptions): ParsedSong {
  const parsed = jcParseSong(song.text);
  return { ...song, parsed: parsed, rendered: renderSong(parsed, renderOptions) };
}
