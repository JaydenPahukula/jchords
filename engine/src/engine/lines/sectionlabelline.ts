import { sectionLabelShorthands } from 'src/constants';
import { sectionLabelLineClassName } from 'src/constants/classes';
import { sectionLabelSymbol } from 'src/constants/symbols';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderOptions } from 'src/types/renderopts';

export class SectionLabelLine implements ParsedLine {
  type = LineType.SectionLabel;

  label: string;
  static regex = new RegExp(`^${sectionLabelSymbol}([a-zA-Z0-9 -]+)$`);

  constructor(label: string) {
    this.label = label;
  }

  static tryParse = (line: string, state: ParseState): SectionLabelLine | null => {
    const match = line.match(SectionLabelLine.regex);
    if (match === null || match[1] === undefined) return null;

    let label = match[1];

    // checking if the label is a shorthand
    const shorthand = sectionLabelShorthands[label];
    if (shorthand !== undefined) label = shorthand;

    // capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return new SectionLabelLine(label);
  };

  render = (opts: RenderOptions): string => {
    return `<span class="${sectionLabelLineClassName}">${this.label}<br /></span>`;
  };
}
