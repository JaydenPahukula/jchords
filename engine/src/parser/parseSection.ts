import Section from '../types/section';

export default function parseSection(lines: string[]): Section {
  const section: Section = {
    name: undefined,
    lines: [],
  };

  // check for section name
  if (lines.length > 0 && lines[0].charAt(0) === '#') {
    const titleLine = lines.shift();
    section.name = titleLine?.substring(1).trim();
  }

  // determine if each line is a lyric line or a chords line

  return section;
}
