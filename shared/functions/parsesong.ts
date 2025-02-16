import ParsedSong from 'shared/types/parsedsong';
import Song from 'shared/types/song';
// @ts-expect-error
import { parseSong as cmParseSong } from 'chord-mark';
import Accidental from 'shared/enums/accidental';
import Key from 'shared/enums/key';
import Mode from 'shared/enums/mode';
import parseKeyInfo from 'shared/functions/parsekeyinfo';

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
