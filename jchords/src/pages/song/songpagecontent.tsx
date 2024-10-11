import { useContext, useEffect } from 'react';
import Chart from 'src/components/chart/chart';
import SongPageToolbar from 'src/components/songpagetoolbar/songpagetoolbar';
import { useAppDispatch } from 'src/redux/hooks';
import { updateSettings } from 'src/redux/slices/settings';
import SongContext from './songcontext';
import './songpage.css';
import { DataState } from './songpagedatalayer';

interface SongPageContentProps {
  pageState: DataState;
  isContentFull: boolean;
}

export default function SongPageContent(props: SongPageContentProps) {
  const { songChart } = useContext(SongContext);

  // update the selected song key once the song is loaded
  // (this is only here because it needs to be above the data layer)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (songChart !== undefined) dispatch(updateSettings({ key: songChart.key }));
  }, [songChart]);

  return (
    <div id="song-page">
      <SongPageToolbar></SongPageToolbar>
      <div id={props.isContentFull ? 'song-page-content-full' : 'song-page-content'}>
        {props.pageState === DataState.Loading ? (
          <>loading</>
        ) : props.pageState === DataState.Error ? (
          <>error</>
        ) : (
          <Chart isFull={props.isContentFull}></Chart>
        )}
      </div>
    </div>
  );
}
