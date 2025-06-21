import { RenderState } from "src/types/renderstate";

export interface ParsedLine {
  render: (state: RenderState) => string,
};