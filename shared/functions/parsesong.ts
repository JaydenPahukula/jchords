import ParsedSong from '../types/parsedsong';
import Song from '../types/song';
// @ts-expect-error
import { parseSong as cmParseSong } from 'chord-mark';
import Accidental from '../enums/accidental';
import Key from '../enums/key';
import Mode from '../enums/mode';
import parseKeyInfo from '../functions/parsekeyinfo';

export default function parseSong(song: Song): ParsedSong {
  const parsedSong = cmParseSong(song.text);
  const [key, accidental, mode] = parseKeyInfo(parsedSong) ?? [Key.C, Accidental.Sharp, Mode.Major];
  return {
    ...song,
    parsed: parsedSong,
    defaultKey: key,
    defaultAccidental: accidental,
    mode: mode,
  };
}
