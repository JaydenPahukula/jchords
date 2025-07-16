import { parseSong as jcParseSong, renderSong } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import { Song } from 'shared/types/song';

export function parseSong(song: Song): ParsedSong {
  const parsed = jcParseSong(song.text);
  return { ...song, parsed: parsed, rendered: renderSong(parsed) };
}
