import {
  ArrayOf,
  generateInterfaceChecker,
  ObjectOf,
} from 'shared/functions/generateInterfaceChecker';
import { isSongInfo, SongInfo } from 'shared/types/songinfo';

export interface GetSongListResponseBody {
  songList: SongInfo[];
}

export const isGetSongListResponseBody = generateInterfaceChecker<GetSongListResponseBody>({
  songList: ArrayOf(ObjectOf(isSongInfo)),
});
