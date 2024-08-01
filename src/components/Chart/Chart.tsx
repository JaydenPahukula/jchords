import React, { useEffect, useState } from 'react';
import DBManager from 'src/db/DBManager';
import Chart from 'src/types/Chart';
import SongInfo from 'src/types/SongInfo';
import { isDef } from 'src/types/trivial';
import './Chart.css';
import ChartSectionComponent from './ChartSection';

interface ChartComponentProps {
  songId: string;
}

export default function ChartComponent({ songId }: ChartComponentProps) {
  const [isSongInfoLoading, setIsSongInfoLoading] = useState(true);
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    // let mounted = true;
    DBManager.getSongInfo(songId).then((info) => {
      // if (mounted) {
      setSongInfo(info);
      setIsSongInfoLoading(false);
      // }
    });
    // return () => {
    //   mounted = false;
    // };
  }, []);

  useEffect(() => {
    let mounted = true;
    DBManager.getSongChart(songId).then((chart) => {
      if (mounted) {
        setChart(chart);
        setIsChartLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

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
          {chart.order
            .map((sectionId) => chart.sections[sectionId])
            .filter(isDef)
            .map((section) => (
              <ChartSectionComponent section={section}></ChartSectionComponent>
            ))}
        </React.Fragment>
      )}
    </div>
  );
}
