import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import DBManager from 'shared/db/dbmanager';
import SongChart from 'shared/types/songchart';
import SongId from 'shared/types/songid';
import SongInfo from 'shared/types/songinfo';
import store from 'src/redux/store';
import SongContext from './songcontext';

export enum DataState {
  Loaded = 0,
  Loading = 1,
  Error = 2,
}

interface SongPageDataLayerProps {
  children: ReactNode;
  songId: SongId | undefined;
  setDataState: (state: DataState) => void;
}

export default function SongPageDataLayer({ children, ...props }: SongPageDataLayerProps) {
  const [info, setInfo] = useState<SongInfo | undefined>(undefined);
  const [infoState, setInfoState] = useState<DataState>(DataState.Loading);

  const [chart, setChart] = useState<SongChart | undefined>(undefined);
  const [chartState, setChartState] = useState<DataState>(DataState.Loading);

  const totalState: DataState = Math.max(infoState, chartState);

  // update total state when necessary
  useEffect(() => {
    props.setDataState(totalState);
  }, [totalState]);

  // load song info
  useEffect(() => {
    setInfoState(DataState.Loading);
    if (props.songId !== undefined && props.songId !== '') {
      DBManager.getSongInfo(props.songId).then((info) => {
        setInfo(info);
        setInfoState(info === undefined ? DataState.Error : DataState.Loaded);
      });
    }
  }, [props.songId]);

  // load song chart
  useEffect(() => {
    setChartState(DataState.Loading);
    if (props.songId !== undefined && props.songId !== '') {
      DBManager.getSongChart(props.songId).then((chart) => {
        setChart(chart);
        setChartState(chart === undefined ? DataState.Error : DataState.Loaded);
      });
    }
  }, [props.songId]);

  return (
    <Provider store={store}>
      <SongContext.Provider value={{ songInfo: info, songChart: chart }}>
        {children}
      </SongContext.Provider>
    </Provider>
  );
}
