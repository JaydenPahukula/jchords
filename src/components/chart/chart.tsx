import React, { useEffect, useState } from 'react';
import DBManager from 'src/db/dbmanager';
import Chart from 'src/types/chart';
import { isDef } from 'src/types/guards';
import SongInfo from 'src/types/songinfo';
import './chart.css';
import ChartSectionComponent from './chartsection';

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
              <ChartSectionComponent
                section={section}
                key={section.sectionname}
              ></ChartSectionComponent>
            ))}
        </React.Fragment>
      )}
    </div>
  );
}
