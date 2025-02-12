import Mode from 'shared/enums/mode';

export default function stringToMode(s: string): Mode {
  return s.includes('m') ? Mode.Minor : Mode.Major;
}
