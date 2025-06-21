import { SectionLabelLine } from 'src/classes/sectionlabelline';
import { barSeparator, sectionLabelMarker } from 'src/constants';

export function isSectionLabel(line: string): boolean {
  // checking if all letters are alphabetical
  return new RegExp(`^${sectionLabelMarker}[${barSeparator}]?[a-zA-Z]+$`).test(line);
}

export function parseSectionLabel(line: string, lineNum?: number): SectionLabelLine {
  const renderBarSeparators = line.charAt(1) === barSeparator;
  let label = line.slice(renderBarSeparators ? 2 : 1);
  if (label == 'a') label = 'Adlib';
  else if (label == 'b') label = 'Bridge';
  else if (label == 'c') label = 'Chorus';
  else if (label == 'i') label = 'Intro';
  else if (label == 'o') label = 'Outro';
  else if (label == 'p') label = 'Pre-chorus';
  else if (label == 's') label = 'Solo';
  else if (label == 'u') label = 'Interlude';
  else if (label == 'v') label = 'Verse';

  // capitalize first letter
  label = label.charAt(0).toUpperCase() + label.slice(1);

  return new SectionLabelLine(label, renderBarSeparators);
}
