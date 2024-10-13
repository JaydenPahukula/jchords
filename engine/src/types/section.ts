import Line from './line';

export default interface Section {
  name: string | undefined;
  lines: Line[];
}
