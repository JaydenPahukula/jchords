import { lineClassName, sectionLabelLineClassName } from 'src/classes';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { sectionLabelSymbol } from 'src/symbols';
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

    // capitalize first letter
    label = label.charAt(0).toUpperCase() + label.slice(1);

    return new SectionLabelLine(label);
  };

  render = (opts: RenderOptions, state: RenderState): string => {
    return `<span class="${lineClassName} ${sectionLabelLineClassName}">${this.label}<br /></span>`;
  };
}
