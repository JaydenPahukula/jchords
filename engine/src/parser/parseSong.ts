import ParserOptions from '../types/parseoptions';
import Section from '../types/section';
import Song from '../types/song';
import TimeSignature from '../types/timesignature';
import parseSection from './parseSection';

export default function parseSong(src: string, options?: ParserOptions): Song {
  let sections: Section[] = [];
  let timeSignature: TimeSignature = options?.timeSignature ?? [4, 4]; // assume 4/4 time unless specified

  const lines: string[] = src.split('\n').map((s) => s.trim());
  let sectionLines: string[] = [];

  for (const line of lines) {
    if (line !== '') {
      sectionLines.push(line);
    } else if (line === '' && sectionLines.length > 0) {
      sections.push(parseSection(sectionLines));
      sectionLines = [];
    }
  }

  return {
    sections: sections,
    timeSignature: undefined,
  };
}
