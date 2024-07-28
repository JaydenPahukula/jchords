import { useEffect, useState } from 'react';
import DBManager from 'src/db/DBManager';
import Chart, { InvalidChart } from 'src/types/Chart';
import ChartLoadingComponent from './ChartLoading';

interface ChartComponentProps {
  songID: string;
}

export default function ChartComponent({ songID }: ChartComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chart, setChart] = useState<Chart | InvalidChart>();

  useEffect(() => {
    let mounted = true;
    DBManager.getSongChart(songID).then((chart) => {
      if (mounted) {
        setChart(chart);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return isLoading ? (
    <ChartLoadingComponent></ChartLoadingComponent>
  ) : (
    <div>{songID}</div>
  );
}
