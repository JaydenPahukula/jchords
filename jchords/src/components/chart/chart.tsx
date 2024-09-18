import React, { useEffect, useState } from 'react';
import DBManager from 'shared/db/dbmanager';
import Chart from 'shared/types/chart';
import SongInfo from 'shared/types/songinfo';
import './chart.css';

interface ChartComponentProps {
  songId: string;
}

export default function ChartComponent({ songId }: ChartComponentProps) {
  const [isSongInfoLoading, setIsSongInfoLoading] = useState(true);
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    DBManager.getSongInfo(songId).then((info) => {
      setSongInfo(info);
      setIsSongInfoLoading(false);
    });
  }, [songId]);

  useEffect(() => {
    DBManager.getSongChart(songId).then((chart) => {
      setChart(chart);
      setIsChartLoading(false);
    });
  }, [songId]);

  return (
    <div className="chart">
      {isSongInfoLoading || isChartLoading ? (
        <p>loading...</p>
      ) : songInfo === undefined || chart === undefined ? (
        <p>Something went wrong</p>
      ) : (
        <React.Fragment>
          <div className="chart-header">
            <h1 className="chart-title">{songInfo.name}</h1>
            <p className="chart-subtitle">{songInfo.artist}</p>
            <p className="chart-subtitle">Key: C | 100 BPM | 4 / 4</p>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
