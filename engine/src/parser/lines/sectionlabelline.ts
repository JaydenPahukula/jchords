import { sectionLabelShorthands, sectionLabelSymbol } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class SectionLabelLine implements ParsedLine {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  static tryParse = (line: string): SectionLabelLine | null => {
    const match = line.match(new RegExp(`^${sectionLabelSymbol}([a-zA-Z]+)$`));
    if (match === null || match[1] === undefined) return null;

    let label = match[1];

    // checking if the label is a shorthand
    const shorthand = sectionLabelShorthands[label];
    if (shorthand !== undefined) label = shorthand;

    // capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return new SectionLabelLine(label);
  };

  render = (state: RenderState): string => {
    return '';
  };
}
