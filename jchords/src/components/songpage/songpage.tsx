import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DBManager from 'shared/db/dbmanager';
import SongChart from 'shared/types/songchart';
import SongInfo from 'shared/types/songinfo';
import Chart from 'src/components/chart/chart';
import NotFoundPage from 'src/components/notfoundpage/notfoundpage';
import SongPageNavbar from 'src/components/songpagenavbar/songpagenavbar';
import './songpage.css';

export default function SongPage() {
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<SongInfo | undefined>(undefined);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<SongChart | undefined>(undefined);

  const songId: string | undefined = useParams().id;

  useEffect(() => {
    if (songId !== undefined && songId !== '') {
      DBManager.getSongInfo(songId).then((info) => {
        setInfo(info);
        setIsInfoLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (songId !== undefined && songId !== '') {
      DBManager.getSongChart(songId).then((chart) => {
        setChart(chart);
        setIsChartLoading(false);
      });
    }
  }, [songId]);

  return songId ? (
    <div id="song-page">
      <SongPageNavbar title={info?.name || ''}></SongPageNavbar>
      <div id="song-page-content">
        {isInfoLoading || isChartLoading ? (
          <>loading</>
        ) : info === undefined || chart === undefined ? (
          <>error</>
        ) : (
          <Chart info={info} chart={chart}></Chart>
        )}
      </div>
    </div>
  ) : (
    <NotFoundPage />
  );
}
