import { filter, FilterOptions } from 'fuzzy';
import { SongInfo } from 'shared/types/songinfo';

export function searchSongList(
  songList: SongInfo[],
  query: string,
  highlightMatches: boolean = true,
): SongInfo[] {
  const fuzzyOptions: FilterOptions<SongInfo> = {
    extract: (info) => info.title,
    pre: highlightMatches ? '<mark>' : undefined,
    post: highlightMatches ? '</mark>' : undefined,
  };
  const matches = filter(query, songList, fuzzyOptions);
  return matches.map(({ original, string }) => ({ ...original, title: string }));
}
