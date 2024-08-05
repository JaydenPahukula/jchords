import ChartChord from 'src/types/chartchord';
import ChartLine from 'src/types/chartline';

/**
 * Convert a ChartLine object into two strings for printing, one for lyrics and one
 * for chords. Adds spaces to the lyrics so that no chords overlap.
 */
export default function renderLine(line: ChartLine): [string, string] {
  if (line.chords.length === 0) return [line.lyrics, ''];
  const lyricsArr: string[] = [];
  const chordsArr: string[] = [];

  let maxChordIndex = 0;
  const chordMap = line.chords.reduce((map: Map<number, string>, chord: ChartChord) => {
    map.set(chord.index, chord.chord);
    if (chord.index > maxChordIndex) maxChordIndex = chord.index;
    return map;
  }, new Map<number, string>());

  let offset = 1;
  for (let i = 0; i < Math.max(maxChordIndex + 1, line.lyrics.length); i++) {
    const chord = chordMap.get(i);

    if (chord) {
      chordsArr.push(' ');
      if (offset > 0) {
        lyricsArr.push(' '.repeat(offset));
      }
      if (offset < 0) {
        chordsArr.push(' '.repeat(0 - offset));
      }
      // chordsArr.push(' ');
      chordsArr.push(chord);
      offset = chord.length + 1;
    }

    const c = line.lyrics.charAt(i);
    if (c) lyricsArr.push(c);
    offset -= 1;
  }

  return [lyricsArr.join(''), chordsArr.join('')];
}
