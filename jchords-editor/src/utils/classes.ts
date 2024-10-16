export default function classes(...classes: (string | { [key: string]: boolean })[]): string {
  let out = [];
  for (const item of classes) {
    if (typeof item === 'string') {
      out.push(item);
    } else {
      for (const name in item) {
        item[name] && out.push(name);
      }
    }
  }
  return out.join(' ');
}
