import ChartLine from 'src/types/chartline';

/**
 * Convert a ChartLine object into two strings for printing, one for lyrics and one
 * for chords. Adds spaces to the lyrics so that no chords overlap.
 */
export function renderNormalLine(line: ChartLine, fillChar: string = ' '): [string, string] {
  if (Object.keys(line.chords).length === 0) return [line.text, ''];

  const lyricsArr: string[] = [];
  const chordsArr: string[] = [];

  const limit = Math.max(Math.max(...Object.keys(line.chords).map(Number)) + 1, line.text.length);

  let offset = 1;
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

    const c = line.text.charAt(i);
    if (c) lyricsArr.push(c);
    offset -= 1;
  }

  return [lyricsArr.join(''), chordsArr.join('')];
}

/**
 * Convert a ChartLine object into one string for printing, inserting chords in place.
 */
export function renderInlineLine(line: ChartLine): string {
  if (Object.keys(line.chords).length === 0) return line.text;

  const arr: string[] = [];

  const limit = Math.max(Math.max(...Object.keys(line.chords).map(Number)) + 1, line.text.length);

  for (let i = 0; i < limit; i++) {
    const chord = line.chords[i];

    const c = line.text.charAt(i);
    if (c) arr.push(c);

    if (chord) {
      arr.push(chord);
    }
  }

  return arr.join('');
}
