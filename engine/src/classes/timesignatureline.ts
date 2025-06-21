import { ParsedLine } from "src/types/parsedline";
import { RenderState } from "src/types/renderstate";

export class TimeSignatureLine implements ParsedLine {

  constructor(public numerator: number, public denominator: number) {}

  render = (state: RenderState) => {
    return ""
  }
};