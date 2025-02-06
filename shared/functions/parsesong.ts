import ParsedSong from 'src/shared/types/parsedsong';
import Song from 'src/shared/types/song';
// @ts-expect-error
import { parseSong as cmParseSong } from 'chord-mark';
import Accidental from 'src/shared/enums/accidental';
import Key from 'src/shared/enums/key';
import Mode from 'src/shared/enums/mode';
import parseKeyInfo from 'src/shared/functions/parsekeyinfo';

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
