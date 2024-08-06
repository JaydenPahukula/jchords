import ChartLine from 'src/types/chartline';

/**
 * Convert a ChartLine object into two strings for printing, one for lyrics and one
 * for chords. Adds spaces to the lyrics so that no chords overlap.
 */
export default function renderLine(line: ChartLine, fillChar: string = ' '): [string, string] {
  if (Object.keys(line.chords).length === 0) return [line.lyrics, ''];

  const lyricsArr: string[] = [];
  const chordsArr: string[] = [];

  let offset = 1;
  const limit = Math.max(Math.max(...Object.keys(line.chords).map(Number)) + 1, line.lyrics.length);
  for (let i = 0; i < limit; i++) {
    const chord = line.chords[i];

    if (chord) {
      chordsArr.push(' ');
      if (offset > 0) {
        lyricsArr.push(fillChar.repeat(offset));
      }
      if (offset < 0) {
        chordsArr.push(' '.repeat(0 - offset));
      }
      chordsArr.push(chord);
      offset = chord.length + 1;
    }

    const c = line.lyrics.charAt(i);
    if (c) lyricsArr.push(c);
    offset -= 1;
  }

  return [lyricsArr.join(''), chordsArr.join('')];
}
