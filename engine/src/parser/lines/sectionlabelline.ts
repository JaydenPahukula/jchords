import { barSeparator, sectionLabelShorthands, sectionLabelSymbol } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class SectionLabelLine implements ParsedLine {
  constructor(
    public label: string,
    public renderBarSeparators: boolean,
  ) {}

  static tryParse = (line: string, lineNum?: number) => {
    const match = line.match(new RegExp(`^${sectionLabelSymbol}[${barSeparator}]?([a-zA-Z]+)$`));
    if (match === null || match[1] === undefined) return null;

    const renderBarSeparators = line.charAt(1) === barSeparator;

    let label = match[1];
    const shorthand = sectionLabelShorthands[label];
    if (shorthand !== undefined) label = shorthand;

    // capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return new SectionLabelLine(label, renderBarSeparators);
  };

  render = (state: RenderState): string => {
    return '';
  };
}
