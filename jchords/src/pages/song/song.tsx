import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router-dom';
import DBManager from 'shared/db/dbmanager';
import SongChart from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo from 'shared/types/songinfo';
import Chart from 'src/components/chart/chart';
import SongPageToolbar from 'src/components/songpagetoolbar/songpagetoolbar';
import NotFoundPage from 'src/pages/notfound/notfound';
import store from 'src/redux/store';
import { isOnMobile } from 'src/utils/responsiveness';
import './song.css';
import SongContext from './songcontext';

export default function SongPage() {
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<SongInfo | undefined>(undefined);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<SongChart | undefined>(undefined);
  const [isContentFull, setContentFull] = useState<boolean>(isOnMobile());

  const songId: SongId | undefined = useParams().id;

  // load song info
  useEffect(() => {
    if (songId !== undefined && songId !== '') {
      DBManager.getSongInfo(songId).then((info) => {
        setInfo(info);
        setIsInfoLoading(false);
      });
    }
  }, []);

  // load song chart
  useEffect(() => {
    if (songId !== undefined && songId !== '') {
      DBManager.getSongChart(songId).then((chart) => {
        setChart(chart);
        setIsChartLoading(false);
      });
    }
  }, []);

  // listen for resize
  useEffect(() => {
    const handleResize = () => {
      setContentFull(isOnMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return songId !== undefined ? (
    <SongContext.Provider value={{ songInfo: info, songChart: chart }}>
      <Provider store={store}>
        <div id="song-page">
          <SongPageToolbar></SongPageToolbar>
          <div id={isContentFull ? 'song-page-content-full' : 'song-page-content'}>
            {isInfoLoading || isChartLoading ? (
              <>loading</>
            ) : info === undefined || chart === undefined ? (
              <>error</>
            ) : (
              <Chart isFull={isContentFull}></Chart>
            )}
          </div>
        </div>
      </Provider>
    </SongContext.Provider>
  ) : (
    <NotFoundPage />
  );
}
