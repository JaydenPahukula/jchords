
export default interface SongChart {
  id: string,
  text: string,
  key: string,
}

export function makeEmptySongChart(): SongChart {
  return {
    id: "",
    text: "",
    key: "",
  };
}

export function isSongChart(obj: unknown): obj is SongChart {
  const objAs = obj as SongChart;
  return (
    !!obj &&
    typeof objAs.id === 'string' &&
    typeof objAs.text === 'string' &&
    typeof objAs.key === 'string'
  );
}
