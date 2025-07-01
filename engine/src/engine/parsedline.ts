import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

export interface ParsedLine {
  type: LineType;
  render(state: RenderState, opts: RenderOptions): string;
}

export enum LineType {
  Chord,
  Empty,
  KeyDeclaration,
  Lyric,
  RepeatChords,
  SectionLabel,
  TimeSignature,
}
