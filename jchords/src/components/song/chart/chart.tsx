// @ts-ignore
import { parseSong, renderSong } from 'chord-mark/lib/chord-mark.js';
import { ReactElement } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { selectRenderSettings } from 'src/redux/slices/rendersettings';
import { selectSongData } from 'src/redux/slices/songdata';
import cmSong from 'src/types/cmsong';
import SongInfo from 'src/types/songinfo';

export default function Chart(): ReactElement {
  const { songsLoading, songs, currId, srcLoading, src } = useAppSelector(selectSongData);
  const renderSettings = useAppSelector(selectRenderSettings).settings;

  const info: SongInfo | undefined = songs[currId];

  const song: cmSong | undefined = parseSong(src ?? '');

  return (
    <div className="font-mono">
      {songsLoading || srcLoading ? (
        <>loading...</>
      ) : info === undefined || src === undefined ? (
        <>error</>
      ) : (
        <>
          <h2 id={isMobile ? 'chart-title-small' : 'chart-title'}>{info.title}</h2>
          <h3 className={isMobile ? 'chart-subtitle-small' : 'chart-subtitle'}>{info.artist}</h3>
          <pre
            id={isMobile ? 'chart-content-small' : 'chart-content'}
            dangerouslySetInnerHTML={{ __html: renderSong(song, renderSettings) }}
          ></pre>
        </>
      )}
    </div>
  );
}
