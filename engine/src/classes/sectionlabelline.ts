import { ParsedLine } from 'src/types/parsedline';
import { RenderState } from 'src/types/renderstate';

export class SectionLabelLine implements ParsedLine {
  constructor(
    public label: string,
    public renderBarSeparators: boolean,
  ) {}

  render = (state: RenderState) => {
    return '';
  };
}
