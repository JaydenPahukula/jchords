import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DBManager from 'shared/db/dbmanager';
import SongChart from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo from 'shared/types/songinfo';
import Chart from 'src/components/chart/chart';
import NotFoundPage from 'src/components/notfoundpage/notfoundpage';
import SongPageNavbar from 'src/components/songpagenavbar/songpagenavbar';
import './songpage.css';

// determines if chart content should take up the whole screen (for mobile)
function shouldFullChart(): boolean {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  return width < 800; //px
}

export default function SongPage() {
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<SongInfo | undefined>(undefined);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chart, setChart] = useState<SongChart | undefined>(undefined);
  const [isContentFull, setContentFull] = useState<boolean>(shouldFullChart());

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
      setContentFull(shouldFullChart());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return songId !== undefined ? (
    <div id="song-page">
      <SongPageNavbar title={info?.name || ''}></SongPageNavbar>
      <div id={isContentFull ? 'song-page-content-full' : 'song-page-content'}>
        {isInfoLoading || isChartLoading ? (
          <>loading</>
        ) : info === undefined || chart === undefined ? (
          <>error</>
        ) : (
          <Chart info={info} chart={chart} isFull={isContentFull}></Chart>
        )}
      </div>
    </div>
  ) : (
    <NotFoundPage />
  );
}
