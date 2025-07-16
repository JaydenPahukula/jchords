import { ParsedSong as JCParsedSong } from 'engine';
import { Song } from 'shared/types/song';

export interface ParsedSong extends Song {
  parsed: JCParsedSong;
  rendered: string;
}
